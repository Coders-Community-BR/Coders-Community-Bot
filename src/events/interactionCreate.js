const { MessageEmbed } = require("discord.js"),
    { bot_informations: { name }, owner_informations, guild_informations: { staff_id, able_channels_id } } = require("../config/client/client-info"),
    { Clear, Other } = require("../config/client/client-colors"),
    { Alerta, Aviso } = require("../config/client/client-reports")

module.exports.run = (interaction, bot) => {
    const { commandName } = interaction;

    if (interaction.isCommand()) {
        let slash_command = bot.slash_commands.get(commandName);

        if (!able_channels_id.includes(interaction.channel.id) && !staff_id.includes(interaction.user.id)) return interaction.reply({ embeds: [
            new MessageEmbed()
                .setAuthor("Sistema " + name, bot.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
                .setColor(Other.MediumBlue)
                .setTitle(Aviso)
                .setDescription("**> Eu não posso enviar mensagens nesse canal de texto. Ele está desabilitado em minhas configurações.**")
                .setFooter("Solicitado por " + interaction.user.username,interaction.user.displayAvatarURL({dynamic: true, format: "png", size: 1024}))
        ], ephemeral: true })

        if (slash_command.help.status == "stopped") return interaction.reply({ embeds: [
            new MessageEmbed()
                .setAuthor("Sistema " + name, bot.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
                .setColor(Clear.Red)
                .setTitle(Alerta)
                .setDescription("**> Esse comando foi descontinuado de meus serviços. Caso precise de ajuda, contate meu desenvolvedor. **\n**Owner: **` " + owner_informations.name + "#" + owner_informations.discriminator + " ` ")
                .setFooter("Solicitado por " + interaction.user.username,interaction.user.displayAvatarURL({dynamic: true, format: "png", size: 1024}))
        ], ephemeral: true });

        if (slash_command.help.status == "building") {
            if (staff_id.includes(interaction.user.id)) {
                return slash_command.run(interaction, bot)
            } else {
                return interaction.reply({ embeds: [
                    new MessageEmbed()
                        .setAuthor("Sistema " + name, bot.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
                        .setColor(Clear.Yellow)
                        .setTitle(Aviso)
                        .setDescription("**> Esse comando está em construção. Ele ainda não é completamente operável, portanto apenas a staff pode utilizá-lo.**")
                        .setFooter("Solicitado por " + interaction.user.username,interaction.user.displayAvatarURL({dynamic: true, format: "png", size: 1024}))
                ], ephemeral: true });
            }
        }

        if (slash_command.help.status == "running") return slash_command.run(interaction, bot)
    }
    if (interaction.isButton()) {
        //
    }
    if (interaction.isSelectMenu()) {
        const { customId } = interaction;

        const select_menu = bot.select_menus.get(customId)

        if (select_menu) {
            select_menu.run(interaction, bot)
        } else {
            console.log("│ ERRO │ Nenhum select_menu foi encontrado para " + customId)
        }
    }
}