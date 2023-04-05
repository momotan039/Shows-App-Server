const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017/app1';

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