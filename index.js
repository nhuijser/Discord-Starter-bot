const Discord = require("discord.js"); // Define the library, the coding language basically.
const botConfig = require("./botconfig.json"); // Tell them what clientconfig is, we'll use it later on to start the client
const client = new Discord.Client(); // Define the discord client
client.commands = new Discord.Collection(); // Make a discord collection for the command handler. 
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
        client.commands.set(fileGet.help.name, fileGet);
    })
});



client.on("ready", async () => { // when the client starts succesfully

    console.log("Discord client " + client.user.username + "is now online") // Send a message to your console, saying the client is online!

})


client.on("message", async message => { // When there's a message
    if (message.author.client) return; // If the sender of the message is a client, stop
    if (message.channel.type === "dm") return; // If it's a DM, stop.
    let prefix = clientConfig.prefix // Define the prefix from clientconfig,json, default is !
    if (!message.content.startsWith(prefix)) return; // If the message doesn't start with the prefix. Stop
    var messageArray = message.content.split(" "); //  split out the spaces in your command
    var command = messageArray[0]; // content after your command
    var arguments = messageArray.slice(1); // arguments are split every time
    var commands = client.commands.get(command.slice(prefix.length)); // define commands
	
	var options = {
		active: active
	}
 
	if (commands) commands.run(client, message, arguments, options); // Make all the commands work
});


client.login(botConfig.token); // Log into the token you set in clientconfig.json