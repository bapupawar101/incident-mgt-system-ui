import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Incidents } from 'src/app/Models/incidents';
import { HttpClientService } from 'src/app/Services/http-client.service';

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
  message: string = "";
  bHasComment: boolean = false;

  constructor(public service: HttpClientService, private router: Router, private route: ActivatedRoute){}

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
      status: new FormControl('', [Validators.required]),
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
    this.bHasComment = false;
    var url = "https://localhost:7073/Incident/GetCommentById?id=" + this.id;
    this.service.get(url).subscribe((data: any) => {      
      console.log(data);
      if(data){
        this.message = data.message;
        this.bHasComment = true;
      }
    });        
  }  

  creatIncident() {
    console.log(this.form.value);
    var url = "https://localhost:7073/Incident/Update";
    this.service.update(url, this.form.value).subscribe((data: any) => {      
      this.router.navigateByUrl("incidents-list");
    });        
  }

  addComment() {        
    var url = "https://localhost:7073/Incident/SaveComment";
    this.service.create(url, this.commentForm.value).subscribe((data: any) => {
      this.bHasComment = true;
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
