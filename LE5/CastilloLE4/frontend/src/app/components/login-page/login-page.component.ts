import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthServiceService } from '../../services/auth.service';
import { TokenStorageServiceService } from '../../services/token-storage.service';
import { OnInit } from '@angular/core';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  }

  constructor(
    private authService: AuthServiceService,
    private TokenStorage: TokenStorageServiceService,
    private http: HttpClient,
    private router: Router) { }

  ngOnInit(): void {
    if(this.TokenStorage.getToken()) {
      this.authService.isLoggedIn = true;
      this.router.navigate([this.authService.redirectUrl]);
    }
  }

  onSubmit() {
    const {username, password} = this.form;

    this.http.post<LoginPostData>("https://localhost:7182/api/Login/login",
    { username, password }).subscribe(data => {
      this.TokenStorage.saveToken(data.id_token);
      this.TokenStorage.saveUser(data.id);
      this.router.navigate([this.authService.redirectUrl]);
      window.location.reload();
    })
  }
}
  export interface LoginPostData {
    id_token:string;
    id:number;
  
}
