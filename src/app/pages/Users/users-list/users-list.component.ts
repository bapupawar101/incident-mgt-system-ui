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
  users: User[] = [
    {username: "test 01", role: "End User", emailAddress: "test01@gmail.com", mobile: "23423423442"},
    {username: "test 02", role: "Admin", emailAddress: "test02@gmail.com", mobile: "23423423442"},
    {username: "test 03", role: "Analyst", emailAddress: "test03@gmail.com", mobile: "23423423442"},    
  ];

  constructor(public service: HttpClientService) {

  }

  ngOnInit(): void {
    var url = "https://jsonplaceholder.typicode.com/todos/";
    this.service.get(url).subscribe((data: any) => {
      console.log(data);
      //this.incidents = data;
    });
  }
}
