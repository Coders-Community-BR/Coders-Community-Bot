const { MessageEmbed } = require("discord.js"),
    { guild_informations: { welcome_channel } } = require("../config/client/client-info");

module.exports.run = (member, bot) => {
    const Channel = member.guild.channels.cache.get(welcome_channel)
    try {
        Channel.send({ embeds:[
            new MessageEmbed()
                .setAuthor("Sistema " + bot.user.username, bot.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
                .setColor("RANDOM")
                .setTitle(`🖐 Adeus ${member.user.username}!`)
                .setThumbnail(member.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
                .setDescription(`**Foi um prazer tê-lo em nossa comunidade, mas parece que agora nos despedimos.**`)
                .setFooter("Sistema de Recepção", `https://cdn.discordapp.com/icons/${member.guild.id}/${member.guild.icon}.png`)
                .setTimestamp()
        ] });
    } catch(e) {
        console.log("│ ERRO │ Não foi possível enviar a mensagem de boas vindas")
        
    }
}