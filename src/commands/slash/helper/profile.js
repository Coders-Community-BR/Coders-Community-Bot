const { SlashCommandBuilder } = require("@discordjs/builders"),
    { MessageEmbed } = require("discord.js"),
    { Clear } = require("../../../config/client/client-colors"),
    { guild_informations: { able_channels_id } } = require("../../../config/client/client-info"),
    langs = require("../../../config/components/top-lang-keys"), 
    { status, class_data } = require("../../../database/data");

module.exports = {
    run: async (interaction ,bot) => {
        await interaction.deferReply({ ephemeral: true });

        const bot_channel = await interaction.guild.channels.fetch("830492002038448149");
        const langs_array = [];

        if (status == false) {
            return interaction.editReply({ content: "**❌ Essa Inicialização não utilizou o Banco de Dados, não posso utilizar esse comando.**" });
        }

        if (!able_channels_id.includes(interaction.channel.id)) {
            return interaction.editReply({ content: `**❌ Esse comando não pode ser utilizado nesse canal de texto. Por favor utilize-o em **${bot_channel}` })
        }

        Object.keys(langs).forEach(lang => {
            console.log(lang)
        })
    },
    
    builder: new SlashCommandBuilder()
        .setName("profile")
        .setDescription("〔🤝 Helpers〕 Consulte o profile de um helper ou acesse sua área personalizada."),
    
    help: {
        status: "building", // building, running, stopped
        details: "O comando oferece a possibilidade de consultar informações sobre um helper. Caso o membro seja um helper, ele poderá acessar sua área personalizada após selecionar sua categoria de atuação."
    }
}