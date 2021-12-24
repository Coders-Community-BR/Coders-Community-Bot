const { SlashCommandBuilder } = require("@discordjs/builders"),
    { MessageEmbed } = require("discord.js"),
    { guild_informations: { helper_channels_id } } = require("../../../config/client/client-info"),
    { Clear } = require("../../../config/client/client-colors");

module.exports = {
    run: (interaction ,bot) => {
        if (!helper_channels_id.includes(interaction.channel.id)) {
            interaction.reply({ content: "**❌ Esse comando não pode ser usado nesse canal. Utilize-o em algum dos chats da categoria** `PRINCIPAIS TECNOLOGIAS`", ephemeral: true })
        } else {
            interaction.reply({ content: "**Manutenção**", ephemeral: true })
        }
    },
    
    builder: new SlashCommandBuilder()
        .setName("helper")
        .setDescription("〔🤝 Helpers〕 Selecione um helper de uma respectiva categoria e o dê um upvote ou downvote."),
    
    help: {
        status: "building", // building, running, stopped
        details: "Oferece a quem o executa a possibilidade de dar um upvote ou downvote a um helper. Se usado incorretamente, o ban pode ser aplicado."
    }
}