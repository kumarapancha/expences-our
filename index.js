// Vercel serverless entry point. All /api/* and /health requests are routed
// here by vercel.json; the website itself is served from /public.
const { connectDb } = require('../src/db');
const { createApp } = require('../src/app');

const app = createApp();

module.exports = async (req, res) => {
  try {
    await connectDb();
  } catch (err) {
    console.error('MongoDB connection failed:', err.message);
    res.statusCode = 503;
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({ error: 'Database unavailable' }));
  }
  return app(req, res);
};
