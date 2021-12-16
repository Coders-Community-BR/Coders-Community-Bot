module.exports.run = (bot) => {
    console.log("│ GOOD │ Estou à disposição para Coders Community!");

    let atividade = [
        `Coders Community`,
        `${bot.users.cache.size} membros`
    ];
    let periodo = 0;

    setInterval(() => {
        bot.user.setPresence({
            activities: [ { type: "WATCHING", name: `${atividade[periodo++ % atividade.length]}` } ],
            status: "idle"
        })
    }, 20000)
}