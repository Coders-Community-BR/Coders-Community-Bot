const { SlashCommandBuilder, time } = require("@discordjs/builders"),
    { MessageActionRow, MessageSelectMenu, MessageButton, MessageEmbed } = require("discord.js"),
    { guild_informations: { helper_channels_id, votes_user_limit, votes_guild_limit, logs_helper_channel, top_helper_role } } = require("../../../config/client/client-info"),
    { Clear } = require("../../../config/client/client-colors"),
    { status, class_data } = require("../../../database/data"),
    wait = require('util').promisify(setTimeout);


module.exports = {
    run: async (interaction, bot) => {

        await interaction.deferReply({ ephemeral: true });

        if (status == false) {
            return interaction.editReply({ content: "**❌ Essa Inicialização não utilizou o Banco de Dados, não posso utilizar esse comando.**" });
        }

        const Chennel_Helper_Logs = await interaction.guild.channels.fetch(logs_helper_channel);
        const Heroku_Postgre = new class_data(bot);
        let total_channel_helpers = [];
        let channel_helpers = [];
        let index = 0;
        let user;


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
                        if (interaction.channel.name.split("》")[1] == "sistemas-operacionais") {
                            if (role_name.toLowerCase().split("- ")[1] == "os") {
                                return total_channel_helpers.push({
                                    label: "🤝 Helper - " + user.user.username,
                                    description: "Helper " + interaction.channel.name.split("》")[1] + " da Coders Community",
                                    value: user.user.id
                                });
                            }
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
                .setDisabled(select_menus.length > 1 ? false : true)
                .setStyle(select_menus.length > 1 ? "PRIMARY" : "SECONDARY")
                .setLabel("Próximo")

            if (!select_menus?.length) {
                return interaction.editReply({ content: "**❌ Não existem Helpers cadastrados para essa categoria.**", ephemeral: true })
            }

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
                .setDescription(`> Classifique um **helper** logo abaixo. Basta **selecioná-lo** no menu.\n> Todo voto é **guardado** dentro do **banco de dados**.\n> Essa ação é **irreversível**.\n> Seja **sincero**, precisamos disso.`)
                .setFooter("Solicitado por " + interaction.user.username, interaction.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))

            await interaction.editReply({
                embeds: [embed], ephemeral: true, components: [select_row, button_row]
            });

            const filter = (r) => r.message.interaction.id === interaction.id;

            const button_collector = interaction.channel.createMessageComponentCollector({ filter, componentType: "BUTTON", time: 600000, errors: ["time"] });
            const select_menu_collector = interaction.channel.createMessageComponentCollector({ filter, componentType: "SELECT_MENU", time: 600000, errors: ["time"] });

            button_collector.on("collect", async (collected) => {
                collected.deferUpdate()
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
                    //collected.deferUpdate()
                }
                if (["upvote", "downvote", "return"].includes(collected.customId)) {
                    if (collected.customId === "return") {
                        await interaction.editReply({ content: "<:uh:845331981940424764> **Clicou errado né...**", embeds: [], components: [] });
                        await wait(1000)
                        await interaction.editReply({
                            embeds: [embed], ephemeral: true, components: [select_row, button_row]
                        });
                    }
                    if (collected.customId === "upvote") {
                        await interaction.editReply({ content: "<:repeat:845331987371393044> **Mais um momento...**", embeds: [], components: [] });
                        let upvotes = await Heroku_Postgre.component_helper(interaction.guild.id, user, interaction.channel.name.split("》")[1], "UpVotes")
                        let users_votes = (await Heroku_Postgre.component_helper(interaction.guild.id, user, interaction.channel.name.split("》")[1], "users_votes"))
                        users_votes.push(interaction.user.id)

                        await Heroku_Postgre.update_helper(interaction.guild.id, user, interaction.channel.name.split("》")[1], "UpVotes", parseInt(upvotes) + 1)
                        await Heroku_Postgre.update_helper(interaction.guild.id, user, interaction.channel.name.split("》")[1], "users_votes", users_votes)

                        interaction.editReply({ embeds: [], content: "✅ **Sua resposta foi enviada com sucesso! Obrigado por avaliar nossos Helpers!**", components: [], ephemeral: true })
                        //collected.deferUpdate()
                    }
                    if (collected.customId === "downvote") {
                        await interaction.editReply({ content: "<:repeat:845331987371393044> **Mais um momento...**", embeds: [], components: [] });
                        let downvotes = await Heroku_Postgre.component_helper(interaction.guild.id, user, interaction.channel.name.split("》")[1], "DownVotes")
                        let users_votes = (await Heroku_Postgre.component_helper(interaction.guild.id, user, interaction.channel.name.split("》")[1], "users_votes"))
                        users_votes.push(interaction.user.id)
                        
                        await Heroku_Postgre.update_helper(interaction.guild.id, user, interaction.channel.name.split("》")[1], "DownVotes", parseInt(downvotes) + 1)
                        await Heroku_Postgre.update_helper(interaction.guild.id, user, interaction.channel.name.split("》")[1], "users_votes", users_votes)

                        interaction.editReply({ embeds: [], content: "✅ **Sua resposta foi enviada com sucesso! Obrigado por avaliar nossos Helpers!**", components: [], ephemeral: true })
                        //collected.deferUpdate()
                    }

                    const relation = await Heroku_Postgre.top_helper(interaction.guild.id, interaction.channel.name.split("》")[1]);
                    //
                    if (relation.WIN_HELPERS.length) {
                        relation.WIN_HELPERS.forEach(async helper => {
                            const data_helper = await interaction.guild.members.fetch(helper.id);

                            const Win_Helper_Embed = new MessageEmbed()
                                .setAuthor("Sistema " + bot.user.username, bot.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
                                .setColor("GREEN")
                                .setTitle("<a:cc:855063869252567100> Parabéns " + helper.username + "!")
                                .setTimestamp()
                                .setThumbnail(data_helper.user.displayAvatarURL({dynamic: true, format: "png", size: 1024}))
                                .setDescription(`> ${data_helper} você acabou de entrar no pódio dos **top 3 helpers** da linguagem **${helper.language}**.\n> Você já recebeu o **cargo personalizado** e pode resgatar mais **recompensas** em \`/profile\`\n> Agradecemos imensamente por estar ajudando nossa comunidade.`)
                                .setFooter("Informações para " + helper.username, data_helper.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
                            
                            await data_helper.roles.add(top_helper_role).catch(console.error);

                            Chennel_Helper_Logs.send({ content: `${data_helper}`, embeds: [Win_Helper_Embed] });
                        });
                    }
                    if (relation.LOSE_HELPES.length) {
                        relation.LOSE_HELPES.forEach(async helper => {
                            const data_helper = await interaction.guild.members.fetch(helper.id);

                            const Lose_Helper_Embed = new MessageEmbed()
                                .setAuthor("Sistema " + bot.user.username, bot.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
                                .setColor("RED")
                                .setTitle("<a:peepocry:854890050541977621> " + helper.username + " foi Substituído!")
                                .setTimestamp()
                                .setThumbnail(data_helper.user.displayAvatarURL({dynamic: true, format: "png", size: 1024}))
                                .setDescription(`> ${data_helper} você acabou de sair no pódio dos **top 3 helpers** da linguagem **${helper.language}**.\n> O cargo personalizado infelizmente foi **removido**, consulte mais informações em \`/profile\`\n> Se esforce ainda mais para receber tudo novamente!`)
                                .setFooter("Informações para " + helper.username, data_helper.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
                            
                            await data_helper.roles.remove(top_helper_role).catch(console.error);

                            if (data_helper.nickname.includes("[") && data_helper.nickname.includes("]")) {
                                if (staff_id.includes(data_helper.user.id)) return;
                                data_helper.setNickname(data_helper.user.username)
                            }

                            Chennel_Helper_Logs.send({ content: `${data_helper}` , embeds: [Lose_Helper_Embed] });
                        });
                    }
                    //
                    return;
                }
            });

            select_menu_collector.on("collect", async (collected) => {
                collected.deferUpdate()
                await interaction.editReply({ content: "<:repeat:845331987371393044> **Aguarde um instante...**", embeds: [], components: [] })
                user = await interaction.guild.members.fetch(collected.values[0]);

                const return_button = new MessageButton()
                    .setCustomId("return")
                    .setDisabled(false)
                    .setStyle("PRIMARY")
                    .setLabel("<< Voltar")

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
                    .setComponents(return_button, upvote_button, downvote_button)

                const count_votes = await Heroku_Postgre.count_users_votes(interaction.guild.id, interaction.user)

                const user_embed = new MessageEmbed()
                    .setAuthor("Sistema " + bot.user.username, bot.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
                    .setColor("RANDOM")
                    .setTitle("🤝 Helper " + interaction.channel.name.split("》")[1].charAt(0).toUpperCase() + interaction.channel.name.split("》")[1].slice(1) + " " + user.user.username)
                    .setTimestamp()
                    .setThumbnail(user.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
                    .setDescription(`> Dê um **UpVote** ou **DownVote** para esse Helper.\n> ${(votes_user_limit - count_votes) == 0 ? "Você não tem Votes restantes para hoje." : "Votes restantes para hoje: `" + (votes_user_limit - count_votes) + "`"} \n\n **Obs: ** Botões desabilitados significam que seu limíte de Votes diário já foi atingido, você já votou nesse helper hoje ou você está votando em si mesmo.`)
                    .setFooter("Solicitado por " + interaction.user.username, interaction.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))

                if (count_votes === votes_user_limit) {
                    await interaction.editReply({
                        embeds: [user_embed], ephemeral: true, components: [button_row]
                    });
                    //collected.deferUpdate();
                    return;
                }
                if (interaction.user.id == user.user.id) {
                    await interaction.editReply({
                        embeds: [user_embed], ephemeral: true, components: [button_row]
                    });
                    //collected.deferUpdate();
                    return;
                }
                if (await Heroku_Postgre.consult_helper(interaction.guild.id, user, interaction.channel.name.split("》")[1])) {
                    // username, id, top_helper, UpVotes, DownVotes, day, users_votes, language
                    if ((await Heroku_Postgre.component_helper(interaction.guild.id, user, interaction.channel.name.split("》")[1], "users_votes")).length == votes_guild_limit) {
                        if (Heroku_Postgre.getDate(await Heroku_Postgre.component_helper(interaction.guild.id, user, interaction.channel.name.split("》")[1], "day"))) {
                            await interaction.editReply({
                                embeds: [user_embed], ephemeral: true, components: [button_row]
                            });
                            //collected.deferUpdate()
                        } else {
                            await Heroku_Postgre.update_helper(interaction.guild.id, user, interaction.channel.name.split("》")[1], "day", Date.now())
                            await Heroku_Postgre.update_helper(interaction.guild.id, user, interaction.channel.name.split("》")[1], "users_votes", [])
                            upvote_button.setDisabled(false)
                            downvote_button.setDisabled(false)
                            await interaction.editReply({
                                embeds: [user_embed], ephemeral: true, components: [button_row]
                            });
                            //collected.deferUpdate()
                        }
                    }

                    if ((await Heroku_Postgre.component_helper(interaction.guild.id, user, interaction.channel.name.split("》")[1], "users_votes")).length < votes_guild_limit) {
                        if ((await Heroku_Postgre.component_helper(interaction.guild.id, user, interaction.channel.name.split("》")[1], "users_votes")).includes(interaction.user.id)) {
                            if (!Heroku_Postgre.getDate(await Heroku_Postgre.component_helper(interaction.guild.id, user, interaction.channel.name.split("》")[1], "day"))) {
                                await Heroku_Postgre.update_helper(interaction.guild.id, user, interaction.channel.name.split("》")[1], "day", Date.now())
                                await Heroku_Postgre.update_helper(interaction.guild.id, user, interaction.channel.name.split("》")[1], "users_votes", [])
                                upvote_button.setDisabled(false)
                                downvote_button.setDisabled(false)
                                await interaction.editReply({
                                    embeds: [user_embed], ephemeral: true, components: [button_row]
                                });
                                //collected.deferUpdate()
                            } else {
                                await interaction.editReply({
                                    embeds: [user_embed], ephemeral: true, components: [button_row]
                                });
                                //collected.deferUpdate()
                            }
                        } else {
                            upvote_button.setDisabled(false)
                            downvote_button.setDisabled(false)
                            await interaction.editReply({
                                embeds: [user_embed], ephemeral: true, components: [button_row]
                            });
                            //collected.deferUpdate()
                        }
                        return;
                    }
                }
                
                upvote_button.setDisabled(false)
                downvote_button.setDisabled(false)
                await interaction.editReply({
                    embeds: [user_embed], ephemeral: true, components: [button_row]
                });
                //collected.deferUpdate()
            });
        }
        

    },

    builder: new SlashCommandBuilder()
        .setName("vote")
        .setDescription("〔🤝 Helpers〕 Selecione um helper de uma respectiva categoria e o dê um upvote ou downvote."),

    help: {
        status: "running", // building, running, stopped
        details: "Oferece a quem o executa a possibilidade de dar um upvote ou downvote a um helper. Se usado incorretamente, o ban pode ser aplicado."
    }
}