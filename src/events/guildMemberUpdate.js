const { guild_informations: { staff_id, id }, guild_informations } = require("../config/client/client-info"),
    { status, class_data } = require("../database/data")
    
async function nickname(oldMember, newMember, bot) {
    const guild = bot.guilds.cache.get(id);
    const Heroku_Postgre = new class_data(bot)

    let member = guild.members.cache.get(newMember.user.id);
    
    if (staff_id.includes(member.user.id)) return;

    if (status == true) {
        if ((await Heroku_Postgre.global_top_helpers_id(id)).includes(member.user.id)) return;
    }
    
    if (newMember.nickname == null) return;

    newMember.nickname.split(" ").forEach(components => {
        if (components.includes("[") && components.includes("]")) {
            member.setNickname(member.user.username)
        }
    });
}

module.exports.run = (oldMember, newMember, bot) => {
    nickname(oldMember, newMember, bot)
}