const Discord = require('discord.js')
const { MessageMenuOption, MessageMenu, MessageActionRow } = require('discord-buttons')

module.exports = {
    name: 'rockpaperscissors',
    aliases: ['rps'],
    category: 'Fun',
    utilisation: '{prefix}rockpaperscissors <mention>/[choice = (r)ock, (p)aper, (s)cissors]',

    async execute(bot, message, args) {
      const member = message.mentions.members.first()

      selections = [
        'rock',
        'paper',
        'scissors',
        'r','p','s',
      ]

      choices = ['rock','paper','scissors']
      if (!args[0])
        return message.channel.send('**[ERROR]** Please mention someone or pick your choice. `<(r)ock, (p)aper, (s)cissors>`')

      if (!member) {
        let u = args[0].toLowerCase()

        if (selections.includes(u)) {
          
          if (selections.indexOf(u) > 2)
            u = selections[selections.indexOf(u) - 3]
          
          let c = choices[Math.floor(Math.random() * choices.length)]
          // console.log('com ' + c)
          // console.log('user ' + u)
          if (u === c) return message.channel.send(`**[BOT]** choice: *${c}* \`=>\` **[RESULT]** TIE :/`);
          
          if ((u == "r" || u == "rock") && c == "paper")  return message.channel.send(`**[BOT]** choice: *${c}* \`=>\` **[RESULT]** ${message.author.username} lose!`);
          if ((u == "r" || u == "rock") && c == "scissors")  return message.channel.send(`**[BOT]** choice: *${c}* \`=>\` **[RESULT]** ${message.author.username} won!`);
          

          if ((u == "p" || u == "paper") && c == "rock") return message.channel.send(`**[BOT]** choice: *${c}* \`=>\` **[RESULT]** ${message.author.username} won!`);
          if ((u == "p" || u == "paper") && c == "scissors") return message.channel.send(`**[BOT]** choice: *${c}* \`=>\` **[RESULT]** ${message.author.username} lose!`);
          

          if ((u == "s" || u == "scissors") && c == "paper")  return message.channel.send(`**[BOT]** choice: *${c}* \`=>\` **[RESULT]** ${message.author.username} won!`);
          if ((u == "s" || u == "scissors") && c == "rock")  return message.channel.send(`**[BOT]** choice: *${c}* \`=>\` **[RESULT]** ${message.author.username} lose!`);
          
        }
        else {
          const prefix = await bot.getPrefix(message)
          return message.channel.send(`**[ERROR]** Invalid choice. Type ${prefix}help rps for more infomation.`)
        }
        // if (args[0].toLowerCase() !== 'rock' || args[0].toLowerCase() !== 'paper' || args[0].toLowerCase() !== 'scissors' )
        
        
      } 
      
      if (member) {
        
        if (member.id === message.author.id) {
          return message.channel.send("**[ERROR]** Duh, you can't play with your own, can you?  ");
        }

        const RockOption = new MessageMenuOption()
          .setLabel("Rock")
          .setDescription("Choose Rock ?")
          .setEmoji('🌑')
          .setValue("rock")
        
        const PaperOption = new MessageMenuOption()
          .setLabel("Paper")
          .setDescription("Choose Paper ?")
          .setEmoji('📄')
          .setValue("paper")
        
        const ScissorsOption = new MessageMenuOption()
          .setLabel("Scissors")
          .setDescription("Choose Scissors ?")
          .setEmoji('✂️')
          .setValue("scissors")

        const Menu = new MessageMenu()
          .setID('menu1')
          .setPlaceholder('Choose your weapon')
          .addOption(RockOption)
          .addOption(PaperOption)
          .addOption(ScissorsOption)
        const Row1 = new MessageActionRow()
          .addComponent(Menu)


        await message.channel.send(`${message.author} \`vs.\` ${member}`,
        {components : [Row1]})
          .then(async msg => {
            setTimeout(() => {
              return msg.edit({
                content: `**TIMEOUT**`,
                  components : []
              })
            }, 3 * 60 *  1000)
            const filter = (m) => m.clicker.id === message.author.id || m.clicker.id === member.id
            let collector = msg.createMenuCollector(filter, { max : 2})
            let index = 0;
            let player = new Map()
            collector.on('collect', (menu) => {
              menu.reply.defer()
            })
            collector.on('end', (MenuCollector) => {
              // if (MenuCollector.length < 2) return msg.edit('Timeout')
              MenuCollector.forEach((value, key)=> {
                //msg.delete()
                if (value.clicker.id === message.author.id || value.clicker.id === member.id)
                  player.set(`${value.clicker.id}`, value.values[0])
                
              })
              const p1 = player.get(message.author.id)
              const p2 = player.get(member.id)
              if ( p1 === p2) {
                
                return msg.edit({
                  content: `**${message.author.username}** chose *${p1}* | **${member.user.username}** chose *${p2}* \`=>\` **[RESULT]** TIED! `,
                  components : [
                    
                  ]
                })
              }
                
              if (p1 == "rock" && p2 == "paper")  return msg.edit({
                  content: `**${message.author.username}** chose *${p1}* | **${member.user.username}** chose *${p2}* \`=>\` **[RESULT]** ${member.user.username} won!`,
                  components : [
                    
                  ]
                });
              if (p1 == "rock" && p2 == "scissors")  return msg.edit({
                  content: `**${message.author.username}** chose *${p1}* | **${member.user.username}** chose *${p2}* \`=>\` **[RESULT]** ${message.author.username} won!`,
                  components : [
                    
                  ]
                });
              

              if (p1 == "paper" && p2 == "rock") return msg.edit({
                  content: `**${message.author.username}** chose *${p1}* | **${member.user.username}** chose *${p2}* \`=>\` **[RESULT]** ${message.author.username} won!`,
                  components : [
                    
                  ]
                });
              if (p1 == "paper" && p2 == "scissors") return msg.edit({
                  content: `**${message.author.username}** chose *${p1}* | **${member.user.username}** chose *${p2}* \`=>\` **[RESULT]** ${member.user.username} won!`,
                  components : [
                    
                  ]
                });
              

              if (p1 == "scissors" && p2 == "paper")  return msg.edit({
                  content: `**${message.author.username}** chose *${p1}* | **${member.user.username}** chose *${p2}* \`=>\` **[RESULT]** ${message.author.username} won!`,
                  components : [
                    
                  ]
                });
              if (p1 == "scissors" && p2 == "rock")  return msg.edit({
                  content: `**${message.author.username}** chose *${p1}* | **${member.user.username}** chose *${p2}* \`=>\` **[RESULT]** ${member.user.username} won!`,
                  components : [
                    
                  ]
                });

                
            })
            //Collection [Map]
          })


        // bot.on('clickMenu', menu => {
        //   console.log(menu.clicker.user.username)
        //   if (menu.values[0] == 'rock') console.log('1')
        // })


      }
    



    },
};