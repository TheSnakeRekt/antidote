import { GameController } from '../controllers/gameController';
import { Application, Request, Response, NextFunction} from "express";
import { CommonRoutesConfig } from "../common/abstract/common.routes.config"
import { Service } from 'typedi';

@Service()
export class GamesRoutes extends CommonRoutesConfig {

    static readonly routeName = 'GamesRoutes';

    constructor(private gamesController: GameController){
        super(GamesRoutes.routeName);
    }

    configureRoutes(): Application {
        this.app.route('/games')
            .all(async (req:Request, res:Response, next:NextFunction) => {
                //TODO: Implement Authorization check
                next();
            })
            .get(this.get.bind(this), async (req:Request, res:Response) => {
              const data = await this.gamesController.getGames(req.query);
              if(data !== null){
                res.status(200).send(data);
                this.set.bind(this, req.route.path, data);
              }else{
                res.status(404).send(data);
              }
            });

        return this.app;
    }
}