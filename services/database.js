const { MongoClient } = require('mongodb');

const uri = process.env.CONNECTION_STRING;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
async function connect() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  connect,
  db:client.db(),
};