import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Incidents } from 'src/app/Models/incidents';
import { HttpClientService } from 'src/app/Services/http-client.service';

@Component({
  selector: 'app-view-incident',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './view-incident.component.html',
  styleUrl: './view-incident.component.scss'
})
export class ViewIncidentComponent {
  id!: number;
  incident: Incidents
  form!: FormGroup
  bShowIncidentTab: boolean | true;
  bShowChatTab: boolean | false;
  bShowCommentTab: boolean | false;

  constructor(public service: HttpClientService, private router: Router, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"]
    this.getIncident();
    
    this.form = new FormGroup({
      description: new FormControl('', [Validators.required]),
      symptoms: new FormControl('', [Validators.required]),
      tenantId: new FormControl('', [Validators.required]),
      priorityId: new FormControl('', [Validators.required]),
      urgencyId: new FormControl('', [Validators.required]),
      cityId: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
    });

    //TODO: Get by ID api call when query string param has Id.
  }

  getIncident() {    
    var url = "https://localhost:7073/Incident/GetById?id=" + this.id;
    this.service.get(url).subscribe((data: any) => {
      console.log(data);      
      this.incident = data;
    });        
  }  

  creatIncident() {
    console.log(this.form.value);
    var url = "https://localhost:7073/Incident/Save";
    this.service.create(url, this.form.value).subscribe((data: any) => {
      console.log(data);      
      this.router.navigateByUrl("incidents-list");
    });        
  }

  showTab(tabName) {
    this.bShowIncidentTab= false;
    this.bShowChatTab = false;
    this.bShowCommentTab = false;
    
    if(tabName == "incident"){
        this.bShowIncidentTab = true;
    }
    else if(tabName == "chat") {
      this.bShowChatTab = true;
    }
    else if(tabName == "comment"){
      this.bShowCommentTab = true;
    }
  }
}
