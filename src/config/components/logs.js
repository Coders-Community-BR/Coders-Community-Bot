const { MessageEmbed } = require("discord.js"),
    { guild_informations: { logs_channel, id } } = require("../../config/client/client-info");

module.exports = {
    logs: (event, type, bot) => {
        const Channel = bot.channels.cache.get(logs_channel);
        const Guild = bot.guilds.cache.get(id)

        Channel.send({ embeds: [
            new MessageEmbed()
                .setAuthor("Sistema " + bot.user.username)
                .setColor(event.color)
                .setTitle("Novo Log " + event.name)
                .setThumbnail(bot.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
                .setTimestamp()
                .setDescription("> **Tipo de Log:** " + type)
                .setFooter("Leitura dos Logs", `https://cdn.discordapp.com/icons/${Guild.id}/${Guild.icon}.png`)
        ] })
    }
}