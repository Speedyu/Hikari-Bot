const { GatewayIntentBits } = require('discord.js');

module.exports = {
    name: 'timeout',
    description: 'Timeout a user',
    permissions: [GatewayIntentBits.Mute_Members],
    execute(message, args) {
        const user = message.mentions.users.first();
        if (!user) {
            return message.reply('please mention a user to timeout.');
        }

        const member = message.guild.members.cache.get(user.id);
        if (!member) {
            return message.reply('the mentioned user is not in this server.');
        }

        const time = parseInt(args[1], 10) || 5;
        if (time < 1 || time > 60) {
            return message.reply('please specify a timeout duration between 1 and 60 minutes.');
        }

        member.timeout({ reason: 'Breaking the rules', timeout: time * 60 * 1000 })
            .then(() => {
                message.reply(`${user.tag} has been timed out for ${time} minute(s).`);
            })
            .catch((err) => {
                message.reply('an error occurred while timing out the user.');
                console.error(err);
            });
    },
};
