const mongoose = require('mongoose');
const config = require('./config');

mongoose.set('strictQuery', true);

// Reuse one connection across requests. On Vercel the function instance stays
// warm between calls, so this avoids opening a new connection per SMS.
let cached = global.__mongoose;
if (!cached) cached = global.__mongoose = { promise: null };

function connectDb() {
  if (mongoose.connection.readyState === 1) return Promise.resolve(mongoose.connection);
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(config.mongoUri, { serverSelectionTimeoutMS: 10000, maxPoolSize: 5 })
      .catch((err) => { cached.promise = null; throw err; });
  }
  return cached.promise;
}

module.exports = { connectDb };
