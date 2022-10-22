import { SearchParams } from './../../models/search_params.d';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GamelistService {
  constructor(@Inject('BASE_URL') private BASE_URL:string, private client: HttpClient) {}

  getGames(params: SearchParams){
    return this.client.get(this.BASE_URL+'games', {params:{...params}})
  }

  getGamesByTitle(params: SearchParams){
    return this.client.get(this.BASE_URL+'games', {params:{...params}});
  }
}
