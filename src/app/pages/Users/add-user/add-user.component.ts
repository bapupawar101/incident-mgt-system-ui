import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClientService } from 'src/app/Services/http-client.service';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss'
})
export class AddUserComponent {
  form!: FormGroup

  constructor(public service: HttpClientService, private router: Router){}

  ngOnInit(): void {
    this.form = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),      
      mobileNo: new FormControl('', [Validators.required]),
      confirmpassword: new FormControl('', [Validators.required]),    
      email: new FormControl('', [Validators.required, Validators.email]),    
      roleAdmin: new FormControl(false),
      roleEndUser: new FormControl(false),
      roleAnalyst: new FormControl(false),
    });
  }

  creatUser() {
    console.log(this.form.value);
    var url = "https://localhost:7073/api/User/AddUser";
    this.service.create(url, this.form.value).subscribe((data: any) => {
      console.log(data);
      this.router.navigateByUrl("users-list");
    });        
  }
}
