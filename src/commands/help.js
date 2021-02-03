const {prefix,owner} = require('../../config/config.json');
const {MessageEmbed} = require("discord.js");

module.exports = {
    name: 'help',
    description: 'Lista de todos los comandos o información de algun comando particular.',
    aliases: ['commands','comandos'],
    usage: '[command name]',
    cooldown: 5,
    execute(message, args) {
        const data = [];
        const {commands} = message.client;
        const embed = new MessageEmbed();
        const colorEmbed = "#C50080";

        if (!args.length) {
            data.push('Here\'s a list of all my commands:');
            data.push();
            data.push(`\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`);

            const descriptionText = "Mi lista de comandos es: \n \n **"+
                commands.map(command => command.name).join(', ')+
                `** \n \n \n Si quiere saber como usar un comando en particular, escribir: \n \n ${prefix}help ** nombreDelComando** \n\n\n\n`;

            embed
                .setColor(colorEmbed)
                .setTitle(`Ayuda de comandos`)
                .setDescription(descriptionText)
                .setThumbnail(
                    `${owner.avatar}`
                )
                .setFooter(`${owner.slogan}`);

            data.push(embed);

            return message.author.send(data, {split: true})
                .then(() => {
                    if (message.channel.type === 'dm') return;
                    message.reply('Acabo de enviar por DM todos mis comandos.');
                    console.log(
                        "comando " +
                        message.content +
                        " ejecutado por: " +
                        message.author.username +
                        " en: " +
                        message.guild?message.guild.name:'DM'
                    );
                })
                .catch(error => {
                    console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
                    message.reply('No me permites enviarte DM');
                    console.log(
                        "ERROR: comando " +
                        message.content +
                        " ejecutado por: " +
                        message.author.username +
                        " en: " +
                        message.guild?message.guild.name:'DM'
                    );
                })
                ;
        }

        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

        if (!command) {
            return message.reply('Este no es un comando valido');
        }

        const descriptionData = [];

        descriptionData.push(`**Nombre:** ${command.name}`);

        if (command.aliases) descriptionData.push(`**Aliases:** ${command.aliases.join(', ')}`);
        if (command.description) descriptionData.push(`**Descripción:** ${command.description}`);
        if (command.usage) descriptionData.push(`**Uso:** ${prefix}${command.name} ${command.usage}`);

        descriptionData.push(`**Cooldown:** ${command.cooldown || 3} segundos`);

        embed
            .setColor(colorEmbed)
            .setTitle(`Ayuda de comando`)
            .setDescription(descriptionData.join('\n'))
            .setThumbnail(
                `${owner.avatar}`
            )
            .setFooter(`${owner.slogan}`);

        console.log(
            "comando " +
            message.content +
            " ejecutado por: " +
            message.author.username +
            " en: " +
            (!message.guild)?'DM':message.guild.name
        );
        data.push(embed);

        message.channel.send(data, {split: true});
    },
};
