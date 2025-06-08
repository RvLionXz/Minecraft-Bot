const { pathfinder, Movements, goals } = require('mineflayer-pathfinder');
const { Vec3 } = require('vec3');

// Fungsi untuk mengatur logika bot
function movement(bot) {
  bot.loadPlugin(pathfinder); // Memuat plugin pathfinder untuk navigasi

  // Event ketika bot menerima pesan
  bot.on('chat', (username, message) => {
    if (username === bot.username) return;

    if (message === 'ikuti saya') {
      const target = bot.players[username]?.entity;
      if (target) {
        bot.chat('Baik, saya akan mengikuti Anda.');
        followPlayer(bot, target);
      } else {
        bot.chat('Saya tidak bisa melihat Anda.');
      }
    } else if (message === 'berhenti') {
      bot.chat('Baik, saya akan berhenti mengikuti.');
      bot.pathfinder.setGoal(null); // Menghentikan navigasi
    }
  });

  // Fungsi untuk berjalan random
  setInterval(() => {
    if (!bot.pathfinder.isMoving()) {
      const randomX = bot.entity.position.x + Math.random() * 20 - 10;
      const randomZ = bot.entity.position.z + Math.random() * 20 - 10;
      const randomPosition = new Vec3(randomX, bot.entity.position.y, randomZ);

      bot.pathfinder.setGoal(new goals.GoalBlock(
        randomPosition.x,
        randomPosition.y,
        randomPosition.z
      ));
    }
  }, 5000); // Berjalan random setiap 5 detik
}

// Fungsi untuk mengikuti pemain
function followPlayer(bot, target) {
  const movements = new Movements(bot, bot.registry);
  bot.pathfinder.setMovements(movements);

  bot.pathfinder.setGoal(new goals.GoalFollow(target, 1), true); // Mengikuti target
}

module.exports = { movement };
