const { SlashCommandBuilder } = require("@discordjs/builders"),
    { MessageEmbed } = require("discord.js"),
    { Clear } = require("../../../config/client/client-colors")

module.exports = {
    run: (interaction ,bot) => {
        interaction.reply({ embeds: [
            new MessageEmbed()
                .setAuthor("Sistema " + bot.user.username, bot.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
                .setColor(Clear.Green)
                .setTitle("🏓 Pong!")
                .setTimestamp()
                .setThumbnail("https://cdn.dribbble.com/users/106600/screenshots/2568106/wifi_2x.gif")
                .setDescription(`> Meu ping está em : **${Math.round(bot.ws.ping)}ms**\n> Latência da APi : **${(interaction.createdTimestamp - Date.now())*(-1)}ms**`)
                .setFooter("Solicitado por " + interaction.user.username,interaction.user.displayAvatarURL({dynamic: true, format: "png", size: 1024}))
        ], ephemeral: false })
    },
    
    builder: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("〔❓ Info〕 Retorna o ping do bot e o ping da API!"),
    
    help: {
        status: "running", // building, running, stopped
        details: "O bot responderá com a latência da aplicação e com a latência da API."
    }
}