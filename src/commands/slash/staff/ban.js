const { SlashCommandBuilder } = require("@discordjs/builders"),
    { MessageEmbed } = require("discord.js"),
    { Clear } = require("../../../config/client/client-colors")

module.exports = {
    run: (interaction ,bot) => {
        const member = interaction.options.get("membro");
        const reason = interaction.options.get("reason").value;
        let days = interaction.options.get("days");
        if (days) days = interaction.options.get("days").value;

        interaction.reply({ content: "Manutenção", ephemeral: true });
    },
    
    builder: new SlashCommandBuilder()
        .setName("ban")
        .setDescription("〔👑 Staff〕 Restrito à equipe da Staff. Bane membros do servidor.")
        .addMentionableOption(option => 
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
                .setDescription("Insira o número de dias que o usuário ficara banido. Padrão: 'PERMANENTE'")
                .setRequired(false)
        ),
    
    help: {
        status: "building", // building, running, stopped
        details: "Esse comando é restrito a Staff da Coders Community. Ele executa o ban de membros desse servidor, quando solicitado."
    }
}