import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HttpService } from "./services/httpService";
import { ProductsListComponent } from './products-list/products-list.component';
import { LoginPageComponent } from "./login-page/login-page.component";
import { AuthGuard } from "./AuthGuard";
import {LoginService} from "./services/loginService";


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component:LoginPageComponent
  },
  {
    path: 'products',
    component: ProductsListComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'product/:id',
    component: ProductsListComponent,
    canActivate:[AuthGuard]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    ProductsListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    NgbModule.forRoot()
  ],
  providers: [HttpService,LoginService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
