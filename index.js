const Discord = require("discord.js"); // Define the library, the coding language basically.
const botConfig = require("./botconfig.json"); // Tell them what botconfig is, we'll use it later on to start the bot
const bot = new Discord.Client(); // Define the discord bot
const fs = require("fs");
bot.commands = new Discord.Collection(); // Make a discord collection for the command handler. 
const active = new Map(); // Make a new map for active commands
// You won't need any of the stuff above anymore (most likely) besides "const Discord = require("discord.js");"
 

// Load all commands from the folder called commands, the commandhandler. 
fs.readdir("./commands/", (err, files) => {
    if (err) console.log(err);
    var jsfiles = files.filter(f => f.split(".").pop() === "js");
    if (jsfiles.length <= 0) {
        console.log("Can't find files.");
        return;
    }
    jsfiles.forEach((f, i) => {
        var fileGet = require(`./commands/${f}`);
        console.log(`> ${f} loaded in`);
        bot.commands.set(fileGet.help.name, fileGet);
    })
});



bot.on("ready", async () => { // when the bot starts succesfully

    console.log("Discord bot " + bot.user.username + "is now online") // Send a message to your console, saying the bot is online!

})


bot.on("message", async message => { // When there's a message
    if (message.author.bot) return; // If the sender of the message is a bot, stop
    if (message.channel.type === "dm") return; // If it's a DM, stop.
    let prefix = botConfig.prefix // Define the prefix from botconfig,json, default is !
    if (!message.content.startsWith(prefix)) return; // If the message doesn't start with the prefix. Stop
    var messageArray = message.content.split(" "); //  split out the spaces in your command
    var command = messageArray[0]; // content after your command
    var arguments = messageArray.slice(1); // arguments are split every time
    var commands = bot.commands.get(command.slice(prefix.length)); // define commands
	
	var options = {
		active: active
	}
 
	if (commands) commands.run(bot, message, arguments, options); // Make all the commands work
});


bot.login(botConfig.token); // Log into the token you set in botconfig.json