const discord = require("discord.js"); // define discord

//All embeds here

    var noPermission = new discord.RichEmbed() // Make embed
    .setTitle("Woops!")
    .setDescription("You don't have permission to use this command.")

module.exports.run = async (bot, message, args) => {
    if (!message.member.hasPermissions("MANAGE_MESSAGES")) return message.reply(noPermission); // if user doesnt have the permissions send the error message we made earlier
    let sayMessage = args.join(" "); // make the variable "sayMessage" be the arguments given after the command
    message.delete().catch(); // delete the command after the message is send
    message.channel.send(sayMessage); // send the message
}

module.exports.help = { 
    name: "say" // command name
}
