const { guild_informations: { id } } = require("../config/client/client-info")

module.exports.run = (bot) => {
    console.log("│ GOOD │ Estou à disposição para Coders Community!");

    const guild = bot.guilds.cache.get(id)

    let atividade = [
        `Coders Community`,
        `${guild.memberCount} membros`
    ];
    let periodo = 0;

    setInterval(() => {
        bot.user.setPresence({
            activities: [ { type: "WATCHING", name: `${atividade[periodo++ % atividade.length]}` } ],
            status: "online"
        })
    }, 20000)
}