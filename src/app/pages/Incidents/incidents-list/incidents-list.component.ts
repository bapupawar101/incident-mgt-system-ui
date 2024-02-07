import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Incidents } from 'src/app/Models/incidents';
import { HttpClientService } from 'src/app/Services/http-client.service';

@Component({
  selector: 'app-incidents-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './incidents-list.component.html',
  styleUrl: './incidents-list.component.scss'
})
export class IncidentsListComponent {
  incidents: Incidents[];

  constructor(public service: HttpClientService) {

  }

  ngOnInit(): void {
    var url = "https://localhost:7073/Incident/GetAll";
    this.service.post(url, null).subscribe((data: any) => {
      //console.log(data);
      this.incidents = data;
    });
  }
}
