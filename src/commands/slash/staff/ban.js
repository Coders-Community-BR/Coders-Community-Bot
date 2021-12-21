const { SlashCommandBuilder } = require("@discordjs/builders"),
    { MessageEmbed } = require("discord.js"),
    { Aviso, Alerta } = require("../../../config/client/client-reports"),
    { guild_informations: { staff_id }, bot_informations: { id } } = require("../../../config/client/client-info"),
    { Clear, Other } = require("../../../config/client/client-colors")

module.exports = {
    run: (interaction ,bot) => {
        const member = interaction.options.get("membro");
        const reason = interaction.options.get("reason").value;
        let days = interaction.options.get("days");
        if (days) days = interaction.options.get("days").value;
        if (days > 7 || days < 0) return interaction.reply({content: "**❌ Somente são suportados valores entre 0 e 7 para a categoria 'days'**"})
        if (!days) days = 0

        if (!staff_id.includes(interaction.user.id)) {
            interaction.reply({ embeds: [
                new MessageEmbed()
                    .setAuthor("Sistema " + bot.user.username, bot.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
                    .setColor(Clear.Red)
                    .setTitle(Alerta)
                    .setTimestamp()
                    .setDescription(`> **É preciso fazer parte da Staff da Coders Community para realizar esse comando.**`)
                    .setFooter("Solicitado por " + interaction.user.username,interaction.user.displayAvatarURL({dynamic: true, format: "png", size: 1024}))
            ], ephemeral: true });
        } else {
            if (!interaction.member.permissions.has("BAN_MEMBERS")) {
                interaction.reply({ embeds: [
                    new MessageEmbed()
                        .setAuthor("Sistema " + bot.user.username, bot.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
                        .setColor(Clear.Red)
                        .setTitle(Alerta)
                        .setTimestamp()
                        .setDescription(`> **Desculpe ${interaction.user.username}, mas você não possui permissão para banir membros desse servidor.**`)
                        .setFooter("Solicitado por " + interaction.user.username,interaction.user.displayAvatarURL({dynamic: true, format: "png", size: 1024}))
                ], ephemeral: true })
            } else {
                if (staff_id.includes(member.user.id)) {
                    return interaction.reply({ embeds: [
                        new MessageEmbed()
                            .setAuthor("Sistema " + bot.user.username, bot.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
                            .setColor(Clear.Red)
                            .setTitle(Alerta)
                            .setTimestamp()
                            .setDescription(`> **Desculpe ${interaction.user.username}, mas não tenho permissões para banir membros da staff.**`)
                            .setFooter("Solicitado por " + interaction.user.username,interaction.user.displayAvatarURL({dynamic: true, format: "png", size: 1024}))
                    ], ephemeral: true });
                }
                if (member.user.id == id) {
                    return interaction.reply({ embeds: [
                        new MessageEmbed()
                            .setAuthor("Sistema " + bot.user.username, bot.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
                            .setColor(Clear.Red)
                            .setTitle(Alerta)
                            .setTimestamp()
                            .setDescription(`> **Desculpe ${interaction.user.username}, mas não posso simplesmente me banir.**`)
                            .setFooter("Solicitado por " + interaction.user.username,interaction.user.displayAvatarURL({dynamic: true, format: "png", size: 1024}))
                    ], ephemeral: true });
                }

                member.member.ban({ days: days, reason: reason});

                interaction.reply({ embeds: [
                    new MessageEmbed()
                        .setAuthor("Sistema " + bot.user.username, bot.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
                        .setColor(Other.MediumBlue)
                        .setTitle("🚫 Novo Usuário Banido")
                        .setThumbnail(member.user.displayAvatarURL({dynamic: true, format: "png", size: 1024}))
                        .setTimestamp()
                        .setDescription(`> **Usuário:** \`${member.user.username}\` \n> **Razão:** \`${reason}\` \n> **Dias de Mensagens Apagadas:** \`${days}\``)
                        .setFooter("Solicitado por " + interaction.user.username,interaction.user.displayAvatarURL({dynamic: true, format: "png", size: 1024}))                    
                ], ephemeral: false })
            }
        }

        // interaction.reply({ content: "Manutenção", ephemeral: true });
    },
    
    builder: new SlashCommandBuilder()
        .setName("ban")
        .setDescription("〔👑 Staff〕 Restrito à equipe da Staff. Bane membros do servidor.")
        .addUserOption(option => 
            option.setName("membro")
                .setDescription("Por favor insira o nome do membro a ser banido.")
                .setRequired(true)    
        )
        .addStringOption(option => 
            option.setName("reason")
                .setDescription("Insira o motivo pelo qual o ban foi aplicado.")
                .setRequired(true)
        )
        .addIntegerOption(option => 
            option.setName("days")
                .setDescription("Número de dias de mensagens a serem excluídas, deve estar entre 0 e 7, inclusive. Padrão: '0'")
                .setRequired(false)
        ),
    
    help: {
        status: "building", // building, running, stopped
        details: "Esse comando é restrito a Staff da Coders Community. Ele executa o ban de membros desse servidor, quando solicitado."
    }
}