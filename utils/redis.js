import { promisify } from 'util';
import { createClient } from 'redis';

// class to define methods for commonly used redis commands
class RedisClient {
  constructor() {
    this.client = createClient();
    this.client.on('error', (error) => {
      console.log(`Redis client not connected to server: ${error}`);
      throw error; // Propagate the error
    });
  }

  // check connection status and report
  isAlive() {
    if (this.client.connected) {
      return true;
    }
    return false;
  }

  // get value for given key from redis server
  async get(key) {
    const redisGet = promisify(this.client.get).bind(this.client);
    const value = await redisGet(key);
    return value;
  }

  // set key value pair to redis server
  async set(key, value, time) {
    const redisSet = promisify(this.client.set).bind(this.client);
    await redisSet(key, value);
    await this.client.expire(key, time);
  }

  // del key value pair from redis server
  async del(key) {
    const redisDel = promisify(this.client.del).bind(this.client);
    await redisDel(key);
  }
}

const redisClient = new RedisClient();
module.exports = redisClient;




// import { createClient } from 'redis';

// class RedisClient {
  // constructor() {
    // this.client = createClient();

    // this.client.on('error', (error) => {
      // console.error('Redis client error:', error);
      // throw error; // Propagate the error
    // });
  // }

  // isAlive() {
    // return this.client.connected;
  // }

  // async get(key) {
    // return new Promise((resolve, reject) => {
      // this.client.get(key, (error, value) => {
        // if (error) {
	  // console.error('Redis get error:', error); // Log the error
	  // reject(error);
	// } else {
	  // resolve(value);
	// }
      // });
    // });
  // }

  // async set(key, value, duration) {
    // return new Promise((resolve, reject) => {
      // this.client.set(key, value, 'EX', duration, (error, result) => {
        // if (error) {
	  // console.error('Redis ser error:', error); // Log the error
	  // reject(error);
	// } else {
	  // resolve(result);
	// }
      // });
    // });
  // }

  // async del(key) {
    // return new Promise((resolve, reject) => {
      // this.client.del(key, (error, result) => {
        // if (error) {
	  // console.error('Redis del error:', error); // Log the error
          // reject(error);
	// } else {
	  // resolve(result);
	// }
      // });
    // });
  // }

  // async close() {
    // return new Promise(resolve) => {
      // this.client.quit(() => {
        // resolve();
      // });
    // });
  // }
// }

// const redisClient = new RedisClient();
// module.exports = redisClient;
