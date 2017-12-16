import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {HttpService} from "./services/httpService";

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private http: HttpService, private router: Router){}

  canActivate(){
      if(this.http.token !== ''){
        return true;
      }else {
        this.router.navigate(['/login']);
        return false;
      }
  }

}
