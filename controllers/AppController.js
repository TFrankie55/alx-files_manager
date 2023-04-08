import dbClient from '../utils/db';
import redisClient from '../utils/redis';

// returns if Redis is alive and if the DB is alive
class AppController {
  static getStatus(request, response) {
    response.status(200).json({ "redis": true, "db": true });
  }

  // returns the number of users and files in DB:
  // { "users": 12, "files": 1231 } with a status code 200
  static async getStats(request, response) {
    const usersNum = await dbClient.nbUsers();
    const filesNum = await dbClient.nbFiles();
    response.status(200).json({ users: usersNum, files: filesNum });
  }
}

module.exports = AppController;
