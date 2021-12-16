const { Client } = require("discord.js");
const bot = new Client({ partials: ["CHANNEL", "GUILD_MEMBER", "MESSAGE", "REACTION", "USER"], intents: [ 32767 ] });

module.exports = bot