const { SlashCommandBuilder } = require("@discordjs/builders"),
    { guild_informations: { staff_id }, owner_informations: { id } } = require("../../../config/client/client-info"),
    { MessageEmbed } = require("discord.js"),
    { Clear, Dark, Other } = require("../../../config/client/client-colors"),
    { Aviso, Ação } = require("../../../config/client/client-reports"),
    { deploying } = require("../../../config/components/deploy")

module.exports = {
    run: (interaction, bot) => {

        if (!staff_id.includes(interaction.user.id)) return interaction.reply({ embeds: [
            new MessageEmbed()
                .setAuthor("Sistema " + bot.user.username, bot.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
                .setColor(Other.Gold)
                .setTitle(Aviso)
                .setDescription("**> Esse comando é apenas liberado para a equipe administrativa do servidor.**")
                .setFooter("Solicitado por " + interaction.user.username,interaction.user.displayAvatarURL({dynamic: true, format: "png", size: 1024}))
        ], ephemeral: true });
        if (staff_id.includes(interaction.user.id)) {
            if (interaction.user.id == id) {
                interaction.reply({ embeds: [
                    new MessageEmbed()
                        .setAuthor("Sistema " + bot.user.username, bot.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
                        .setColor(Clear.Green)
                        .setTitle(Ação)
                        .setDescription("**> Novo deploy foi registrado. A minha base de comandos foi atualizada.**")
                        .setFooter("Solicitado por " + interaction.user.username,interaction.user.displayAvatarURL({dynamic: true, format: "png", size: 1024}))
                ], ephemeral: true });
                return deploying(bot.slash_commands);
            } else {
                interaction.reply({ embeds: [
                    new MessageEmbed()
                        .setAuthor("Sistema " + bot.user.username, bot.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
                        .setColor(Clear.Yellow)
                        .setTitle(Aviso)
                        .setDescription("**> Infelizmente apenas 'Pedrão#2655' possui a permissão para realizar esse comando.**")
                        .setFooter("Solicitado por " + interaction.user.username,interaction.user.displayAvatarURL({dynamic: true, format: "png", size: 1024}))
                ], ephemeral: true });
            }
        }
    },
    
    builder: new SlashCommandBuilder()
        .setName("deploy")
        .setDescription("〔🔒 Owner〕 Restrito aos meus administradores! Refere-se a atualização de comandos!"),
    
    help: {
        status: "running", // building, running, stopped
        details: "Esse comando é restrito a equipe da staff e ao meu criador. Ele proporciona a atualização dos comandos para esse servidor."
    }
}