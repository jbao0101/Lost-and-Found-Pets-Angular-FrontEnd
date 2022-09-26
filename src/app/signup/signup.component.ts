import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CorsOptions } from 'cors';
import { CorsRequest } from 'cors';
import { Express } from 'express'
import { stat } from 'fs';
declare var require: any;


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  onPetCreate(pet: {name: string, status: string, date: string, ownerFirstName: string, ownerLastName: string, contactNumber: string, contactEmail: string, lastLocationSeen: string, microchipID:string, imageUrl:string, description:string}){
    const petNameValue = (<HTMLInputElement>document.getElementById("petname")).value;
    const statusValue = (<HTMLInputElement>document.getElementById("status")).value;
    const dateValue = (<HTMLInputElement>document.getElementById("start")).value;
    const ownerFirstNameValue = (<HTMLInputElement>document.getElementById("firstname")).value;
    const ownerLastNameValue = (<HTMLInputElement>document.getElementById("lastname")).value;
    const contactNumberValue = (<HTMLInputElement>document.getElementById("contactnumber")).value;
    const contactEmail = (<HTMLInputElement>document.getElementById("contactemail")).value;
    const nearestLocValue = (<HTMLInputElement>document.getElementById("nearestloc")).value;
    const microchipIdValue = (<HTMLInputElement>document.getElementById("microchip_id")).value;
    const petPictureValue = (<HTMLInputElement>document.getElementById("pet_picture")).value;
    const petDescriptionValue = (<HTMLInputElement>document.getElementById("pet_description")).value;

    pet.name = petNameValue
    pet.status = statusValue
    pet.date = dateValue
    pet.ownerFirstName = ownerFirstNameValue
    pet.ownerLastName = ownerLastNameValue
    pet.contactNumber = contactNumberValue
    pet.contactEmail = contactEmail
    pet.lastLocationSeen = nearestLocValue
    pet.microchipID = microchipIdValue
    pet.imageUrl = petPictureValue
    pet.description = petDescriptionValue

    console.log(pet)
    this.http.post('http://localhost:8080/pet/add',pet)
    .subscribe((res) => {
      console.log(res);
    });
  }
}
