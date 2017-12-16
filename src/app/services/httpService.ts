import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable()
export class HttpService{
  host: string = environment.url;
  token: string = '';
  httpOptions: {} = {};

  constructor(private http: HttpClient){}

  setHeaders(){
    return this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.token 
      })
    };
  }

  post(url,data){
    return this.http.post(this.host + url,data,this.setHeaders());
  }

  put(url,data){
    return this.http.put(this.host + url,data,this.setHeaders());
  }

  get(url){
    return this.http.get(this.host + url,this.setHeaders());
  }

  remove(url){
    return this.http.delete(this.host + url,this.setHeaders());
  }

}
