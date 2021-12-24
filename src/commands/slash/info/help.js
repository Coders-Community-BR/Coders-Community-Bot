const { SlashCommandBuilder } = require("@discordjs/builders"),
    { MessageEmbed, MessageActionRow, MessageSelectMenu } = require("discord.js"),
    { Clear } = require("../../../config/client/client-colors")

module.exports = {
    run: (interaction, bot) => {
        let topic = interaction.options.get("topic").value;
        let space = " ";

        let info_slash_commands = [];
        let owner_slash_commands = [];
        let support_slash_commands = [];
        let staff_slash_commands = [];
        let helpers_slash_commands = [];

        let info_options = [];
        let owner_options = [];
        let support_options = [];
        let staff_options = [];
        let helpers_options =[];

        bot.slash_commands.forEach(slash_command => {
            if (slash_command.builder.description.startsWith("〔❓ Info〕")) {
                info_slash_commands.push(slash_command)
            }
            if (slash_command.builder.description.startsWith("〔🔒 Owner〕")) {
                owner_slash_commands.push(slash_command)
            }
            if (slash_command.builder.description.startsWith("〔🧾 Support〕")) {
                support_slash_commands.push(slash_command)
            }
            if (slash_command.builder.description.startsWith("〔👑 Staff〕")) {
                staff_slash_commands.push(slash_command)
            }
            if (slash_command.builder.description.startsWith("〔🤝 Helpers〕")) {
                helpers_slash_commands.push(slash_command)
            }
        });

        bot.slash_commands.forEach(slash_command => {
            if (slash_command.builder.description.startsWith("〔❓ Info〕")) {
                info_options.push({
                    label: slash_command.builder.name,
                    description: slash_command.builder.description,
                    value: slash_command.builder.name + "_id"
                })
            }
            if (slash_command.builder.description.startsWith("〔🔒 Owner〕")) {
                owner_options.push({
                    label: slash_command.builder.name,
                    description: slash_command.builder.description,
                    value: slash_command.builder.name + "_id"
                })
            }
            if (slash_command.builder.description.startsWith("〔🧾 Support〕")) {
                support_options.push({
                    label: slash_command.builder.name,
                    description: slash_command.builder.description,
                    value: slash_command.builder.name + "_id"
                })
            }
            if (slash_command.builder.description.startsWith("〔👑 Staff〕")) {
                staff_options.push({
                    label: slash_command.builder.name,
                    description: slash_command.builder.description,
                    value: slash_command.builder.name + "_id"
                })
            }
            if (slash_command.builder.description.startsWith("〔🤝 Helpers〕")) {
                helpers_options.push({
                    label: slash_command.builder.name,
                    description: slash_command.builder.description,
                    value: slash_command.builder.name + "_id"
                })
            }
        });

        
        if (topic == "info") {
            const selected_info = new MessageActionRow()
                .addComponents(
                    new MessageSelectMenu()
                        .setCustomId("selected_info")
                        .setPlaceholder("Ver Comandos Detalhadamente")
                        .addOptions(info_options)
                );
            interaction.reply({ embeds: [
                new MessageEmbed()
                    .setAuthor("Sistema " + bot.user.username, bot.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
                    .setColor(Clear.Orange)
                    .setTitle("❓ Comandos de Barra --> Info")
                    .setThumbnail("https://i.pinimg.com/originals/b6/a3/d1/b6a3d158ddc3edf48da43fcf6ca75237.gif")
                    .setDescription("```📀NOME              🔨STATUS\n" + `${info_slash_commands.map(command => `/${command.builder.name}${space.repeat(17 - (command.builder.name.length - 4))}${command.help.status}` ).join("\n")}` + "```")
                    .setFooter("Solicitado por " + interaction.user.username,interaction.user.displayAvatarURL({dynamic: true, format: "png", size: 1024}))
            ], ephemeral: true, components: [selected_info] });
        }
        if (topic == "owner") {
            const selected_owner = new MessageActionRow()
                .addComponents(
                    new MessageSelectMenu()
                        .setCustomId("selected_owner")
                        .setPlaceholder("Ver Comandos Detalhadamente")
                        .addOptions(owner_options)
                );
            interaction.reply({ embeds: [
                new MessageEmbed()
                    .setAuthor("Sistema " + bot.user.username, bot.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
                    .setColor(Clear.Blue)
                    .setTitle("🔒 Comandos de Barra --> Owner")
                    .setThumbnail("https://i.pinimg.com/originals/ef/d8/68/efd86898401b7d5c942ff1739c6d894a.gif")
                    .setDescription("```📀NOME              🔨STATUS\n" + `${owner_slash_commands.map(command => `/${command.builder.name}${space.repeat(17 - (command.builder.name.length - 4))}${command.help.status}` ).join("\n")}` + "```")
                    .setFooter("Solicitado por " + interaction.user.username,interaction.user.displayAvatarURL({dynamic: true, format: "png", size: 1024}))
            ], ephemeral: true, components: [selected_owner] });
        }
        if (topic == "support") {
            const selected_support = new MessageActionRow()
                .addComponents(
                    new MessageSelectMenu()
                        .setCustomId("selected_support")
                        .setPlaceholder("Ver Comandos Detalhadamente")
                        .addOptions(support_options)
                );
            interaction.reply({ embeds: [
                new MessageEmbed()
                    .setAuthor("Sistema " + bot.user.username, bot.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
                    .setColor(Clear.Blue)
                    .setTitle("🧾 Comandos de Barra --> Support")
                    .setThumbnail("https://i.pinimg.com/originals/ef/d8/68/efd86898401b7d5c942ff1739c6d894a.gif")
                    .setDescription("```📀NOME              🔨STATUS\n" + `${support_slash_commands.map(command => `/${command.builder.name}${space.repeat(17 - (command.builder.name.length - 4))}${command.help.status}` ).join("\n")}` + "```")
                    .setFooter("Solicitado por " + interaction.user.username,interaction.user.displayAvatarURL({dynamic: true, format: "png", size: 1024}))
            ], ephemeral: true, components: [selected_support] });
        }
        if (topic == "staff") {
            const selected_staff = new MessageActionRow()
                .addComponents(
                    new MessageSelectMenu()
                        .setCustomId("selected_staff")
                        .setPlaceholder("Ver Comandos Detalhadamente")
                        .addOptions(staff_options)
                );
            interaction.reply({ embeds: [
                new MessageEmbed()
                    .setAuthor("Sistema " + bot.user.username, bot.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
                    .setColor(Clear.Blue)
                    .setTitle("👑 Comandos de Barra --> Staff")
                    .setThumbnail("https://i.imgur.com/5KvMmNg.gif")
                    .setDescription("```📀NOME              🔨STATUS\n" + `${staff_slash_commands.map(command => `/${command.builder.name}${space.repeat(17 - (command.builder.name.length - 4))}${command.help.status}` ).join("\n")}` + "```")
            ], ephemeral: true, components: [selected_staff] });
        }
        if (topic == "helpers") {
            const selected_helpers = new MessageActionRow()
                .addComponents(
                    new MessageSelectMenu()
                        .setCustomId("selected_helpers")
                        .setPlaceholder("Ver Comandos Detalhadamente")
                        .addOptions(helpers_options)
                );
            interaction.reply({ embeds: [
                new MessageEmbed()
                    .setAuthor("Sistema " + bot.user.username, bot.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
                    .setColor(Clear.Blue)
                    .setTitle("🤝 Comandos de Barra --> Helpers")
                    .setThumbnail("https://cdn.dribbble.com/users/31818/screenshots/2617464/dribbbb.gif")
                    .setDescription("```📀NOME              🔨STATUS\n" + `${helpers_slash_commands.map(command => `/${command.builder.name}${space.repeat(17 - (command.builder.name.length - 4))}${command.help.status}` ).join("\n")}` + "```")
            ], ephemeral: true, components: [selected_helpers] });
        }
    },
    
    builder: new SlashCommandBuilder()
        .setName("help")
        .setDescription("〔❓ Info〕 Dará a você a ajuda necessária para entender meus comandos.")
        .addStringOption(option => 
            option.setName("topic")
                .setDescription("Insira o tópico da pesquisa. Serão exibidos comandos associados a ele.")
                .setRequired(true)
                .addChoice("〔❓ Info〕", "info")
                .addChoice("〔🔒 Owner〕", "owner")
                .addChoice("〔🧾 Support〕", "support")
                .addChoice("〔👑 Staff〕", "staff")
                .addChoice("〔🤝 Helpers〕", "helpers")
        ),
    
    help: {
        status: "running", // building, running, stopped
        details: "o comando help trará uma visão superficial das informaçõees de todos os comandos e uma mais geral desses."
    }
}