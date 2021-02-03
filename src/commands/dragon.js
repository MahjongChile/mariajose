module.exports = {
    name: 'dragon',
    description: 'Orden de los dragones',
    aliases: ['dragones','dragons'],
    execute(message) {
        const guild = message.guild;
        //TODO: Fix para leer el emoji de mayonesa y pasarlo por mensaje privado
        const mayo = guild.emojis.cache.find(emoji => emoji.name === "mayonesa");
        message.reply('Los dragones van ordenados asi:');
        message.channel.send(`:avocado: :arrow_right: :tomato: :arrow_right: ${mayo} :leftwards_arrow_with_hook:`);
    },
};
