const { guild_informations: { staff_id, able_channels_id, sugest_channels } } = require("../config/client/client-info"),
    { MessageEmbed } = require("discord.js"),
    { Clear, Dark, Other } = require("../config/client/client-colors"),
    { Aviso } = require("../config/client/client-reports")
 
module.exports.run = (message, bot) => {
    const Mention = message.mentions.users.first();

    if (message.author.bot) return;
    if (message.channel.type == "DM") return;

    //console.log(message.author.id);

    if (Mention) {
        if (message.channel.id == "830511022493532172" || message.channel.id == "830582009994018846") return;
        if (staff_id.includes(message.author.id)) {
            if (Mention.username == bot.user.username) {
                message.reply({ embeds: [
                    new MessageEmbed()
                        .setAuthor("Sistema " + bot.user.username, bot.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
                        .setColor(Other.MediumBlue)
                        .setTitle("👋 Olá! Em que eu posso ajudar?")
                        .setTimestamp()
                        .setThumbnail("https://i.pinimg.com/originals/87/f0/2d/87f02db86727af517f6a500cef7f202d.gif")
                        .setDescription(`> Consulte meus comandos em: ** /help ** `)
                        .setFooter("Solicitado por " + message.author.username, message.author.displayAvatarURL({dynamic: true, format: "png", size: 1024}))
                ] });
            } 
        } else {
            if (able_channels_id.includes(message.channel.id)) {
                if (Mention.username == bot.user.username) {
                    message.reply({ embeds: [
                        new MessageEmbed()
                            .setAuthor("Sistema " + bot.user.username, bot.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
                            .setColor(Other.MediumBlue)
                            .setTitle("👋 Olá! Em que eu posso ajudar?")
                            .setTimestamp()
                            .setThumbnail("https://i.pinimg.com/originals/87/f0/2d/87f02db86727af517f6a500cef7f202d.gif")
                            .setDescription(`> Consulte meus comandos em: ** /help ** `)
                            .setFooter("Solicitado por " + message.author.username, message.author.displayAvatarURL({dynamic: true, format: "png", size: 1024}))
                    ] });
                }
            } else {
                return;
            }
        }
    }

    if (sugest_channels.includes(message.channel.id)) {
        message.react("👍").catch(console.error);
        message.react("👎").catch(console.error);
    }

}