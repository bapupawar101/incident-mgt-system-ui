import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { User } from 'src/app/Models/user';
import { HttpClientService } from 'src/app/Services/http-client.service';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent {
  users: User[] = [];

  constructor(public service: HttpClientService) {  }

  ngOnInit(): void {
    this.getUserList();    
  }

  getUserList() {
    var url = "https://localhost:7073/api/User/GetAllUsers";
    this.service.get(url).subscribe((data: any) => {
      console.log(data);
      this.users = data;
    });
  }
}
