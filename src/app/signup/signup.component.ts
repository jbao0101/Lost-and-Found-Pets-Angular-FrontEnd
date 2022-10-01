import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  onPetCreate(pet: {name: string, status: string, ownerFirstName: string, ownerLastName: string, contactNumber: string, contactEmail: string, microchipID:number,description:string}){
    console.log(pet)
    this.http.post('http://localhost:8080/pet/add',pet)
    .subscribe((res) => {
      console.log(res);
    });
  }
}
