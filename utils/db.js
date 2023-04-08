import { MongoClient } from 'mongodb';

const HOST = process.env.DB_HOST || 'localhost';
const DATABASE = process.env.DB_DATABASE || 'files_manager';
const PORT = process.env.DB_PORT || 27017;
const url = `mongodb://${HOST}:${PORT}`;

class DBClient {
  constructor() {
    this.client = new MongoClient(url, { useUnifiedTopology: true, useNewUrlParser: true });
    this.client.connect().then(() => {
      this.db = this.client.db(`${DATABASE}`);
    }).catch((err) => {
      console.log(err);
    });
  }

  // func returns true when connection to MongoDB is success
  isAlive() {
    return this.client.isConnected();
  }

  // returns the number of doc in the collection
  async nbUsers() {
    const users = this.db.collection('users');
    const usersNum = await users.countDocuments();
    return usersNum;
  }

  // returns the number of doc in the collection
  async nbFiles() {
    const files = this.db.collection('files');
    const filesNum = await files.countDocuments();
    return filesNum;
  }
}

const dbClient = new DBClient();

module.exports = dbClient;
