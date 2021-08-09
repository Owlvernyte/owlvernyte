//https://discord.com/api/oauth2/authorize?client_id=874183713020330015&permissions=8&scope=bot

const Discord = require("discord.js")
const fs = require('fs')
const Database = require("@replit/database")

const keepAlive = require('./server')

const bot = new Discord.Client({disableMentions : "everyone"})
require('discord-buttons')(bot)

bot.config = require('./config/bot');
bot.commands = new Discord.Collection()
bot.db = new Database()
bot.config = require('./config/bot');

bot.getPrefix = async (message) => {
  if (!message) return
  const guildId = message.guild.id

  const prefix = await bot.db.get(`${guildId}.prefix`) || process.env.PREFIX || "<@853623967180259369>" || "<@!853623967180259369>"

  return prefix
}

//====
fs.readdirSync('./commands').forEach(dirs => {
    const commands = fs.readdirSync(`./commands/${dirs}`).filter(files => files.endsWith('.js'));

    for (const file of commands) {
        const command = require(`./commands/${dirs}/${file}`);
        console.log(`Loading command ${file}`);
        bot.commands.set(command.name.toLowerCase(), command);
    }
});
//====

const events = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of events) {
    console.log(`Loading discord.js event ${file}`);
    const event = require(`./events/${file}`);
    bot.on(file.split(".")[0], event.bind(null, bot));
}

keepAlive()

bot.login(process.env.TOKEN)