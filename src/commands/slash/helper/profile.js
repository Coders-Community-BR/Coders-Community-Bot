const { SlashCommandBuilder } = require("@discordjs/builders"),
    { MessageEmbed, MessageSelectMenu, MessageActionRow, MessageButton } = require("discord.js"),
    { Clear } = require("../../../config/client/client-colors"),
    { guild_informations: { able_channels_id, votes_guild_limit, Top_Helpers_Channels, staff_id } } = require("../../../config/client/client-info"),
    { Aviso } = require("../../../config/client/client-reports"),
    langs = require("../../../config/components/top-lang-keys"), 
    { status, class_data } = require("../../../database/data");

module.exports = {
    run: async (interaction ,bot) => {
        await interaction.deferReply({ ephemeral: true });

        function emojis(param) {
            if (param == "javascript") return "⚡"
            if (param == "python") return "🐍"
            if (param == "php") return "🐘"
            if (param == "html") return "🌐"
            if (param == "rust") return "🦀"
            if (param == "golang") return "🐹"
            if (param == "java") return "☕"
            if (param == "database") return "💽"
            if (param == "c") return "🏆/🔪"
            if (param == "git") return "😼"
            if (param == "hardware") return "💻"
            if (param == "sistemas") return "💿"

            return;
        }

        function colors(param) {
            if (param == "javascript") return "YELLOW"
            if (param == "python") return "GREEN"
            if (param == "php") return "PURPLE"
            if (param == "html") return "BLUE"
            if (param == "rust") return "ORANGE"
            if (param == "golang") return "WHITE"
            if (param == "java") return "AQUA"
            if (param == "database") return "DARK_GOLD"
            if (param == "c") return "DARK_BLUE"
            if (param == "git") return "NOT_QUITE_BLACK"
            if (param == "hardware") return "DARK_GREY"
            if (param == "sistemas") return "GREY"

            return;
        }

        function thumbnail(param) {
            if (param == "javascript") return "https://sanalisci.com/uploads/uploads/2016/12/javascript-logo-png.png"
            if (param == "python") return "https://www.tshirtgeek.com.br/wp-content/uploads/2021/03/com001-600x600.jpg"
            if (param == "php") return "https://prosite.2x2forum.ru/public/blog/s1200.png"
            if (param == "html") return "https://d5vf6134d8ffdnfp1qv4rv3l-wpengine.netdna-ssl.com/wp-content/uploads/03-html5-course-videos.jpg"
            if (param == "rust") return "https://s3.amazonaws.com/media-p.slid.es/uploads/58113/images/5959327/Screenshot_2019-03-30_Developer_Tools_Resources_4_.png"
            if (param == "golang") return "https://logique.s3-ap-southeast-1.amazonaws.com/2019/08/bahasa-pemrograman-golang-123.jpg"
            if (param == "java") return "https://www.logolynx.com/images/logolynx/f4/f4d66576ba24c3341f285d4c3859aecc.jpeg"
            if (param == "database") return "https://i3.wp.com/codingsupply.com/wp-content/uploads/2017/03/database-icon.png"
            if (param == "c") return "https://i.ytimg.com/vi/MwMcSIl0WU0/maxresdefault.jpg"
            if (param == "git") return "https://orion42.net/wp-content/uploads/2019/05/git-logo.png"
            if (param == "hardware") return "https://www.mergerscorp.com/wp-content/uploads/2020/08/8861.jpg"
            if (param == "sistemas") return "https://wp-krypton.s3.amazonaws.com/wp-content/uploads/sites/3/2016/05/shutterstock_120548806.jpg"

            return;
        }

        const bot_channel = await interaction.guild.channels.fetch("830492002038448149");
        const text_top_helpers_channel = await interaction.guild.channels.fetch(Top_Helpers_Channels.text)
        const voice_top_helpers_channel = await interaction.guild.channels.fetch(Top_Helpers_Channels.voice)
        const Heroku_Postgre = new class_data(bot);
        const langs_array = [];
        let temporary_lang = [];
        let temporary_nickname = [];
        let animals_array = ["🐵","🐶","🐺","🐱","🦁","🐯","🦒","🦊","🦝","🐮","🐷","🐗","🐭","🐹","🐰","🐻","🐨","🐼","🐸","🦓","🐴","🦄","🐔","🐲","🐽","🐾","🐒","🦍","🦧","🦮","🐩","🐈","🐕","🐆","🐅","🐎","🦌","🦏","🦛","🐂","🐃","🐄","🐖","🐏","🐑","🐐","🐪","🐫","🦙","🦘"]
        const random = Math.floor(Math.random() * animals_array.length);
        let user;
        let select_menus;
        let back_button;
        let index_button;
        let next_button;
        let index = 0;

        if (status == false) {
            return interaction.editReply({ content: "**❌ Essa Inicialização não utilizou o Banco de Dados, não posso utilizar esse comando.**" });
        }

        if (!able_channels_id.includes(interaction.channel.id)) {
            return interaction.editReply({ content: `**❌ Esse comando não pode ser utilizado nesse canal de texto. Por favor utilize-o em **${bot_channel}` })
        }

        Object.keys(langs).forEach(lang => {
            langs_array.push({
                label: emojis(lang) + " Categoria Helper " + lang.charAt(0).toUpperCase() + lang.slice(1),
                description: "Exibe membros pertencentes a categoria helper " + lang + ".",
                value: lang
            })
        })

        const category_menu = new MessageSelectMenu()
            .setCustomId("category")
            .setPlaceholder("Selecione uma Categoria")
            .addOptions(langs_array)

        const select_row = new MessageActionRow()
            .setComponents(category_menu)

        const embed = new MessageEmbed()
            .setAuthor("Sistema " + bot.user.username, bot.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
            .setColor("NAVY")
            .setTitle("🤝 Categorias Helper da Coders Community")
            .setTimestamp()
            .setThumbnail("https://cdn.dribbble.com/users/1292677/screenshots/6139167/media/fcf7fd0c619bb87706533079240915f3.gif")
            .setDescription(`> Selecione a **categoria de atuação**.\n> Consulte **informações** sobre um Helper. \n> Acesse sua área personalizada.\n\n**Obs: ** A Área Personalizada é restrita apenas a **Helpers da Coders Community**.`)
            .setFooter("Solicitado por " + interaction.user.username,interaction.user.displayAvatarURL({dynamic: true, format: "png", size: 1024}))

        interaction.editReply({ embeds: [ embed ], ephemeral: true, components: [ select_row ] });

        const filter = (r) => r.message.interaction.id === interaction.id;
        const select_menu_collector = interaction.channel.createMessageComponentCollector({ filter, componentType: "SELECT_MENU", time: 600000, errors: ["time"] });
        const button_collector = interaction.channel.createMessageComponentCollector({ filter, componentType: "BUTTON", time: 600000, errors: ["time"] });

        const action_row = (select_menus) => {
            back_button = new MessageButton()
                .setCustomId("back")
                .setDisabled(true)
                .setStyle("SECONDARY")
                .setLabel("Voltar")

            index_button = new MessageButton()
                .setCustomId("index")
                .setDisabled(true)
                .setStyle("SUCCESS")
                .setLabel(`1 - ${select_menus.length}`)

            next_button = new MessageButton()
                .setCustomId("next")
                .setDisabled(select_menus.length > 1 ? false : true)
                .setStyle(select_menus.length > 1 ? "PRIMARY" : "SECONDARY")
                .setLabel("Próximo")
        }

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
            }

            if (collected.customId == "return") {
                return await interaction.editReply({ embeds: [ embed ], ephemeral: true, components: [ select_row ] });
            }

            if (collected.customId == "ap") {
                const top_helpers_lang = (await Heroku_Postgre.top_helper(interaction.guild.id, temporary_lang[temporary_lang.length - 1])).TOP_HELPERS;
                const author_lang_informations = top_helpers_lang.find(helper => helper.id == interaction.user.id);

                const new_return_button = new MessageButton()
                    .setCustomId("return")
                    .setDisabled(false)
                    .setStyle("PRIMARY")
                    .setLabel("<< Voltar")
                const priv_button = new MessageButton()
                    .setCustomId("priv")
                    .setDisabled(true)
                    .setStyle("DANGER")
                    .setLabel("Privilégios")

                if (author_lang_informations.top_helper == true) priv_button.setDisabled(false).setStyle("SUCCESS")

                const new_button_row = new MessageActionRow()
                    .addComponents(new_return_button, priv_button)
                
                const Area_Personalizada_Embed = new MessageEmbed()
                    .setAuthor("Sistema " + bot.user.username, bot.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
                    .setColor("RANDOM")
                    .setTitle(emojis(author_lang_informations.language) + " Área Personalizada de " + interaction.user.username)
                    .setTimestamp()
                    .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
                    .setDescription(`**🔧 Linguagem de Atuação:** \`${author_lang_informations.language}\`\n**🔼 UpVotes Totais:** \`${author_lang_informations.UpVotes}\`\n**🔽 DownVotes Totais:** \`${author_lang_informations.DownVotes}\`\n**🎫 Pontos Totais: **\`${(author_lang_informations.UpVotes - author_lang_informations.DownVotes)}\`\n**🏆 Rank na Linguagem:** \`Número ${(parseInt(top_helpers_lang.indexOf(author_lang_informations)) + parseInt(1))}\`\n**🎯 Votos Restantes Hoje:** \`` + (votes_guild_limit == author_lang_informations.users_votes.length ? "Não há votos restantes" : `${votes_guild_limit - author_lang_informations.users_votes.length}`) + ` votos.\`\n\n> - Selecione **"Privilégios"** para acessar a Área Personalizada de Top Helpers. \n> **Obs: ** Privilégios só estão disponíveis para Top Helpers.`)
                    .setFooter("Solicitado por " + interaction.user.username,interaction.user.displayAvatarURL({dynamic: true, format: "png", size: 1024}))

                interaction.editReply({ embeds: [Area_Personalizada_Embed], ephemeral: true, components: [ new_button_row ] });
            }

            if (collected.customId == "priv") {
                const new_return_button = new MessageButton()
                    .setCustomId("return")
                    .setDisabled(false)
                    .setStyle("PRIMARY")
                    .setLabel("<< Voltar")
                const tag_button = new MessageButton()
                    .setCustomId("tag")
                    .setDisabled(true)
                    .setStyle("DANGER")
                    .setLabel("TAG 😎")

                const top_helpers_lang = (await Heroku_Postgre.top_helper(interaction.guild.id, temporary_lang.pop())).TOP_HELPERS;
                const author_lang_informations = top_helpers_lang.find(helper => helper.id == interaction.user.id);

                function lang () {
                    let lang = author_lang_informations.language;

                    if (lang.includes("-")) lang = lang.split("-")[0]

                    return langs[lang]
                }
                
                if (!interaction.member.nickname?.includes(`[TOP ${lang()}]`)) {
                    tag_button.setDisabled(false).setStyle("SUCCESS");
                    temporary_nickname.push(lang())
                }
                
                const row = new MessageActionRow()
                    .addComponents(new_return_button, tag_button)

                const Priv_Embed = new MessageEmbed()
                    .setAuthor("Sistema " + bot.user.username, bot.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
                    .setColor("RANDOM")
                    .setTitle(emojis(author_lang_informations.language) + " Área de Privilégios de " + interaction.user.username)
                    .setTimestamp()
                    .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
                    .setDescription(`**Categoria Liberada:** [ TOP HELPERS ]\n**Canal de Texto:** [ ${text_top_helpers_channel} ]\n**Canal de Voz:** [ ${voice_top_helpers_channel} ]\n\n**Obs:** A Tag de Top Helper ${author_lang_informations.language.charAt(0).toUpperCase() + author_lang_informations.language.slice(1)} **[TOP ${lang()}]** está liberada para ser usada por você! Selecione "**TAG**" para resgatá-la!`)
                    .setFooter("Solicitado por " + interaction.user.username,interaction.user.displayAvatarURL({dynamic: true, format: "png", size: 1024}))

                interaction.editReply({ embeds: [ Priv_Embed ], ephemeral: true, components: [row] })
            }

            if (collected.customId == "tag") { 
                if (!interaction.member.nickname?.includes(`[TOP ${temporary_nickname[temporary_nickname.length - 1]}]`)) {
                    if (staff_id.includes(interaction.user.id)) return interaction.editReply({ content: "**❌ Você faz parte da staff, não posso alterar seu nickname!**", embeds: [], ephemeral: true, components: [] })
                    interaction.member.setNickname(`[TOP ${temporary_nickname.pop()}] ` + (interaction.member.nickname && interaction.member.nickname.length <= 21 ? `${interaction.member.nickname}` : `${interaction.user.username}`)).catch(console.error)
                    interaction.editReply({ content: `✅ **Parabéns Helper ${interaction.member}, seu Nickname foi alterado! Agora é só aproveitar!**`, embeds: [], ephemeral: true, components: [] })
                } else {
                    interaction.editReply({ content: "**❌ Você já possui essa TAG!**", embeds: [], ephemeral: true, components: [] })
                }
            }
        })

        select_menu_collector.on("collect", async (collected) => {
            collected.deferUpdate()

            const return_button = new MessageButton()
                .setCustomId("return")
                .setDisabled(false)
                .setStyle("PRIMARY")
                .setLabel("<< Voltar")
            
            const pers_area = new MessageButton()
                .setCustomId("ap")
                .setDisabled(true)
                .setStyle("DANGER")
                .setLabel("A/P 🔒")

            if (collected.customId == "category") {
                const DB_LANGS = (await Heroku_Postgre.db_lang_keys(interaction.guild.id))
    
                DB_LANGS.forEach(async lang => {
                    if (lang.startsWith(collected.values[0])) {
                        if (lang == "javascript" && collected.values[0] == "java") return;
                        const lang_helpers_array = await Heroku_Postgre.top_helper(interaction.guild.id, lang)
                        temporary_lang.push(lang)
                        let array_helpes = [];
    
                        lang_helpers_array.TOP_HELPERS.forEach(helper => {
                            if (helper.id == interaction.user.id) pers_area
                                .setDisabled(false)
                                .setLabel("A/P 🔑")
                                .setStyle("SUCCESS")
                            array_helpes.push({
                                label: emojis(collected.values[0]) + " Helper - " + helper.username,
                                description: "Helper " + collected.values[0].charAt(0).toUpperCase() + collected.values[0].slice(1) + " da Coders Community",
                                value: helper.id
                            });
                        });
    
                        function split_select_menu(array) {
                            const groups = [];
            
                            for (let i = 0; i < array.length; i += 25) {
                                groups.push(new MessageSelectMenu()
                                    .setOptions([array.slice(i, (i + 25))])
                                    .setPlaceholder("Selecione um Helper " + collected.values[0].charAt(0).toUpperCase() + collected.values[0].slice(1))
                                    .setCustomId(`helper`));
                            }
            
                            return groups;
                        };

                        select_menus = split_select_menu(array_helpes);

                        action_row(select_menus);

                        const button_row = new MessageActionRow()
                            .setComponents(return_button, back_button, index_button, next_button, pers_area);

                        const new_select_row = new MessageActionRow()
                            .setComponents(select_menus[index]);
    
                        const Lang_Embed = new MessageEmbed()
                            .setAuthor("Sistema " + bot.user.username, bot.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
                            .setColor(colors(collected.values[0]))
                            .setTitle(emojis(collected.values[0]) + " Helpers " + collected.values[0].charAt(0).toUpperCase() + collected.values[0].slice(1))
                            .setTimestamp()
                            .setThumbnail(thumbnail(collected.values[0]))
                            .setDescription(`> Selecione um **Helper** para consultar.\n> Acesse sua **Área Restrita [A/P 🔒/🔑]**.\n> Helpers **não listados** no menu ainda **não foram cadastrados** no meu Banco de Dados.\n\n**Obs:** A Área Personalizada só pode ser acessada por helpers da **Coders Community**.`)
                            .setFooter("Solicitado por " + interaction.user.username,interaction.user.displayAvatarURL({dynamic: true, format: "png", size: 1024}))
    
                        interaction.editReply({ embeds: [ Lang_Embed ], ephemeral: true, components: [new_select_row, button_row] });
                    }
                })
    
                const No_Lang_found = new MessageEmbed()
                    .setAuthor("Sistema " + bot.user.username, bot.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
                    .setColor("RED")
                    .setTitle(Aviso)
                    .setTimestamp()
                    .setDescription(`> **Não há helpers ${collected.values[0]} cadastrados em meu Banco de Dados**`)
                    .setFooter("Solicitado por " + interaction.user.username,interaction.user.displayAvatarURL({dynamic: true, format: "png", size: 1024}))
    
                interaction.editReply({ embeds: [ No_Lang_found ], ephemeral: true, components: [new MessageActionRow().setComponents(return_button)] })
            }

            if (collected.customId == "helper") {
                const top_helpers_lang = (await Heroku_Postgre.top_helper(interaction.guild.id, temporary_lang.pop())).TOP_HELPERS;

                user = await interaction.guild.members.fetch(collected.values[0]);
                
                const data_helper = top_helpers_lang.find(helper => helper.id == user.user.id);

                const Helper_Embed = new MessageEmbed()
                    .setAuthor("Sistema " + bot.user.username, bot.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
                    .setColor("RANDOM")
                    .setTitle( emojis(data_helper.language) + " Helper " + data_helper.language.charAt(0).toUpperCase() + data_helper.language.slice(1) + " " + user.user.username)
                    .setThumbnail(user.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
                    .setTimestamp()
                    .addFields(
                        {name: animals_array[random] + ` Helper Name`,value: `> ${data_helper.username}`, inline: false},
                        {name: "🏆" + ` Rank nessa Linguagem`,value: "> Número " + (parseInt(top_helpers_lang.indexOf(data_helper)) + parseInt(1)), inline: false},
                        {name: Moji_Classification((data_helper.UpVotes - data_helper.DownVotes)) + ` Classificação`,value: Text_Classification((data_helper.UpVotes - data_helper.DownVotes)), inline: false},
                        {name: "🔼" + ` Total UpVotes`,value: `> ${data_helper.UpVotes}`, inline: false},
                        {name: "🔽" + ` Total DownVotes`,value: `> ${data_helper.DownVotes}`, inline: false},
                        {name: "🥊" + ` Total Points`,value: (data_helper.UpVotes > data_helper.DownVotes ? `> ${data_helper.UpVotes - data_helper.DownVotes}` : "> É um Helper Negativado / Points < 0"), inline: false},
                        {name: "🎯" + ` Top Helper`,value: (data_helper.top_helper === true ? "> Top Helper Medal " + TOP_RANK() : "> Não é um Top Helper"), inline: false},
                        {name: "🏹" + ` Votos Restantes para Hoje`,value: (votes_guild_limit == data_helper.users_votes.length ? "> Não há votos restantes" : `> ${votes_guild_limit - data_helper.users_votes.length}`), inline: false}
                    )
                    .setFooter("Solicitado por " + interaction.user.username, interaction.user.displayAvatarURL({dynamic: true, format: "png", size: 1024}))
                
                function Moji_Classification(points) {
                    if (points <= -10) return "🔴";
                    if (points <= 0 && points > -10) return "🟠";
                    if (points > 0 && points <= 10) return "🟡";
                    if (points > 10 && points <= 30) return "🟢";
                    if (points > 30 && points <= 60) return "🔵";
                    if (points > 60 && points <= 100) return "🟣";
                    if (points > 100 && points <= 300) return "⚪";
                    if (points > 300) return "🧠";
                }

                function Text_Classification(points) {
                    if (points <= -10) return "Baixo Rendimento / Mal Avaliado";
                    if (points <= 0 && points > -10) return "Baixo Rendimento";
                    if (points > 0 && points <= 10) return "Poucas Reclamações / Começou Agora";
                    if (points > 10 && points <= 30) return "Bem Avaliado / Começou agora";
                    if (points > 30 && points <= 60) return "Muitas Avaliações / Bem Avaliado";
                    if (points > 60 && points <= 100) return "Melhores da Coders Community";
                    if (points > 100 && points <= 300) return "Um Lorde / Melhores Helpers";
                    if (points > 300) return "Majestoso / Adimirado / Super Helper / Lorde Up! ";
                }

                function TOP_RANK() {
                    if (top_helpers_lang.indexOf(data_helper) == 0) return "🥇"
                    if (top_helpers_lang.indexOf(data_helper) == 1) return "🥈"
                    if (top_helpers_lang.indexOf(data_helper) == 2) return "🥉"
                }

                interaction.editReply({ embeds: [Helper_Embed], ephemeral: true, components: [ new MessageActionRow().addComponents(return_button) ] });
            }
        });
    },
    
    builder: new SlashCommandBuilder()
        .setName("profile")
        .setDescription("〔🤝 Helpers〕 Consulte o profile de um helper ou acesse sua área personalizada."),
    
    help: {
        status: "running", // building, running, stopped
        details: "O comando oferece a possibilidade de consultar informações sobre um helper. Caso o membro seja um helper, ele poderá acessar sua área personalizada após selecionar sua categoria de atuação."
    }
}