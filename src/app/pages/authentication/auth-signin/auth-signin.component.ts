import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClientService } from 'src/app/Services/http-client.service';

@Component({
  selector: 'app-auth-signin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './auth-signin.component.html',
  styleUrls: ['./auth-signin.component.scss'],
})
export default class AuthSigninComponent {
  
  loginForm!: FormGroup
  public isAuthenticated: boolean = localStorage.getItem("isAuthenticated") == "true";
  public errorMessage: string | undefined;
  constructor(public service: HttpClientService, private router: Router) {

  }

  ngOnInit(): void {
    if(this.isAuthenticated){
      this.router.navigateByUrl("dashboard");
    }

    this.loginForm = new FormGroup({
        username: new FormControl("", [Validators.required]),
        password: new FormControl("", [Validators.required])
    });
  }

  getFormControl() {
    return this.loginForm.controls;
  }

  signIn() {
    var url = "https://localhost:7073/Account/Login";

    this.service.post(url, this.loginForm.value).subscribe((data: any) => {
      if(data.success)
      {
        this.router.navigateByUrl("dashboard");
        localStorage.setItem("jwtToken", data.jwtToken);
        localStorage.setItem("loginUserInfo", JSON.stringify(data.user));
      }
      else
      {
        this.errorMessage = data.errorMessage;
      }

      localStorage.setItem("isAuthenticated", data.success);
    });
  }

}
