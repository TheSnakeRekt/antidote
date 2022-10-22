import express,{Express} from 'express';
import * as http from 'http';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { CommonRoutesConfig } from './common/abstract/common.routes.config';
import { GamesRoutes } from './routes/games.route';
import { Container } from 'typedi';



export class Server {
    private server!: http.Server;


    routes: CommonRoutesConfig[] = [];
    constructor(private app: Express){
        dotenv.config();
        this.init();
        this.listen(Number(process.env.PORT) ?? 3000);
    }

    private init(){
        this.server = http.createServer(this.app);

        this.app.use(express.json());
        this.app.use(cookieParser());
        this.app.use(cors());

        //TODO: Implement Auth Route
        this.routes.push(Container.get<GamesRoutes>(GamesRoutes));
    }

    private listen(port: number | string){
        this.server.listen(port, () => {
          
            this.routes.forEach((route: CommonRoutesConfig) => {
                console.log(`${route.getName()} initialized`);
            });
            
            console.log(`[server]: Server is running at http://localhost:${port}`);
        });
    }
}