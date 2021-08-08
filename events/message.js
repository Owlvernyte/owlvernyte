module.exports = async (bot, message) => {

   
  if (message.author.bot || message.channel.type === 'dm') return;

  const guildId = message.guild.id
  
  const prefix = await bot.db.get(`${guildId}.prefix`) || process.env.PREFIX || "<@853623967180259369>" || "<@!853623967180259369>"
  
  if (message.content.indexOf(prefix) !== 0) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  const cmd = bot.commands.get(command) || bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));

  
  if (cmd) 
    try
      {
        cmd.execute(bot, message, args)
      }
    catch (error)
      {
        console.log(error)    
      }
  
};
