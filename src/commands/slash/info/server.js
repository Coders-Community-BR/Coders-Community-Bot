const { SlashCommandBuilder } = require("@discordjs/builders"),
    { MessageEmbed } = require("discord.js"),
    { Other } = require("../../../config/client/client-colors"),
    moment = require("moment");

module.exports = {
    run: (interaction, bot) => {

        let GuildName = interaction.guild.name;
        let CreatedAt = moment(interaction.guild.createdAt).format("LLL");
        let GuildId = interaction.guild.id;
        let Criador = () => {
            const owner = interaction.guild.members.cache.get(interaction.guild.ownerId)
            return owner.user.username + "#" + owner.user.discriminator
        };
        let Lingua = interaction.guild.preferredLocale ;
        let NumeroMembros = interaction.guild.memberCount;
        let LevelBooster = interaction.guild.premiumTier;
        let NumeroAssinaturas = interaction.guild.premiumSubscriptionCount;
        let CanaisTotais = interaction.guild.channels.cache.size;

        interaction.reply({ embeds: [
            new MessageEmbed()
                .setAuthor("Sistema " + bot.user.username, bot.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
                .setColor(Other.MediumBlue)
                .setTitle("Informações para Coders Community")
                .setTimestamp()
                .addFields(
                    {name: `🚀 Nome do Servidor`, value: "`" + GuildName + "`", inline: true},
                    {name: `🔖 Id do Servidor`, value: "`" + GuildId + "`", inline: true},
                    {name: `⏳ Criado Em`, value: "`" + CreatedAt + "`", inline: true},
                    {name: `🥇 Criado Por`, value: "`" + Criador() + "`", inline: true},
                    {name: `👥 Número de Membros`, value: "`" + NumeroMembros + "`", inline: true},
                    {name: `🎫 Total de Canais`, value: "`" + CanaisTotais + "`", inline: true},
                    {name: `🇧🇷 Linguagem Utilizada`, value: "`" + Lingua + "`", inline: true},
                    {name: `🌠 Nível de Impulsão`, value: "`" + LevelBooster + "`", inline: true},
                    {name: `🦸‍♂️ Quantidade de Impulsionadores`, value: "`" + NumeroAssinaturas + "`", inline: true},
                )
                .setThumbnail(`https://cdn.discordapp.com/icons/${interaction.guild.id}/${interaction.guild.icon}.png`)
                .setFooter("Solicitado por " + interaction.user.username,interaction.user.displayAvatarURL({dynamic: true, format: "png", size: 1024}))
        ], ephemeral: false })
    },
    
    builder: new SlashCommandBuilder()
        .setName("server")
        .setDescription("〔❓ Info〕 Retorna informações a respeito do servidor da Coders Community"),
    
    help: {
        status: "running", // building, running, stopped
        details: "O bot responderá com várias informações sobre o servidor da Coders Community."
    }
}