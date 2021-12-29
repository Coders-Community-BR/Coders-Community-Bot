const { PrismaClient } = require("@prisma/client"),
    prisma = new PrismaClient();

class Heroku_Postgre {
    constructor(bot) {
        this.bot = bot
    }

    getDate(date) {
        return new Date(date).getDate() === new Date().getDate()
    }

    getTopHelpers(array = [], limit = array.length) {
        return array.sort((a, b) => {
            if ((a.UpVotes - a.DownVotes) > (b.UpVotes - b.DownVotes)) return -1;
            if ((a.UpVotes - a.DownVotes) < (b.UpVotes - b.DownVotes)) return 1;
            return 0
        }).slice(0, limit);
    }

    async consult_helper(guild_id, member, type) {
        const guild = await prisma.helpers.findFirst({
            where: {
                guild_id
            }
        })

        if (guild.helpers[type]?.[member.user.id]) {
            return true
        }

        if (!guild.helpers[type]) {
            Object.assign(guild.helpers, {[type]:{}})
        }

        Object.assign(guild.helpers[type], {[member.user.id]: {
            username: member.user.username,
            id: member.user.id,
            top_helper: false,
            UpVotes: 0,
            DownVotes: 0,
            day: Date.now(),
            users_votes: [],
            language: type
        }})

        await prisma.helpers.updateMany({
            where: {
                guild_id
            },
            data: {
                helpers: guild.helpers
            }
        });

        return false
    }

    async component_helper(guild_id, member, type, component) {
        const guild = await prisma.helpers.findFirst({
            where: {
                guild_id
            }
        });

        const info = guild.helpers[type][member.user.id][component]

        return info
    }

    async update_helper(guild_id, member, type, component, update) {
        const guild = await prisma.helpers.findFirst({
            where: {
                guild_id
            }
        });

        guild.helpers[type][member.user.id][component] = update
        await prisma.helpers.updateMany({
            where: {
                guild_id
            },
            data: {
                helpers: guild.helpers
            }
        });
    }

    async count_users_votes(guild_id, author) {
        let i = 0;

        const guild = await prisma.helpers.findFirst({
            where: {
                guild_id
            }
        });

        Object.keys(guild.helpers).forEach(lang => {
            Object.keys(guild.helpers[lang]).forEach(id => {
                if (this.getDate(guild.helpers[lang][id]["day"])) {
                    if (guild.helpers[lang][id]["users_votes"].includes(author.id)) {
                        i++
                    }
                }
            })
        })

        return i;
    }

    async top_helper(guild_id, type) {
        const relation = {
            TOP_HELPERS: [],
            TOP_3_HELPERS: [],
            LOSE_HELPES: [],
            WIN_HELPERS: []
        }

        const guild = await prisma.helpers.findFirst({
            where: {
                guild_id
            }
        });
        
        let top_helpers = Object.values(guild.helpers[type]);

        top_helpers = this.getTopHelpers(top_helpers)

        top_helpers.forEach(async (helper, index) => {
            if ([0, 1, 2].includes(index)) {
                if (helper.top_helper === false) {

                    if (helper.UpVotes < helper.DownVotes || helper.UpVotes === 0) return;

                    const member = {user: { id: helper.id }};
                    relation.WIN_HELPERS.push(helper)
                    await this.update_helper(guild_id, member, type, "top_helper" , true)

                    top_helpers[index].top_helper = true
                }
            } else {
                if (helper.top_helper === true || helper.UpVotes < helper.DownVotes) {

                    const member = {user: { id: helper.id }};
                    relation.LOSE_HELPES.push(helper)
                    await this.update_helper(guild_id, member, type, "top_helper", false)

                    top_helpers[index].top_helper = false
                }
            }
        });
        relation.TOP_HELPERS = top_helpers
        relation.TOP_3_HELPERS = top_helpers.slice(0, 3)
        
        for (let index = 0; index < relation.TOP_3_HELPERS.length; index++) {
            const element = relation.TOP_3_HELPERS[index];
            
            if (!element.top_helper) relation.TOP_3_HELPERS.splice(index, 1);
        }

        return relation;
    }

    async global_top_helpers_id(guild_id) {
        let new_top_helpers = [];
        const guild = await prisma.helpers.findFirst({
            where: {
                guild_id
            }
        });

        let i = Object.keys(guild.helpers)

        for (let index = 0; index < i.length; index++) {
            const element = i[index];
            const helpers = await this.top_helper(guild_id, element)
            for (let value = 0; value < helpers.TOP_3_HELPERS.length; value++) {
                const data = helpers.TOP_3_HELPERS[value];
                
                new_top_helpers.push(data.id)
            }
        }

        return new_top_helpers;
    }

    async global_top_helpers_json(guild_id, user_id) {
        let top_helpers_json = [];
        
        const guild = await prisma.helpers.findFirst({
            where: {
                guild_id
            }
        });

        let i = Object.keys(guild.helpers)

        for (let index = 0; index < i.length; index++) {
            const element = i[index];
            const helpers = await this.top_helper(guild_id, element)
            for (let value = 0; value < helpers.TOP_HELPERS.length; value++) {
                const data = helpers.TOP_HELPERS[value];
                if (data.top_helper === true && data.id == user_id) {
                    top_helpers_json.push(data)
                }
            }
        }

        return top_helpers_json;
    }

    async db_lang_keys(guild_id) {
        let LANG_KEYS = [];

        const guild = await prisma.helpers.findFirst({
            where: {
                guild_id
            }
        });

        Object.keys(guild.helpers).forEach(lang => {
            LANG_KEYS.push(lang)
        });

        return LANG_KEYS;
    }
};

module.exports = {
    class_data: Heroku_Postgre,
    status: false
};