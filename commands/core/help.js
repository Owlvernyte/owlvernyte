
module.exports = {
    name: 'help',
    aliases: ['h'],
    category: 'Core',
    utilisation: '{prefix}help <command name>',

    async execute(bot, message, args) {
        const guildId = message.guild.id 
        const prefix = await bot.db.get(`${guildId}.prefix`) || process.env.PREFIX;

        if (!args[0]) {
            

            const fun = bot.commands.filter(x => x.category == 'Fun').map((x) => '`' + x.name + '`').join(', ');
            const infos = bot.commands.filter(x => x.category == 'Infos').map((x) => '`' + x.name + '`').join(', ');
            const mod = bot.commands.filter(x => x.category == 'Moderations').map((x) => '`' + x.name + '`').join(', ');
            const configs = bot.commands.filter(x => x.category == 'Configuration').map((x) => '`' + x.name + '`').join(', ');
            
            message.channel.send({
                embed: {
                    color: 'RANDOM',
                    author: { name: 'Help panel' },
                    footer: { text: `Requested by ${message.author.tag} | Using ${prefix}help` },
                    fields: [
                        { name: 'Informations', value: infos },
                        { name: 'Fun', value: fun },
                        { name: 'Moderations', value: mod },
                        { name: 'Configuration', value: configs },
                        
                    ],
                    timestamp: new Date(),
                    description: `You can use ${prefix}help + <command name> to have more informantion`,
                },
            });
            
        } else {
            const command = bot.commands.get(args.join(" ").toLowerCase()) || bot.commands.find(x => x.aliases && x.aliases.includes(args.join(" ").toLowerCase()));

            if (!command) return message.channel.send(`I did not find this command !`);
            
            message.channel.send({
                embed: {
                    color: 'RANDOM',
                    author: { name: 'Help panel' },
                    footer: { text: `Requested by ${message.author.tag} | Using ${prefix}help ${command}` },
                    fields: [
                        { name: 'Name', value: command.name, inline: true },
                        { name: 'Category', value: command.category, inline: true },
                        { name: 'Aliase(s)', value: command.aliases.length < 1 ? 'None' : command.aliases.join(', '), inline: true },
                        { name: 'Utilisation', value: command.utilisation.replace('{prefix}', process.env.PREFIX), inline: true },
                    ],
                    timestamp: new Date(),
                    description: 'Find information on the command provided.\nMandatory arguments `[]`, optional arguments `<>`.',
                }
            });
            
        };
    },
};
