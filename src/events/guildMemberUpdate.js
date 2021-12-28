const { guild_informations: { staff_id, id } } = require("../config/client/client-info"),
    { status, class_data } = require("../database/data"),
    reg = require("../config/components/top-lang-keys");
    
async function nickname(oldMember, newMember, bot) {
    const Heroku_Postgre = new class_data(bot)
    
    if (staff_id.includes(newMember.user.id) || !newMember.nickname || !/\[.*\]/.test(newMember.nickname)) return;

    if (status == true) {
        const data = await Heroku_Postgre.global_top_helpers_json(id, newMember.user.id)

        if (!data.length) return;

        const verify = data.some(d => {
            const regex = RegExp(`^\\[TOP\\s${reg[d.language]}\\]`)

            if (newMember.nickname.match(regex)) return true;

            return false
        });

        if (verify === true) return;

        newMember.setNickname(newMember.user.username)
    } else {
        newMember.nickname.split(" ").forEach(components => {
            if (components.includes("[") && components.includes("]")) {
                newMember.setNickname(newMember.user.username)
            }
        });
    }
}

module.exports.run = (oldMember, newMember, bot) => {
    nickname(oldMember, newMember, bot)
}