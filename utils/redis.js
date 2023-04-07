import { createClient } from 'redis';

class RedisClient {
  constructor() {
    this.client = createClient();

    this.client.on('error', (error) => {
      console.error('Redis client error:', error);
      throw error; // Propagate the error
    });
  }

  isAlive() {
    return this.client.connected;
  }

  async get(key) {
    return new Promise((resolve, reject) => {
      this.client.get(key, (error, value) => {
        if (error) {
	  console.error('Redis get error:', error); // Log the error
	  reject(error);
	} else {
	  resolve(value);
	}
      });
    });
  }

  async set(key, value, duration) {
    return new Promise((resolve, reject) => {
      this.client.set(key, value, 'EX', duration, (error, result) => {
        if (error) {
	  console.error('Redis ser error:', error); // Log the error
	  reject(error);
	} else {
	  resolve(result);
	}
      });
    });
  }

  async del(key) {
    return new Promise((resolve, reject) => {
      this.client.del(key, (error, result) => {
        if (error) {
	  console.error('Redis del error:', error); // Log the error
          reject(error);
	} else {
	  resolve(result);
	}
      });
    });
  }

  async close() {
    return new Promise(resolve) => {
      this.client.quit(() => {
        resolve();
      });
    });
  }
}

const redisClient = new RedisClient();
module.exports = redisClient;
