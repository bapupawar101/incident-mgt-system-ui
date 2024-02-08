import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { bHideIncidentMenuItems, getEnumText } from 'src/app/Models/UserRole';
import { Incidents, Priority, getPriorityEnumText, getStatusEnumText, getUrgencyEnumText } from 'src/app/Models/incidents';
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

  constructor(public service: HttpClientService, private router: Router) {
    if(bHideIncidentMenuItems())
    {
      this.router.navigateByUrl('');
    }
  }

  ngOnInit(): void {
    var url = "https://localhost:7073/Incident/GetAll";
    this.service.post(url, null).subscribe((data: any) => {      
      for(let i = 0; i < data.length; i++) {
        data[i]["urgencyDisplayName"] = getUrgencyEnumText(data[i].urgency);
        data[i]["priorityDisplayName"] = getPriorityEnumText(data[i].urgency);
        data[i]["statusDisplayName"] = getStatusEnumText(data[i].urgency);
      }

      this.incidents = data;      
    });
  }
}
