const { guild_informations: { id } } = require("../config/client/client-info"),
    { status, class_data } = require("../database/data")

module.exports.run = (bot) => {
    console.log("│ GOOD │ Estou à disposição para Coders Community!");

    if (status == true) {
        console.log("│ GOOD │ Conexão com o banco de dados efetuada.")
    }
    if (status == false) {
        console.log("│ INFO │ Essa inicialização não utilizou o banco de dados.")
    }

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