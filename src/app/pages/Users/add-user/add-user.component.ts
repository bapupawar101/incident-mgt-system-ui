import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientService } from 'src/app/Services/http-client.service';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss'
})
export class AddUserComponent {
  form!: FormGroup

  constructor(public service: HttpClientService, private router: Router){}

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),      
      mobile: new FormControl('', [Validators.required]),
      confirmpassword: new FormControl('', [Validators.required]),    
      emailaddress: new FormControl('', [Validators.required, Validators.email]),    
      roleAdmin: new FormControl(false),
      roleEndUser: new FormControl(false),
      roleAnalyst: new FormControl(false),
    });
  }

  creatUser() {
    console.log(this.form.value);
    var url = "https://jsonplaceholder.typicode.com/todos/";
    this.service.create(url, this.form.value).subscribe((data: any) => {
      console.log(data);      
      this.router.navigateByUrl("user/index");
    });        
  }
}
