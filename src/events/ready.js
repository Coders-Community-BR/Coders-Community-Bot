const { guild_informations: { id } } = require("../config/client/client-info"),
    { logs } = require("../config/components/logs"),
    { status } = require("../database/data");


module.exports.run = (bot) => {
    console.log("│ GOOD │ Estou à disposição para Coders Community!");

    if (status == true) {
        console.log("│ GOOD │ O Banco de Dados pôde ser usado durante essa inicialização.")
    }
    if (status == false) {
        console.log("│ INFO │ O Banco de Dados não pôde ser usado durante essa inicialização.")
    }

    /* logs(
    {
        name: "'Start'",
        color: "GREEN"
    }, 
    "`Iniciou o Bot`",
    bot
    ) */

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