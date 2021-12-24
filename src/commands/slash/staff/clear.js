const { SlashCommandBuilder } = require("@discordjs/builders"),
    { MessageEmbed } = require("discord.js"),
    { guild_informations: { staff_id } } = require("../../../config/client/client-info"),
    { Alerta, Aviso } = require("../../../config/client/client-reports"),
    { Clear, Other } = require("../../../config/client/client-colors");

module.exports = {
    run: async(interaction ,bot) => {
        const quantidade = interaction.options.get("quantidade").value;

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
            if (quantidade > 100 || quantidade < 1) {
                return interaction.reply({ embeds: [
                    new MessageEmbed()
                        .setAuthor("Sistema " + bot.user.username, bot.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
                        .setColor(Clear.Yellow)
                        .setTitle(Aviso)
                        .setTimestamp()
                        .setDescription(`> **O campo 'quantidade' deve possuir valores entre 0 e 100. \n> Valores como **\` ${quantidade} \`  **não são suportados.**`)
                        .setFooter("Solicitado por " + interaction.user.username,interaction.user.displayAvatarURL({dynamic: true, format: "png", size: 1024}))
                ], ephemeral: true });
            }
            
            await interaction.channel.bulkDelete(quantidade).then(() => "│ GOOD │ Cerca de " + quantidade + " de mensagens foram apagadas por '" + interaction.user.username + "'.").catch(console.error)

            interaction.reply({ embeds: [
                new MessageEmbed()
                    .setAuthor("Sistema " + bot.user.username, bot.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
                    .setColor(Other.MediumBlue)
                    .setTitle("🗑️ Mensagens Apagadas")
                    .setTimestamp()
                    .setDescription(`> **Carca de **\`${quantidade}\` **foram apagadas de** ${interaction.channel}.`)
                    .setFooter("Solicitado por " + interaction.user.username,interaction.user.displayAvatarURL({dynamic: true, format: "png", size: 1024}))
            ], ephemeral: false }).then(() => {
                setTimeout(async () => await interaction.deleteReply(), 7000)
            });

        }
    },
    
    builder: new SlashCommandBuilder()
        .setName("clear")
        .setDescription("〔👑 Staff〕 Restrito à equipe da Staff. Remove mensagens em massa de um canal de texto.")
        .addIntegerOption(option => 
            option.setName("quantidade")
                .setDescription("Número de mensagens que você deseja remover desse canal de texto. Valores entre 1 e 100.")
                .setRequired(true)
        ),
    
    help: {
        status: "running", // building, running, stopped
        details: "Esse comando, quando solicitado, remove mensagem em massa de um canal de texto. Apenas a equipe da staff pode utilizá-lo."
    }
}