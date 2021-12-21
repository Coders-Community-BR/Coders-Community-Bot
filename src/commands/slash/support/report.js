const { SlashCommandBuilder } = require("@discordjs/builders"),
    { MessageEmbed } = require("discord.js"),
    { Clear } = require("../../../config/client/client-colors"),
    { guild_informations: { staff_channel } } = require("../../../config/client/client-info")

module.exports = {
    run: (interaction ,bot) => {
        let Channel = interaction.guild.channels.cache.find(channel => channel.id == staff_channel)
        let SOoption = interaction.options.get("problema").value;
        let Moption = interaction.options.get("membro");
        let Soption = interaction.options.get("comportamento");

        if (Moption !== null) Moption = interaction.guild.members.cache.find(member => member.id == Moption.value).user.username
        if (Soption !== null) Soption = Soption.value;

        if (Moption == null) Moption = "Não Informado"
        if (Soption == null) Soption = "Não Informado"

        if (Soption == "bot_error") Soption = "Erro no Bot."
        if (Soption == "flood") Soption = "Membro está flodando chat."
        if (Soption == "pertubacao_c") Soption = "Membro está pertubando no chat."
        if (Soption == "pertubacao_d") Soption = "Membro está pertubando na dm."
        if (Soption == "i_conteudo") Soption = "Membro está divulgando conteúdos inapropiados."
        if (Soption == "desrespeito") Soption = "Membro está sendo desrespeitoso."

        interaction.reply({ embeds: [
            new MessageEmbed()
                .setAuthor("Sistema " + bot.user.username, bot.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
                .setColor(Clear.Purple)
                .setTitle("📢 Novo Report")
                .setTimestamp()
                .setThumbnail("https://www.tradeview.my/images/easyblog_articles/220/b2ap3_large_report.jpg")
                .setDescription("> **Individuo reportado:** ` " + Moption + " `\n> **Comportamento:** ` " + Soption + " `\n\n```" + SOoption + "```")
                .setFooter("Report efetuado por " + interaction.user.username, interaction.user.displayAvatarURL({dynamic: true, format: "png", size: 1024}))
        ], ephemeral: true  });

        Channel.send({ embeds: [
            new MessageEmbed()
                .setAuthor("Sistema " + bot.user.username, bot.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
                .setColor(Clear.Purple)
                .setTitle("📢 Adm's - Novo Report")
                .setTimestamp()
                .setThumbnail("https://www.tradeview.my/images/easyblog_articles/220/b2ap3_large_report.jpg")
                .setDescription("> **Individuo reportado:** ` " + Moption + " `\n> **Comportamento:** ` " + Soption + " `\n\n```" + SOoption + "```")
                .setFooter("Report efetuado por " + interaction.user.username, interaction.user.displayAvatarURL({dynamic: true, format: "png", size: 1024}))
        ] });

    },
    
    builder: new SlashCommandBuilder()
        .setName("report")
        .setDescription("〔🧾 Support〕 Alerte a staff sobre algum problema.")
        .addStringOption(SOoption => 
            SOoption.setName("problema")
                .setDescription("Descreva a razão de sua reclamação. Seja claro e direto.")
                .setRequired(true)
        )
        .addMentionableOption(Moption => 
            Moption.setName("membro")
                .setDescription("Marque o usuário que está agindo incorretamente.")
                .setRequired(false)
        )
        .addStringOption(Soption => 
            Soption.setName("comportamento")
                .setDescription("Caso haja. Adicione a opção associada ao problema.")
                .setRequired(false)
                .addChoice("Erro no Bot", "bot_error")
                .addChoice("Flood", "flood")
                .addChoice("Pertubação no Chat", "pertubacao_c")
                .addChoice("Pertubação na DM", "pertubacao_d")
                .addChoice("Conteúdo Inapropiado", "i_conteudo")
                .addChoice("Desrespeito", "desrespeito")
        ),
    
    help: {
        status: "running", // building, running, stopped
        details: "Esse comando oferece uma forma eficaz de alertar a staff da Coders Community sobre algum problema que está ocorrendo dentro do servidor. Se usado incorretamente, o banimento poderá ser aplicado."
    }
}