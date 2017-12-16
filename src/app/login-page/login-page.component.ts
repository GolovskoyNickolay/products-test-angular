import {Component} from '@angular/core';
import {HttpService} from "../services/httpService";
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from "@angular/router";
import {LoginService} from "../services/loginService";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent{
  register: any = {
    name:'sienn',
    password:'recruitsAPI'
  };
  registerForm = this.fb.group({
    name: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(private fb:FormBuilder, private loginService: LoginService) { }

  login(){
    let data = new FormData();
    data.append('UserName',this.register.name);
    data.append('Password',this.register.password);
    this.loginService.login(data);
  }
}
