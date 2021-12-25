const { SlashCommandBuilder } = require("@discordjs/builders"),
    { MessageEmbed } = require("discord.js"),
    { guild_informations: { staff_id, punishment_channel }, bot_informations: { id } } = require("../../../config/client/client-info"),
    { Alerta } = require("../../../config/client/client-reports"),
    { Clear, Other } = require("../../../config/client/client-colors");

module.exports = {
    run: async (interaction ,bot) => {
        const Channel = interaction.guild.channels.cache.get(punishment_channel)
        const member = interaction.options.get("membro");
        const reason = interaction.options.get("reason").value;
        let time = interaction.options.get("time").value;

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
                    .setDescription(`> **Desculpe ${interaction.user.username}, mas não tenho permissões para mutar membros da staff.**`)
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
                    .setDescription(`> **Desculpe ${interaction.user.username}, mas não posso simplesmente me mutar.**`)
                    .setFooter("Solicitado por " + interaction.user.username,interaction.user.displayAvatarURL({dynamic: true, format: "png", size: 1024}))
            ], ephemeral: true });
        }

        await member.member.timeout(time*60*60*1000, reason).then(() => {
            console.log("│ INFO │ Novo usuário foi mutado no servidor. User: " + member.user.username)

            interaction.reply({ content: "**🔇 Ação Efetuada. Membro** `" + member.user.username + "` **foi mutado com sucesso.**", ephemeral: true });

            Channel.send({ embeds: [
                new MessageEmbed()
                    .setAuthor("Sistema " + bot.user.username, bot.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
                    .setColor(Other.MediumBlue)
                    .setTitle("🔇 Novo Usuário Mutado")
                    .setThumbnail(member.user.displayAvatarURL({dynamic: true, format: "png", size: 1024}))
                    .setTimestamp()
                    .setDescription(`> **Usuário:** \`${member.user.username}\` \n> **Razão:** \`${reason}\` \n> **Horas de Mute:** \`${time}\``)
                    .setFooter("Solicitado por " + interaction.user.username,interaction.user.displayAvatarURL({dynamic: true, format: "png", size: 1024}))   
            ] });
        }).catch(console.error);
    },
    
    builder: new SlashCommandBuilder()
        .setName("mute")
        .setDescription("〔👑 Staff〕 Restrito à equipe da Staff. Muta membros do servidor!")
        .addUserOption(option => 
            option.setName("membro")
                .setDescription("Insira o membro que ira receber o mute.")
                .setRequired(true)
        )
        .addNumberOption(option => 
            option.setName("time")
                .setDescription("Tempo do mute. Ex: '1,5 --> 1h e 30min' / Atenção: Use ',', e não '.' para a separação.")
                .setRequired(true)
        )
        .addStringOption(option => 
            option.setName("reason")
                .setDescription("Insira o motivo pelo qual esse membro está sendo mutado.")
                .setRequired(true)
        ),
    
    help: {
        status: "running", // building, running, stopped
        details: "Esse comando é restrito a Staff da Coders Community. Ele executa o mute de membros desse servidor, quando solicitado."
    }
}