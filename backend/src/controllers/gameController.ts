import { Service } from 'typedi'
import HttpClientService from '../services/httpClientService';
import 'reflect-metadata';

@Service()
export class GameController { 
    
    constructor(private httpClientService: HttpClientService){}
    
    getGames(params: any) {
       return this.httpClientService.getGames(params);
    }
}