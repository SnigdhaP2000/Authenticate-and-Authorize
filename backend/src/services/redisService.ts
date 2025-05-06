import Redis, { RedisKey } from 'ioredis';

export default class RedisService {
    client: Redis | null;
    constructor() {
        this.client = null;
      }
    public initializeRedis = () => {    
        this.client = new Redis({
            host:'localhost',
            port: 6379,
        })
        this.client.on('connect', () => console.log('Redis connected'));
        this.client.on('error', (err) => console.error('Redis error:', err));    
    }

    public async set(key: RedisKey, value: any, expireSeconds: string | number) {
        const stringValue = JSON.stringify(value);
        if (expireSeconds) {
          await this.client!.set(key, stringValue, 'EX', expireSeconds);
        } else {
          await this.client!.set(key, stringValue);
        }
      }
    
    public async get(key: RedisKey) {
        const data = await this.client!.get(key);
        return data ? JSON.parse(data) : null;
      }

    public async delete(key:string) {
        await this.client!.del(key);
      }

}

