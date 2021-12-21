const { SlashCommandBuilder } = require("@discordjs/builders"),
    { MessageEmbed } = require("discord.js"),
    { Alerta } = require("../../../config/client/client-reports"),
    { guild_informations: { staff_id, punishment_channel } } = require("../../../config/client/client-info"),
    { Clear, Other } = require("../../../config/client/client-colors");

module.exports = {
    run: async (interaction ,bot) => {
        let info = interaction.options.get("user").value;
        const bans = await interaction.guild.bans.fetch()
        const Channel = interaction.guild.channels.cache.get(punishment_channel)

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
            if (!interaction.member.permissions.has("BAN_MEMBERS")) {
                return interaction.reply({ embeds: [
                    new MessageEmbed()
                        .setAuthor("Sistema " + bot.user.username, bot.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
                        .setColor(Clear.Red)
                        .setTitle(Alerta)
                        .setTimestamp()
                        .setDescription(`> **Desculpe ${interaction.user.username}, mas você não possui permissão para revogar banimentos nesse servidor.**`)
                        .setFooter("Solicitado por " + interaction.user.username,interaction.user.displayAvatarURL({dynamic: true, format: "png", size: 1024}))
                ], ephemeral: true });
            }

            
            const member = bans.find(u => u.user.id == info || u.user.username == info)

            if (!member) {
                const guild_member = interaction.guild.members.cache.find(gb => gb.user.id === info || gb.user.username === info)

                if (guild_member) {
                    return interaction.reply({ embeds: [
                        new MessageEmbed()
                        .setAuthor("Sistema " + bot.user.username, bot.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
                        .setColor(Clear.Red)
                        .setTitle(Alerta)
                        .setTimestamp()
                        .setDescription(`> **Impossível. Esse membro está no servidor e não está banido.**`)
                        .setFooter("Solicitado por " + interaction.user.username,interaction.user.displayAvatarURL({dynamic: true, format: "png", size: 1024}))
                    ], ephemeral: true });
                } else {
                    return interaction.reply({ embeds: [
                        new MessageEmbed()
                        .setAuthor("Sistema " + bot.user.username, bot.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
                        .setColor(Clear.Red)
                        .setTitle(Alerta)
                        .setTimestamp()
                        .setDescription(`> **Não foi digitado corretamente o id ou o nome de usuário. Certifique-se que o campo "user" foi preenchido corretamente.**`)
                        .setFooter("Solicitado por " + interaction.user.username,interaction.user.displayAvatarURL({dynamic: true, format: "png", size: 1024}))
                    ], ephemeral: true });
                }
            }
            await interaction.guild.bans.remove(member.user.id).then(unban => console.log("Usuário desbanido " + unban.username)).catch(console.error)
            interaction.reply({ content: "**✅ Ação Efetuada. Membro** `" + member.user.username + "` **teve seu banimento revogado.**", ephemeral: true });
            Channel.send({ embeds: [
                new MessageEmbed()
                    .setAuthor("Sistema " + bot.user.username, bot.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
                    .setColor(Other.MediumBlue)
                    .setTitle("🟢 Banimento Revogado")
                    .setThumbnail(member.user.displayAvatarURL({dynamic: true, format: "png", size: 1024}))
                    .setTimestamp()
                    .setDescription(`> **Usuário: ** \`${member.user.username}\``)
                    .setFooter("Solicitado por " + interaction.user.username,interaction.user.displayAvatarURL({dynamic: true, format: "png", size: 1024}))
            ] })
        }
    },
    
    builder: new SlashCommandBuilder()
        .setName("unban")
        .setDescription("〔👑 Staff〕 Restrito à equipe da Staff. Revoga banimentos do servidor.")
        .addStringOption(option => 
            option.setName("user")
                .setDescription("Insira o id ou o nome de usuário do membro banido.")
                .setRequired(true)
        ),
    
    help: {
        status: "running", // building, running, stopped
        details: "Quando solicitado, o bot irá revogar o ban de um usuário. Fazendo, portanto, com que ele possa entrar novamente no servidor."
    }
}