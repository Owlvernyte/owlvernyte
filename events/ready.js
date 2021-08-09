const Discord = require('discord.js')
module.exports = async (bot) => {
  
    console.log(`Logged in as ${bot.user.username}. Ready on ${bot.guilds.cache.size} servers, for a total of ${bot.users.cache.size} users`);

    

    bot.user.setActivity(bot.config.discord.activity);

};