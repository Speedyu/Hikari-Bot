module.exports = {
    name: 'ping',
    description: 'Ping!',
    execute(message) {
        message.channel.send('Pong!')
            .then((msg) => {
                const ping = msg.createdTimestamp - message.createdTimestamp;
                message.channel.send(`Latency is ${ping}ms.`);
            })
            .catch(console.error);
    },
};

