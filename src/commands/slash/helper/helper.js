const { SlashCommandBuilder, time } = require("@discordjs/builders"),
    { MessageActionRow, MessageSelectMenu, MessageButton, MessageEmbed } = require("discord.js"),
    { guild_informations: { helper_channels_id, votes_user_limit, votes_guild_limit } } = require("../../../config/client/client-info"),
    { Clear } = require("../../../config/client/client-colors"),
    { status, class_data } = require("../../../database/data");


module.exports = {
    run: async (interaction, bot) => {
        try {

            await interaction.deferReply({ ephemeral: true });

            const Heroku_Postgre = new class_data(bot)
            let total_channel_helpers = [];
            let channel_helpers = [];
            let index = 0;
            let user;

            if (status == false) {
                return interaction.editReply({ content: "**❌ Essa Inicialização não utilizou o Banco de Dados, não posso utilizar esse comando.**" })
            }

            if (!helper_channels_id.includes(interaction.channel.id)) {
                return await interaction.editReply({ content: "**❌ Esse comando não pode ser usado nesse canal. Utilize-o em algum dos chats da categoria** `PRINCIPAIS TECNOLOGIAS`", ephemeral: true })
            } else {
                interaction.guild.members.cache.forEach(async user => {
                    await user._roles.forEach(role => {
                        let role_name = interaction.guild.roles.cache.get(role).name
                        if (role_name.startsWith("Helper")) {
                            if (role_name.toLowerCase().includes(interaction.channel.name.split("》")[1])) {
                                return total_channel_helpers.push({
                                    label: "🤝 Helper - " + user.user.username,
                                    description: "Helper " + interaction.channel.name.split("》")[1] + " da Coders Community",
                                    value: user.user.id
                                });
                            }
                            if (role_name.toLowerCase().split("- ")[1].startsWith(interaction.channel.name.split("》")[1].split("-")[0])) {
                                if (role_name.toLowerCase().split("- ")[1] == "javascript") return;
                                return total_channel_helpers.push({
                                    label: "🤝 Helper - " + user.user.username,
                                    description: "Helper " + interaction.channel.name.split("》")[1] + " da Coders Community",
                                    value: user.user.id
                                });
                            }
                        } else {
                            return;
                        }
                    })
                });

                total_channel_helpers.forEach(helper => {
                    let exist = channel_helpers.find(h => h.value == helper.value);

                    if (exist) return;

                    channel_helpers.push(helper);
                });

                function split_select_menu(array) {
                    const groups = [];

                    for (let i = 0; i < array.length; i += 25) {
                        groups.push(new MessageSelectMenu()
                            .setOptions([array.slice(i, (i + 25))])
                            .setCustomId(`select_menu`));
                    }

                    return groups;
                };

                const select_menus = split_select_menu(channel_helpers)

                const back_button = new MessageButton()
                    .setCustomId("back")
                    .setDisabled(true)
                    .setStyle("SECONDARY")
                    .setLabel("Voltar")

                const index_button = new MessageButton()
                    .setCustomId("index")
                    .setDisabled(true)
                    .setStyle("SUCCESS")
                    .setLabel(`1 - ${select_menus.length}`)

                const next_button = new MessageButton()
                    .setCustomId("next")
                    .setDisabled(false)
                    .setStyle("PRIMARY")
                    .setLabel("Próximo")

                const select_row = new MessageActionRow()
                    .setComponents(select_menus[index]);

                const button_row = new MessageActionRow()
                    .setComponents(back_button, index_button, next_button);

                const embed = new MessageEmbed()
                    .setAuthor("Sistema " + bot.user.username, bot.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
                    .setColor("RANDOM")
                    .setTitle("🤝 Avaliação de Helpers")
                    .setTimestamp()
                    .setThumbnail("https://mukilteowa.gov/wp-content/uploads/You-did-it.jpg")
                    .setDescription(`**Nos ajude com sua opnião:**\n> Classifique um helper logo abaixo. Basta selecioná-lo no menu.`)
                    .setFooter("Solicitado por " + interaction.user.username, interaction.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))

                await interaction.editReply({
                    embeds: [embed], ephemeral: true, components: [select_row, button_row]
                });

                const filter = (r) => r.message.interaction.id === interaction.id;

                const button_collector = interaction.channel.createMessageComponentCollector({ filter, componentType: "BUTTON", time: 600000, errors: ["time"] });
                const select_menu_collector = interaction.channel.createMessageComponentCollector({ filter, componentType: "SELECT_MENU", time: 600000, errors: ["time"] });

                button_collector.on("collect", async (collected) => {
                    if (["back", "next"].includes(collected.customId)) {
                        if (collected.customId === "back") {
                            next_button.setDisabled(false).setStyle("PRIMARY");
                            index--;
                            index_button.setLabel(`${index + 1} - ${select_menus.length}`)
                            if (index == 0) back_button.setDisabled(true).setStyle("SECONDARY")
                        }
                        if (collected.customId === "next") {
                            back_button.setDisabled(false).setStyle("PRIMARY")
                            index++;
                            index_button.setLabel(`${index + 1} - ${select_menus.length}`)
                            if ((index + 2) > select_menus.length) next_button.setDisabled(true).setStyle("SECONDARY")
                        }

                        select_row.setComponents(select_menus[index]);
                        await interaction.editReply({
                            ephemeral: true, components: [select_row, button_row]
                        });
                        collected.deferUpdate()
                    }
                    if (["upvote", "downvote"].includes(collected.customId)) {
                        if (collected.customId === "upvote") {
                            let upvotes = await Heroku_Postgre.component_helper(interaction.guild.id, user, interaction.channel.name.split("》")[1], "UpVotes")
                            let users_votes = (await Heroku_Postgre.component_helper(interaction.guild.id, user, interaction.channel.name.split("》")[1], "users_votes"))
                            users_votes.push(user.user.id)

                            await Heroku_Postgre.update_helper(interaction.guild.id, user, interaction.channel.name.split("》")[1], "UpVotes", parseInt(upvotes) + 1)
                            await Heroku_Postgre.update_helper(interaction.guild.id, user, interaction.channel.name.split("》")[1], "users_votes", users_votes)

                            interaction.editReply({ embeds: [], content: "✅ **Sua resposta foi enviada com sucesso! Obrigado por avaliar nossos Helpers!**", components: [], ephemeral: true })
                            collected.deferUpdate()
                            return;
                        }
                        if (collected.customId === "downvote") {
                            let downvotes = await Heroku_Postgre.component_helper(interaction.guild.id, user, interaction.channel.name.split("》")[1], "DownVotes")
                            let users_votes = (await Heroku_Postgre.component_helper(interaction.guild.id, user, interaction.channel.name.split("》")[1], "users_votes"))
                            users_votes.push(user.user.id)
                            
                            await Heroku_Postgre.update_helper(interaction.guild.id, user, interaction.channel.name.split("》")[1], "DownVotes", parseInt(downvotes) + 1)
                            await Heroku_Postgre.update_helper(interaction.guild.id, user, interaction.channel.name.split("》")[1], "users_votes", users_votes)

                            interaction.editReply({ embeds: [], content: "✅ **Sua resposta foi enviada com sucesso! Obrigado por avaliar nossos Helpers!**", components: [], ephemeral: true })
                            collected.deferUpdate()
                            return;
                        }
                    }
                });

                select_menu_collector.on("collect", async (collected) => {
                    user = await interaction.guild.members.fetch(collected.values[0]);

                    const upvote_button = new MessageButton()
                        .setCustomId("upvote")
                        .setLabel("UpVote")
                        .setDisabled(true)
                        .setStyle("SUCCESS")

                    const downvote_button = new MessageButton()
                        .setCustomId("downvote")
                        .setLabel("DownVote")
                        .setDisabled(true)
                        .setStyle("DANGER")

                    const button_row = new MessageActionRow()
                        .setComponents(upvote_button, downvote_button)

                    const user_embed = new MessageEmbed()
                        .setAuthor("Sistema " + bot.user.username, bot.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
                        .setColor("RANDOM")
                        .setTitle("🤝 Helper " + interaction.channel.name.split("》")[1].charAt(0).toUpperCase() + interaction.channel.name.split("》")[1].slice(1) + " " + user.user.username)
                        .setTimestamp()
                        .setThumbnail(user.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
                        .setDescription(`> Dê um **UpVote** ou **DownVote** para esse Helper.\n> Limite diário de votes é igual a \`${votes_user_limit}\` \n> Se os botões estiverem desabilitados, seu limite diário já foi atingido.`)
                        .setFooter("Solicitado por " + interaction.user.username, interaction.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))

                    if (await Heroku_Postgre.consult_helper(interaction.guild.id, user, interaction.channel.name.split("》")[1])) {
                        // Verificar se o usuário já completou o limite diário de up e down votes
                        // username, id, top_helper, UpVotes, DownVotes, day, users_votes, language
                        if ((await Heroku_Postgre.component_helper(interaction.guild.id, user, interaction.channel.name.split("》")[1], "users_votes")).length == votes_guild_limit) {
                            if (await Heroku_Postgre.component_helper(interaction.guild.id, user, interaction.channel.name.split("》")[1], "day") == Date.now()) {
                                await interaction.editReply({
                                    embeds: [user_embed], ephemeral: true, components: [button_row]
                                });
                                collected.deferUpdate()
                            }
                            if (await Heroku_Postgre.component_helper(interaction.guild.id, user, interaction.channel.name.split("》")[1], "day") !== Date.now()) {
                                await Heroku_Postgre.update_helper(interaction.guild.id, user, interaction.channel.name.split("》")[1], "day", Date.now())
                                await Heroku_Postgre.update_helper(interaction.guild.id, user, interaction.channel.name.split("》")[1], "users_votes", [])
                                upvote_button.setDisabled(false)
                                downvote_button.setDisabled(false)
                                await interaction.editReply({
                                    embeds: [user_embed], ephemeral: true, components: [button_row]
                                });
                                collected.deferUpdate()
                            }
                        }

                        if ((await Heroku_Postgre.component_helper(interaction.guild.id, user, interaction.channel.name.split("》")[1], "users_votes")).length < votes_guild_limit) {
                            if ((await Heroku_Postgre.component_helper(interaction.guild.id, user, interaction.channel.name.split("》")[1], "users_votes")).includes(user.user.id)) {
                                await interaction.editReply({
                                    embeds: [user_embed], ephemeral: true, components: [button_row]
                                });
                                collected.deferUpdate()
                            } else {
                                upvote_button.setDisabled(false)
                                downvote_button.setDisabled(false)
                                await interaction.editReply({
                                    embeds: [user_embed], ephemeral: true, components: [button_row]
                                });
                                collected.deferUpdate()
                            }
                            return;
                        }
                    }
                    
                    upvote_button.setDisabled(false)
                    downvote_button.setDisabled(false)
                    await interaction.editReply({
                        embeds: [user_embed], ephemeral: true, components: [button_row]
                    });
                    collected.deferUpdate()
                });
            }
        } catch(e) {
            console.log(e)
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