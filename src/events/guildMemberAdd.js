const { MessageEmbed } = require("discord.js"),
    { guild_informations: { welcome_channel, rules_channel, register_channel, guide_channel }, guild_informations } = require("../config/client/client-info");

module.exports.run = (member, bot) => {
    const Channel = member.guild.channels.cache.get(welcome_channel)
    try {
        Channel.send({ embeds:[
            new MessageEmbed()
                .setAuthor("Sistema " + bot.user.username, bot.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
                .setColor("RANDOM")
                .setTitle(`👋 Seja Bem Vindo ${member.user.username}!`)
                .setThumbnail(member.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
                .setDescription(`**Antes de continuar, consulte os canais:**\n🧾 _**Regras:**_ ${member.guild.channels.cache.get(rules_channel)}\n📖 _**Registre-se:**_ ${member.guild.channels.cache.get(register_channel)}\n🔎 _**Guia de Canais:**_ ${member.guild.channels.cache.get(guide_channel)}`)
                .setFooter("Sistema de Recepção", `https://cdn.discordapp.com/icons/${member.guild.id}/${member.guild.icon}.png`)
                .setTimestamp()
        ] });
    } catch(e) {
        console.log("│ ERRO │ Não foi possível enviar a mensagem de boas vindas")
    }
}