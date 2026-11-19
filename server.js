// Local development: `npm run dev`
const config = require('./config');
const { connectDb } = require('./db');
const { createApp } = require('./app');

connectDb().then(() => {
  createApp().listen(config.port, () => console.log(`Expense tracker on http://localhost:${config.port}`));
}).catch((err) => {
  console.error('MongoDB connection failed:', err.message);
  process.exit(1);
});
