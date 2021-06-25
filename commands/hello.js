const Discord = require("discord.js"); // Define discord to use everything

module.exports.run = async (client, message, args) => { // For the command handler
    message.channel.send("Hello!"); // send hello in the channel where the command is executed
}// close the command handler (module exports)

module.exports.help = { // command handler
    name: "hello" // what to run for the command to work
} // command handler