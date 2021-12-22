const bot = require("./config/client/client"),
    { bot_informations: { token } } = require("./config/client/client-info"),
    { readdir } = require("fs"),
    { resolve, extname } = require("path"),
    { Collection } = require("discord.js");

bot.slash_commands = new Collection();
bot.select_menus = new Collection();

let dir_events = resolve(__dirname, "./events");
let dir_slash_commands = resolve(__dirname, "./commands/slash");
let dir_select_menus = resolve(__dirname, "./commands/select_menus");

readdir(dir_events, (err, files) => {
    if(err) return console.log("│ ERRO │ Foi detectado um erro na leitura da pasta events");

    files.forEach(file => {
        if (extname(file) !== ".js") return console.log(`│ ERROR │ Arquivo ${file} não pode ser executado por não atender aos padrões necessários.`);

        const { run } = require(`${dir_events}/${file}`);
        let name_file = file.split(".")[0];

        if (!run) return console.log(`│ ERROR │ Arquivo ${file} não possui a função run()!`);
        
        bot.on(name_file, (...dados) => run(...dados, bot));
    });
});

readdir(dir_slash_commands, (err, folders) => {
    if(err) return console.log("│ ERRO │ Foi detectado um erro na leitura da pasta slash");

    folders.forEach(folder => {
        readdir(dir_slash_commands + "/" + folder, (e, files) => {
            if (e) return console.log(`│ ERRO │ Foi detectado um erro na leitura da pasta ${folder}`);

            files.forEach(file => {
                if (extname(file) !== ".js") return console.log(`│ ERROR │ Arquivo ${file} não pode ser executado por não atender aos padrões necessários.`);

                const { run, builder, help } = require(dir_slash_commands + "/" + folder + "/" + file);

                if (!run) return console.log("│ ERRO │ O arquivo " + file.split(".")[0] + " não possui run().");
                if (!builder) return console.log("│ ERRO │ O arquivo " + file.split(".")[0] + " não possui builder.");
                if (!help) return console.log("│ ERRO │ O arquivo " + file.split(".")[0] + " não possui help.");
                if (!help.status) return console.log("│ ERRO │ O arquivo " + file.split(".")[0] + " não possui status.");
                if (!help.details) return console.log("│ ERRO │ O arquivo " + file.split(".")[0] + " não possui details.");

                bot.slash_commands.set(builder.name, { run, builder, help });
            });
        });
    });
});

readdir(dir_select_menus, (err, files) => {
    if(err) return console.log("│ ERRO │ Foi detectado um erro na leitura da pasta select_menus");

    files.forEach(file => {
        if (extname(file) !== ".js") return console.log(`│ ERROR │ Arquivo ${file} não pode ser executado por não atender aos padrões necessários.`);

        const { run, Custom_Id } = require(dir_select_menus + "/" + file);

        if (!run) return console.log("│ ERRO │ O arquivo " + file.split(".")[0] + " não possui run().");
        if (!Custom_Id) return console.log("│ ERRO │ O arquivo " + file.split(".")[0] + " não possui Custom_Id.");

        bot.select_menus.set(Custom_Id, { Custom_Id, run })
    })
});

/*
bot.on("guildMemberAdd", (member) => {
    member.user.username
})
*/


bot.login(token)