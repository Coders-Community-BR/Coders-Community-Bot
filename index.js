require('dotenv').config();
const { ShardingManager } = require('discord.js'),
    { env: { TOKEN: token } } = process,
    manager = new ShardingManager('./src/index.js', { token });

manager.on('shardCreate', shard => console.log(`│ GOOD │ Launched shard ${shard.id}`));
manager.spawn();