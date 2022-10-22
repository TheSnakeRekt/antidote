import { SearchParams } from './../../models/search_params.d';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GamelistService {

  private BASE_URL = "http://localhost:3000/";

  constructor(private client: HttpClient) {}

  getGames(params: SearchParams){
    return this.client.get(this.BASE_URL+'games', {params:{...params}})
  }

  getGamesByTitle(params: SearchParams){
    return this.client.get(this.BASE_URL+'games', {params:{...params}});
  }
}
