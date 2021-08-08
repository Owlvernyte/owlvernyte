module.exports = {
    name: 'clap',
    aliases: [],
    category: 'Fun',
    utilisation: '{prefix}clap',

    execute(bot, message) {
      const member = message.mentions.members.first();

      const rando_imgs = [
        'https://i.pinimg.com/originals/d5/a6/45/d5a64536c94247c9f2c80e486861753e.gif',
        'https://i.giphy.com/media/2ZYPKIAOjdgIqHx7da/giphy.gif',
        'https://cdn.dribbble.com/users/268474/screenshots/4738458/clapping-inclusive.gif',
        'https://www.icegif.com/wp-content/uploads/clapping-icegif-3.gif',
        'https://i.gifer.com/8SW.gif',
        'https://www.icegif.com/wp-content/uploads/clapping-icegif-15.gif',
        'https://i.pinimg.com/originals/08/ba/65/08ba655ce598859f54956f113d09aa7b.gif',
        'https://i.gifer.com/9kRS.gif',
      ]

      let imageURL = rando_imgs[Math.floor(Math.random() * rando_imgs.length)]

      message.delete();


      if (member) {
        if (member.id == message.author.id) {
          return message.channel.send(`Congrats! You clapped yourself!`,
          {
            embed: {
              color: 'RANDOM',
              author: {name: `${message.author.username} made theirself laugh!!!`, url: imageURL },
              image: { url: imageURL, },
              footer: { text: `Autism ${message.author.username} ✅ | Images source: Internet`,icon_url: `${message.author.displayAvatarURL()}`},
            }
          }
      )}
        else {
          const username = member.user.username

          return message.channel.send(`Congrats! ${member} has been clapped!`,
          {
            embed: {
              color: 'RANDOM',
              author: {name: `${username} made ${message.author.username} laugh!`, url: imageURL},
              image: { url: imageURL, },
              footer: { text: `${message.author.tag} | Images source: Internet`, icon_url: `${message.author.displayAvatarURL()}`}
            }
          }
      )
        }
      }
      else return message.channel.send(`Congrats! You clapped yourself!`,
        {
          embed: {
            color: 'RANDOM',
            author: {name: `${message.author.username} made theirself laugh!!!`, url: imageURL },
            image: { url: imageURL, },
            footer: { text: `Autism ${message.author.username} ✅ | Images source: Internet`,icon_url: `${message.author.displayAvatarURL()}`},
          }
        }
      )

    },
};