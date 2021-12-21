const { SlashCommandBuilder } = require("@discordjs/builders"),
    { MessageEmbed } = require("discord.js"),
    { Clear } = require("../../../config/client/client-colors"),
    moment = require("moment");
        moment.locale("pt-BR");

module.exports = {
    run: (interaction ,bot) => {
        const member = interaction.options.get("membro");
        // console.log(member.member.presence)
        const activity_situation = () => {
            if (member.member.presence == null) {
                return "Não está online";
            }
            if (member.member.presence.activities.length == 0) {
                return "Sem atividades no momento";
            }
            if (member.member.presence.activities[0].type == "CUSTOM") {
                return member.member.presence.activities[0].state;
            }
            if (member.member.presence.activities) {
                return member.member.presence.activities[0].type + " " + member.member.presence.activities[0].name;
            }
        }
        const status_situation = () => {
            if (member.member.presence == null) {
                return "⚫ `Está Offline";
            } 
            if (member.member.presence.status == "online") {
                return "🟢 `Está Online";
            }
            if (member.member.presence.status == "dnd") {
                return "🔴 `Não Pertube";
            }
            if (member.member.presence.status == "idle") {
                return "🟠 `Ausente";
            } else {
                return "🟣 `Está fazendo stream";
            }
        }
        const role_situation = () => {
            let roles = [];
            member.member._roles.forEach(role => {
                let role_name = interaction.guild.roles.cache.get(role)
                roles.push(role_name.name)
            })

            if (roles.includes("Dono")) {
                return "Dono da Coders Comumnity";
            }
            if (roles.includes("Administrador")) {
                return "Administrador da Coders Comumnity";
            }
            if (roles.includes("Moderador")) {
                return "Moderador da Coders Comumnity";
            }
            if (roles.includes("Supervisor")) {
                return "Supervisor da Coders Comumnity";
            }
            if (roles.includes("Punição - MUTE")) {
                return "Está Punido na Coders Comumnity";
            }
            if (roles.includes("Contribuidor")) {
                return "Booster da Coders Comumnity";
            }
            if (roles.includes("Bot da Coders")) {
                return "Bot Original da Coders Community"
            }
            if (roles.includes("BOTS Oficiais")) {
                return "Bot da Coders Comumnity";
            }
            if (roles.includes("BOTS dos Membros")) {
                return "Bot de um membro da Coders Comumnity";
            } else {
                if (roles.find(r => r.startsWith("Helper"))) {
                    return "Helper da Coders Comumnity";
                } else {
                    return "Membro da Coders Comumnity";
                }
            }
        }
        
        interaction.reply({ embeds: [
            new MessageEmbed()
                .setAuthor("Sistema " + bot.user.username, bot.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
                .setColor("RANDOM")
                .setTimestamp()
                .setThumbnail(member.user.displayAvatarURL({dynamic: true, format: "png", size: 1024}))
                .setTitle("🎯 Informações para " + member.user.username)
                .addFields(
                    {name: "📋 Nome de Usuário", value: "`" + member.user.username + "`", inline: true},
                    {name: "🎫 Nickname", value: "`" + (member.member.nickname !== null ? member.member.nickname : "Sem Apelido" ) + "`", inline: true},
                    {name: "💮 Discriminador", value: "`" + member.user.discriminator + "`", inline: true},
                    {name: "📌 Id de Usuário", value: "`" + member.user.id + "`", inline: true},
                    {name: "🪂 Entrou no Servidor", value: "`" + moment(member.member.joinedAt).format("LLL") + "`", inline: true},
                    {name: "🔗 Conta Criada", value: "`" + moment(member.user.createdAt).format("LLL") + "`", inline: true},
                    {name: "🎒 Categoria de Atuação", value: "`" + role_situation() + "`", inline: true},
                    {name: "🔍 Status Atual", value: status_situation() + "`", inline: true},
                    {name: "📂 Atividade Atual", value: "`" + activity_situation() + "`", inline: true},
                    /*{name: , value: , inline: true}*/
                )
                .setFooter("Solicitado por " + interaction.user.username,interaction.user.displayAvatarURL({dynamic: true, format: "png", size: 1024}))
        ], ephemeral: false })
    },
    
    builder: new SlashCommandBuilder()
        .setName("user")
        .setDescription("〔❓ Info〕 Retorna algumas informações sobre o usuário mencionado.")
        .addUserOption(option => 
                option.setName("membro")
                    .setRequired(true)
                    .setDescription("Insira o usuário que você deseja consultar para Coders Community.")
            ),
    
    help: {
        status: "running", // building, running, stopped
        details: "O bot responderá com varias informações a respeito do usuário mencionado na mensagem."
    }
}