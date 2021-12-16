const { REST } = require("@discordjs/rest"),
    { Routes } = require("discord-api-types/v9"),
    { bot_informations: { id, token }, guild_informations } = require("../client/client-info");

module.exports.deploying = (slash_commands) => {
    let deploy_commands = [];

    slash_commands.forEach(command_builder => {
        deploy_commands.push(command_builder.builder);
    });

    deploy_commands = deploy_commands.map(command => command.toJSON());

    const rest = new REST({ version: "9" }).setToken(token);

    rest.put(Routes.applicationGuildCommands(id, guild_informations.id), { body: deploy_commands })
        .then(() => console.log("│ INFO │ Um deploy foi solicitado pela equipe administrativa do servidor!"))
        .catch(console.error)
}