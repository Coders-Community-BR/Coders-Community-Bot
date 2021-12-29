const { guild_informations: { staff_id, id } } = require("../config/client/client-info"),
    { status, class_data } = require("../database/data"),
    reg = require("../config/components/top-lang-keys");
    
function VerifyAdm(newMember) {
    if (/(?:\[|\<|\(|\{|\:)\s*((?:m\s*o\s*d\s*(?:e\s*r\s*a\s*(?:d|t)\s*o\s*r)?)|(?:a\s*d\s*m\s*(?:i\s*n\s*(?:i\s*s\s*t\s*r\s*a\s*(?:d|t)\s*o\s*r))?)|(?:s\s*u\s*p\s*(?:e\s*r\s*v\s*i\s*s\s*o\s*r))|(?:g\s*m)|(?:s\s*t\s*a\s*f\s*f)|(?:d\s*o\s*n\s*o)|(?:o\s*w\s*n\s*(?:e\s*r)?))\s*(?:\]|\>|\)|\}|\:)/i.test(newMember.nickname) || /\[\s*t\s*o\s*p.*\]/i.test(newMember.nickname)) return newMember.setNickname(newMember.user.username).catch(console.error)
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
        
        newMember.setNickname(newMember.user.username).catch(console.error);
    } else {
        VerifyAdm(newMember)
    }
}

module.exports.run = (oldMember, newMember, bot) => {
    nickname(oldMember, newMember, bot)
}