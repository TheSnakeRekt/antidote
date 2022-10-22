import {Application, Request, Response, NextFunction} from 'express';
import { Container } from 'typedi';
import { createClient, RedisClientType } from 'redis';

export abstract class CommonRoutesConfig {
    
    private readonly REDIS_EXPIRE_TIME = Number(process.env.CACHE_EXPIRE_TIME ?? '60000'); 
    private readonly REDIS_HOST = process.env.REDIS_HOST ?? '';
    private readonly REDIS_PORT = Number(process.env.REDIS_PORT ?? '6379');

    app : Application
    name: string;
    private redisClient: RedisClientType;

    constructor(name: string) {
        this.name = name;
        this.app = Container.get('app');
        this.redisClient = createClient({
            url: `redis://${this.REDIS_HOST}:${this.REDIS_PORT}`,
        });

        this.initCache();
        this.configureRoutes();
    }

    set(key:string, value:any) {
        this.redisClient.set(key, JSON.stringify(value), {EX:this.REDIS_EXPIRE_TIME});
    }
    
    get(req:Request, res:Response, next:NextFunction) {
        this.redisClient.get(req.route.path).then(data=>{
            if(data === null){
                next();
            } else {
                res.status(200).send(JSON.parse(data));
            }
        }).catch(err=>{
            console.error(err);
            res.status(400).send(err)
        });
    }

    getName(): string {
        return this.name;
    }

    initCache(){
        this.redisClient.on('error', (err)=>{console.error('Redis Client Error', err)});
        this.redisClient.connect().then(()=>{
            console.log('Redis Client Connected')
        });
    }

    abstract configureRoutes(): Application;
}