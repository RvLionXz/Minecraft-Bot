const mineflayer = require('mineflayer');
const { movement } = require('./movement');

let bot;

function createMyBot() {
  bot = mineflayer.createBot({
    host: 'rvlionxz.mcsh.io',
    port: 25565,
    username: 'AmbaBot',
    // version: '1.21.5',
  });

  bot.on('chat', (username, message) => {
    if (username === bot.username) return;
    bot.chat(message);
  });

  bot.on('kicked', (reason) => {
    console.log('Kicked:', reason);
    reconnect();
  });

  bot.on('error', (err) => {
    console.log('Error:', err);
    reconnect();
  });

  bot.once('spawn', () => {
    console.log('Bot spawned!');
    movement(bot);
  });
}

function reconnect() {
  console.log('Bot will try to reconnect in 5 seconds...');
  setTimeout(() => {
    createMyBot();
  }, 5000);
}

createMyBot();
