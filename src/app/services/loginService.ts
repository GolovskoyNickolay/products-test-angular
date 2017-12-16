import {Injectable} from "@angular/core";
import {HttpService} from "./httpService";
import {Router} from "@angular/router";

@Injectable()
export class LoginService{
  timeOut: number;

  constructor(private http: HttpService, private router: Router){}

  login(data){
    this.http.post('Jwt',data).subscribe((data)=>{
      this.http.token = data['access_token'];
      this.expiredToken(data['expires_in']);
      this.router.navigate(['/products']);
    },(error)=>{
      alert(error.error);
    })
  }

  logout(){
    clearTimeout(this.timeOut);
    this.router.navigate(['/login']);
    this.http.token = '';
  }

  expiredToken(time){
    //from s to ms
    time = time *1000;
    this.timeOut = setTimeout(()=>{
      alert('Token time is expired');
      this.router.navigate(['/login']);
      this.http.token = '';
    },time);
  }

}


