import { ApiResponse } from '../types/common.models';
import { Service } from "typedi";
import axios, {AxiosRequestConfig} from 'axios';

@Service()
export default class HttpClientService {
    private BASE_URL = 'https://api.rawg.io/api';
    private API_KEY!:string;
    private req_config!: AxiosRequestConfig<any>

    constructor(){
        this.API_KEY = process.env.API_KEY ?? '';
        this.req_config = {
            params: {'key': this.API_KEY }
        };
    }

    async getGames(params: any) {
       this.req_config.params = {...this.req_config.params, ...params}; 

       const resp = await axios.get(`${this.BASE_URL}/games`, this.req_config);
       return resp.data as ApiResponse;
    }
}