const { PrismaClient } = require("@prisma/client"),
    prisma = new PrismaClient();

class Heroku_Postgre {
    constructor(bot) {
        this.bot = bot
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
};

module.exports = {
    class_data: Heroku_Postgre,
    status: false
};