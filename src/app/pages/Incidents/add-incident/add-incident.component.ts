import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientService } from 'src/app/Services/http-client.service';

@Component({
  selector: 'app-add-incident',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-incident.component.html',
  styleUrl: './add-incident.component.scss'
})
export class AddIncidentComponent {
  form!: FormGroup

  constructor(public service: HttpClientService, private router: Router){}

  ngOnInit(): void {
    this.form = new FormGroup({
      description: new FormControl('', [Validators.required]),
      symptoms: new FormControl('', [Validators.required]),
      tenantId: new FormControl('', [Validators.required]),
      priorityId: new FormControl('', [Validators.required]),
      urgencyId: new FormControl('', [Validators.required]),
      cityId: new FormControl('', [Validators.required])
    });

    //TODO: Get by ID api call when query string param has Id.
  }

  creatIncident() {
    console.log(this.form.value);
    var url = "https://localhost:7073/Incident/Save";
    this.service.create(url, this.form.value).subscribe((data: any) => {
      console.log(data);      
      this.router.navigateByUrl("incidents-list");
    });        
  }
}
