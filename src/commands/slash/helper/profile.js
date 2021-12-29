const { SlashCommandBuilder } = require("@discordjs/builders"),
    { MessageEmbed, MessageSelectMenu, MessageActionRow, MessageButton } = require("discord.js"),
    { Clear } = require("../../../config/client/client-colors"),
    { guild_informations: { able_channels_id } } = require("../../../config/client/client-info"),
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
            if (param == "python") return "https://i.pinimg.com/originals/a9/ac/a2/a9aca2f4501163a0820d59e0236d2bc8.png"
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
        const Heroku_Postgre = new class_data(bot)
        const langs_array = [];
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
            .setDescription(`> Selecione a **categoria de atuação**.\n> Consulte **informações** sobre um Helper. \n> Acesse sua área personalizada.\n\n**Obs: ** A área personalizada é restrita apenas a **Helpers da Coders Community**.`)
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
        })

        select_menu_collector.on("collect", async (collected) => {
            collected.deferUpdate()

            const return_button = new MessageButton()
                .setCustomId("return")
                .setDisabled(false)
                .setStyle("PRIMARY")
                .setLabel("<< Voltar")

            if (collected.customId == "category") {
                const DB_LANGS = (await Heroku_Postgre.db_lang_keys(interaction.guild.id))
    
                DB_LANGS.forEach(async lang => {
                    if (lang.startsWith(collected.values[0])) {
                        const lang_helpers_array = await Heroku_Postgre.top_helper(interaction.guild.id, lang)
                        let array_helpes = [];
    
                        lang_helpers_array.TOP_HELPERS.forEach(helper => {
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
                            .setComponents(return_button, back_button, index_button, next_button);

                        const new_select_row = new MessageActionRow()
                            .setComponents(select_menus[index]);
    
                        const Lang_Embed = new MessageEmbed()
                            .setAuthor("Sistema " + bot.user.username, bot.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
                            .setColor(colors(collected.values[0]))
                            .setTitle(emojis(collected.values[0]) + " Helpers " + collected.values[0].charAt(0).toUpperCase() + collected.values[0].slice(1))
                            .setTimestamp()
                            .setThumbnail(thumbnail(collected.values[0]))
                            .setDescription(`> Selecione um Helper para consultar.\n> Acesse sua Área Restrita.\n> Helpers não listados no menu ainda não foram cadastrados no meu Banco de Dados.\n\n**Obs:** A Área Restrita só pode ser acessada por herlpers da **Coders Community**.`)
                            .setFooter("Solicitado por " + interaction.user.username,interaction.user.displayAvatarURL({dynamic: true, format: "png", size: 1024}))
    
                        interaction.editReply({ embeds: [ Lang_Embed ], ephemeral: true, components: [new_select_row, button_row] });
                    }
                })
    
                const No_Lang_found = new MessageEmbed()
                    .setAuthor("Sistema " + bot.user.username, bot.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
                    .setColor("RED")
                    .setTitle(Aviso)
                    .setTimestamp()
                    .setThumbnail()
                    .setDescription(`> **Não há helpers ${collected.values[0]} cadastrados em meu Banco de Dados**`)
                    .setFooter("Solicitado por " + interaction.user.username,interaction.user.displayAvatarURL({dynamic: true, format: "png", size: 1024}))
    
                interaction.editReply({ embeds: [ No_Lang_found ], ephemeral: true, components: [new MessageActionRow().setComponents(return_button)] })
            }

            if (collected.customId == "helper") {
                return;
            }

        });
    },
    
    builder: new SlashCommandBuilder()
        .setName("profile")
        .setDescription("〔🤝 Helpers〕 Consulte o profile de um helper ou acesse sua área personalizada."),
    
    help: {
        status: "building", // building, running, stopped
        details: "O comando oferece a possibilidade de consultar informações sobre um helper. Caso o membro seja um helper, ele poderá acessar sua área personalizada após selecionar sua categoria de atuação."
    }
}