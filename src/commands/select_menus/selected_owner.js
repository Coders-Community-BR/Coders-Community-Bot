const { MessageEmbed } = require("discord.js"),
    { Clear, Dark, Other } = require("../../config/client/client-colors");

module.exports = {
    run: (interaction, bot) => {
        const value = interaction.values[0].split("_")[0];

        const data_command = bot.slash_commands.get(value)

        if (!data_command) return console.log("│ ERRO │ Não foi possivel encontrar o comando '" + value + "'")

        interaction.update({ embeds: [
            new MessageEmbed()
                .setAuthor("Sistema " + bot.user.username, bot.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
                .setColor(Other.MediumBlue)
                .setThumbnail("https://www.bbva.com/wp-content/uploads/2020/03/fronteras-premio-computacion-cuantica-bbva.jpg")
                .setTimestamp()
                .setTitle("🔒 Comando '" + data_command.builder.name + "'")
                .setDescription("```" + data_command.help.details + "```\n\n**🔨 Status de Execução:** ` " + data_command.help.status + " `")
                .setFooter("Solicitado por " + interaction.user.username,interaction.user.displayAvatarURL({dynamic: true, format: "png", size: 1024}))
        ], ephemeral: true, components: [] });
    },
    Custom_Id:"selected_owner"
}