const { SlashCommandBuilder } = require("@discordjs/builders"),
    { MessageEmbed } = require("discord.js"),
    { guild_informations: { staff_id, punishment_channel }, bot_informations: { id } } = require("../../../config/client/client-info"),
    { Alerta } = require("../../../config/client/client-reports"),
    { Clear, Other } = require("../../../config/client/client-colors");

module.exports = {
    run: async (interaction ,bot) => {
        const Channel = interaction.guild.channels.cache.get(punishment_channel)
        const member = interaction.options.get("membro");

        if (!staff_id.includes(interaction.user.id)) {
            return interaction.reply({ embeds: [
                new MessageEmbed()
                    .setAuthor("Sistema " + bot.user.username, bot.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
                    .setColor(Clear.Red)
                    .setTitle(Alerta)
                    .setTimestamp()
                    .setDescription(`> **É preciso fazer parte da Staff da Coders Community para realizar esse comando.**`)
                    .setFooter("Solicitado por " + interaction.user.username,interaction.user.displayAvatarURL({dynamic: true, format: "png", size: 1024}))
            ], ephemeral: true });
        }
        if (staff_id.includes(member.user.id)) {
            return interaction.reply({ embeds: [
                new MessageEmbed()
                    .setAuthor("Sistema " + bot.user.username, bot.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
                    .setColor(Clear.Red)
                    .setTitle(Alerta)
                    .setTimestamp()
                    .setDescription(`> **Desculpe ${interaction.user.username}, mas não posso desmutar membros da staff.**`)
                    .setFooter("Solicitado por " + interaction.user.username, interaction.user.displayAvatarURL({dynamic: true, format: "png", size: 1024}))
            ], ephemeral: true });
        }
        if (member.user.id == id) {
            return interaction.reply({ embeds: [
                new MessageEmbed()
                    .setAuthor("Sistema " + bot.user.username, bot.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
                    .setColor(Clear.Red)
                    .setTitle(Alerta)
                    .setTimestamp()
                    .setDescription(`> **Desculpe ${interaction.user.username}, mas não posso simplesmente me desmutar.**`)
                    .setFooter("Solicitado por " + interaction.user.username,interaction.user.displayAvatarURL({dynamic: true, format: "png", size: 1024}))
            ], ephemeral: true });
        }

        try {
            await member.member.timeout(null)
            interaction.reply({ content: "**🔊 Ação Efetuada. Membro** `" + member.user.username + "` **foi desmutado com sucesso.**", ephemeral: true });
            console.log("│ INFO │ Novo usuário foi desmutado no servidor. User: " + member.user.username);
            Channel.send({ embeds: [
                new MessageEmbed()
                    .setAuthor("Sistema " + bot.user.username, bot.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
                    .setColor(Other.MediumBlue)
                    .setTitle("🔊 Remoção do Mute")
                    .setThumbnail(member.user.displayAvatarURL({dynamic: true, format: "png", size: 1024}))
                    .setTimestamp()
                    .setDescription(`> **Usuário:** \`${member.user.username}\``)
                    .setFooter("Solicitado por " + interaction.user.username,interaction.user.displayAvatarURL({dynamic: true, format: "png", size: 1024}))   
            ] });
        } catch(e) {
            interaction.reply({embeds: [
                new MessageEmbed()
                    .setAuthor("Sistema " + bot.user.username, bot.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
                    .setColor(Clear.Red)
                    .setTitle(Alerta)
                    .setTimestamp()
                    .setDescription(`> **Desculpe ${interaction.user.username}, mas este usuário não está mutado.**`)
                    .setFooter("Solicitado por " + interaction.user.username,interaction.user.displayAvatarURL({dynamic: true, format: "png", size: 1024}))
            ], ephemeral: true})
        }
    },
    
    builder: new SlashCommandBuilder()
        .setName("unmute")
        .setDescription("〔👑 Staff〕 Restrito à equipe da Staff. Desmuta membros do servidor!")
        .addUserOption(option => 
            option.setName("membro")
                .setDescription("Insira o membro que ira receber o mute.")
                .setRequired(true)
        ),
    
    help: {
        status: "running", // building, running, stopped
        details: "Esse comando é restrito a Staff da Coders Community. Ele remove o mute de membros desse servidor, quando solicitado."
    }
}