const mineflayer = require('mineflayer');
const { movement } = require('./movement');

const bot = mineflayer.createBot({
  host: 'rvlionxz.mcsh.io',
  port: 25565,
  username: 'AmbaBot',
  // version: '1.21.5',
})

bot.on('chat', (username, message) => {
  if (username === bot.username) return
  bot.chat(message)
})

// Log errors and kick reasons:
bot.on('kicked', console.log)
bot.on('error', console.log)

bot.once('spawn', () => {
    movement(bot);
  });