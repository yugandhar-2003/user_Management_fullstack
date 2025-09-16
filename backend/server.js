require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./src/models');
const usersRouter = require('./src/routes/users');
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.json({ status: 'OK', message: 'User Management API' }));

app.use('/api/users', usersRouter);

// global error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

async function start() {
  await sequelize.authenticate();
  console.log('DB connection OK');
  // don't automatically sync in production; script provided
  await sequelize.sync();
  app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
}

start().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});