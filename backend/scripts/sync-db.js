const { sequelize } = require('../src/models');

async function sync() {
  try {
    await sequelize.sync({ alter: true });
    console.log('Database synced');
    process.exit(0);
  } catch (err) {
    console.error('Sync failed', err);
    process.exit(1);
  }
}

sync();