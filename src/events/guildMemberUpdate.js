const { guild_informations: { staff_id, id } } = require("../config/client/client-info"),
    { status, class_data } = require("../database/data"),
    reg = require("../config/components/top-lang-keys");

function VerifyAdm(newMember) {
    if (/(?:\[|\<|\(|\{|\:)(.*)(?:\]|\>|\)|\}|\:)/i.test(newMember.nickname))
        return newMember.setNickname(null).catch(console.error)
}

async function nickname(oldMember, newMember, bot) {
    const Heroku_Postgre = new class_data(bot)

    if (staff_id.includes(newMember.user.id) || !newMember.nickname || !/\[.*\]/.test(newMember.nickname)) return;

    if (status == true) {
        const data = await Heroku_Postgre.global_top_helpers_json(id, newMember.user.id)

        if (!data.length) return VerifyAdm(newMember);

        const verify = data.some(d => {
            const regex = RegExp(`^\\[TOP\\s${reg[d.language]}\\]`)

            if (newMember.nickname.match(regex)) return true;

            return false
        });

        if (verify) return;

        newMember.setNickname(null).catch(console.error);
    } else {
        VerifyAdm(newMember)
    }
}

module.exports.run = (oldMember, newMember, bot) => {
    nickname(oldMember, newMember, bot)
}