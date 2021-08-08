module.exports = {
    name: 'ping',
    aliases: [],
    category: 'Infos',
    utilisation: '{prefix}ping',

    execute(bot, message) {
        message.channel.send(`Ping : **${bot.ws.ping}ms** !`);
    },
};
