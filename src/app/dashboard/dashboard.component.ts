// angular import
import { Component, OnInit } from '@angular/core';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { HttpClientService } from '../Services/http-client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export default class DashboardComponent implements OnInit {
  public isAuthenticated: boolean = localStorage.getItem("isAuthenticated") == "true";
  public errorMessage: string | undefined;

  constructor(private router: Router) {
  }

  ngOnInit() {
    if(!this.isAuthenticated){
      this.router.navigateByUrl("/auth/signin");
    }

    // this.loginForm = new FormGroup({
    //     username: new FormControl("", [Validators.required]),
    //     password: new FormControl("", [Validators.required])
    // });
  }
}
