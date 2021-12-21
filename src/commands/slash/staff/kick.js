const { SlashCommandBuilder } = require("@discordjs/builders"),
    { MessageEmbed } = require("discord.js"),
    { guild_informations: { staff_id, punishment_channel }, bot_informations: { id } } = require("../../../config/client/client-info"),
    { Alerta } = require("../../../config/client/client-reports"),
    { Clear, Other } = require("../../../config/client/client-colors");

module.exports = {
    run: async (interaction ,bot) => {
        let Channel = interaction.guild.channels.cache.find(channel => channel.id == punishment_channel)
        const member = interaction.options.get("membro");
        const reason = interaction.options.get("reason").value;

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
        } else {
            if (!interaction.member.permissions.has("KICK_MEMBERS")) {
                return interaction.reply({ embeds: [
                    new MessageEmbed()
                        .setAuthor("Sistema " + bot.user.username, bot.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
                        .setColor(Clear.Red)
                        .setTitle(Alerta)
                        .setTimestamp()
                        .setDescription(`> **Desculpe ${interaction.user.username}, mas você não possui permissão para expulsar membros desse servidor.**`)
                        .setFooter("Solicitado por " + interaction.user.username,interaction.user.displayAvatarURL({dynamic: true, format: "png", size: 1024}))
                ], ephemeral: true });
            } else {
                if (staff_id.includes(member.user.id)) {
                    return interaction.reply({ embeds: [
                        new MessageEmbed()
                            .setAuthor("Sistema " + bot.user.username, bot.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
                            .setColor(Clear.Red)
                            .setTitle(Alerta)
                            .setTimestamp()
                            .setDescription(`> **Desculpe ${interaction.user.username}, mas não tenho permissões para expulsar membros da staff.**`)
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
                            .setDescription(`> **Desculpe ${interaction.user.username}, mas não posso simplesmente me expulsar.**`)
                            .setFooter("Solicitado por " + interaction.user.username,interaction.user.displayAvatarURL({dynamic: true, format: "png", size: 1024}))
                    ], ephemeral: true });
                }

                await member.member.kick({ reason: reason });

                interaction.reply({ content: "**💀 Ação Efetuada. Membro** `" + member.user.username + "` **foi expulso com sucesso.**", ephemeral: true })
                Channel.send({ embeds: [
                    new MessageEmbed()
                        .setAuthor("Sistema " + bot.user.username, bot.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
                        .setColor(Other.MediumBlue)
                        .setTitle("🚫 Novo Usuário Expulso")
                        .setThumbnail(member.user.displayAvatarURL({dynamic: true, format: "png", size: 1024}))
                        .setTimestamp()
                        .setDescription(`> **Usuário:** \`${member.user.username}\` \n> **Razão:** \`${reason}\``)
                        .setFooter("Solicitado por " + interaction.user.username,interaction.user.displayAvatarURL({dynamic: true, format: "png", size: 1024}))                    
                ] });
            }
        }
    },
    
    builder: new SlashCommandBuilder()
        .setName("kick")
        .setDescription("〔👑 Staff〕 Restrito à equipe da Staff. Expulsa membros do servidor.")
        .addUserOption(option => 
            option.setName("membro")
                .setDescription("Insira o membro do servidor que deseja expulsar.")
                .setRequired(true)    
        )
        .addStringOption(option => 
            option.setName("reason")
                .setDescription("Insira o motivo pelo qual esse usuário está sendo expulso do servidor.")
                .setRequired(true)
        ),
    
    help: {
        status: "running", // building, running, stopped
        details: "Quando solicitado, o bot expulsará um membro do servidor. Esse comando só pode ser utilizado pela Staff da Coders Community."
    }
}