
require('babel-polyfill');
require('bluebird');
const db = require('../lib/db');
const mongoose = require('mongoose');
const RPC = require('../lib/rpc');

// Handle missed promises.
process.on('unhandledRejection', (err) => {
  console.log(JSON.stringify(err));
});

// Connect to the database.
mongoose.connect(db.getDSN(), db.getOptions());

// Setup the error handler.
export const exit = (code = 0) => {
  try {
    mongoose.disconnect();
  } catch(err) {
    console.log('db:', err);
  } finally {
    process.exit(code);
  }
};

// Setup RPC node connection.
export const rpc = new RPC();

export default {
  exit,
  rpc
};