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
        return message.channel.send('Please mention someone or pick your choice')
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
        
        
      } else {


        const RockOption = new MessageMenuOption()
          .setLabel("Rock")
          .setDescription("Choose Rock ?")
          .setEmoji('584236007495565333')
          .setValue("rock")
        
        const PaperOption = new MessageMenuOption()
          .setLabel("Paper")
          .setDescription("Choose Paper ?")
          .setEmoji('584236007495565333')
          .setValue("paper")
        
        const ScissorsOption = new MessageMenuOption()
          .setLabel("Scissors")
          .setDescription("Choose Scissors ?")
          .setEmoji('584236007495565333')
          .setValue("scissors")

        const Menu = new MessageMenu()
          .setID('menu1')
          .setPlaceholder('Choose your weapon')
          .addOption(RockOption)
          .addOption(PaperOption)
          .addOption(ScissorsOption)
        const Row1 = new MessageActionRow()
          .addComponent(Menu)


        await message.channel.send( "Hello",
        {components : [Row1]})
          .then(async msg => {
            const filter = (m) => m.clicker.id === message.author.id || m.clicker.id === member.id
            let collector = msg.createMenuCollector(filter, {max : 2})

            collector.on('collect', (menu) => {
              console.log(menu.values[0])
              menu.reply.defer()
            })
            collector.on('end', (b) => {
              console.log(message.author.id)
              b.forEach((value, key)=> {
                console.log(key)
              })
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