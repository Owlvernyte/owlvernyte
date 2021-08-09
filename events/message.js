module.exports = async (bot, message) => {
   
  if (message.author.bot || message.channel.type === 'dm') return;

  const guildId = message.guild.id
  
  const prefix = await bot.db.get(`${guildId}.prefix`) || process.env.PREFIX

  // if (message.startsWith(args[0]) === "<@!853623967180259369>" || "<@853623967180259369>") return message.channel.send({
  //   embed: {
  //     color: "RANDOM",
  //     author: { name: `${message.guild.name}'s settings` },
  //     description: ``,
  //     fields: [
  //       {
  //         name: `Prefix`,
  //         value: `${prefix}`,
  //         inline: true,
  //       },
  //       {
  //         name: `Server ID`,
  //         value: `${guildId}`,
  //         inline: true,
  //       },
  //       {
  //         name: `Region`,
  //         value: `${message.guild.region}`,
  //         inline: true,
  //       },
  //     ],
  //     footer : { text: `Slimaeus#8878 || Fiezt#1492`},
      
  //   }
  // })

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
