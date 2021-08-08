module.exports = {
    name: 'invite',
    aliases: ['link','links','vote','invibe','owlvernyte'],
    category: 'Infos',
    utilisation: '{prefix}invite',

    execute(bot, message) {
      message.channel.send({
        embed: {
          color: 'RANDOM',
          author: {name: 'Invibe me!', url: 'https://discord.com/api/oauth2/authorize?client_id=853623967180259369&permissions=8&scope=bot'}
        }
      })
      message.channel.send({
        embed: {
          color: 'RANDOM',
          author: { name: 'Links of us', 
            url: 'https://www.youtube.com/channel/UCEG5sgFKieaUuHsu5VG-kBg',
            icon_url: 'https://cdn.discordapp.com/attachments/852888201391374376/853598262724395018/20210613_182942.gif'},
          description: '**Discord**: *https://discord.link/owlvernyte*\n**Facebook**: *https://www.facebook.com/owlvernyte*\n\n> **Vote our server**: *https://top.gg/servers/830110554604961824*\n> **Vote me here**: *https://top.gg/bot/853623967180259369*\n> **Donate me via Playerduo**: *https://playerduo.com/owlvernyte*',
          footer: {text: "Fiezt#1492 || Slimaeus#8878"}
        }
      });
    },
};
