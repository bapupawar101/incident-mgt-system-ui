import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Incidents } from 'src/app/Models/incidents';
import { Comments } from 'src/app/Models/comments';
import { HttpClientService } from 'src/app/Services/http-client.service';
import { bHideIncidentMenuItems } from 'src/app/Models/UserRole';

@Component({
  selector: 'app-view-incident',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './view-incident.component.html',
  styleUrl: './view-incident.component.scss'
})

export class ViewIncidentComponent {
  id!: number;
  incident: Incidents
  form!: FormGroup
  commentForm!: FormGroup
  showIncidentTabClass: string = "active show";
  showChatTabClass: string = "";
  showCommentTabClass: string = "";
  comments: Comments[] = [];    

  constructor(public service: HttpClientService, private router: Router, private route: ActivatedRoute){
    if(bHideIncidentMenuItems())
    {
      this.router.navigateByUrl('');
    }
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"]
    this.getIncident();
    this.getCommentDetails();
    
    this.form = new FormGroup({
      incId: new FormControl(this.id),
      description: new FormControl('', [Validators.required]),
      symptoms: new FormControl('', [Validators.required]),
      tenantId: new FormControl('', [Validators.required]),
      priorityId: new FormControl('', [Validators.required]),
      urgencyId: new FormControl('', [Validators.required]),
      cityId: new FormControl('', [Validators.required]),
      status: new FormControl(0, [Validators.required]),
    });

    this.commentForm = new FormGroup({
      incId: new FormControl(this.id),
      message: new FormControl('', [Validators.required]),      
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

  getCommentDetails() {    
    var url = "https://localhost:7073/Incident/GetAllComments?incId=" + this.id;
    this.service.get(url).subscribe((data: any) => {      
      console.log(data);
      if(data) {        
        this.comments = data;
      }
    });        
  }  

  updateIncident() {
    console.log(this.form.value);
    var url = "https://localhost:7073/Incident/Update";
    var jsonData = this.form.value;
    jsonData["status"] = Number(this.form.value['status']);
    jsonData["priority"] = this.form.value['priorityId'];
    jsonData["urgency"] = this.form.value['methodId'];
    this.service.update(url, jsonData).subscribe((data: any) => {      
      this.router.navigateByUrl("incidents-list");
    });        
  }

  addComment() {        
    var url = "https://localhost:7073/Incident/SaveComment";
    this.service.create(url, this.commentForm.value).subscribe((data: any) => {            
      this.getCommentDetails();      
      this.commentForm.get('message').setValue('');
    });  
  }

  showTab(tabName) {
    this.showIncidentTabClass= "";
    this.showChatTabClass = "";
    this.showCommentTabClass = "";
    
    if(tabName == "incident") {
        this.showIncidentTabClass = "active show";
    }
    else if(tabName == "chat") {
      this.showChatTabClass = "active show";
    }
    else if(tabName == "comment"){
      this.showCommentTabClass = "active show";
    }
  }
}
