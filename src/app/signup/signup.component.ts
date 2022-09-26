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

  onPetCreate(pet: {name: string, status: string, ownerFirstName: string, ownerLastName: string, contactNumber: string, contactEmail: string, microchipID:string,description:string}){
    
    fetch("http://localhost:8080/pet/add", { method: 'POST', credentials: "include"})
    .then(res => res.json())
    .then(data => console.log(data))
    
    // const express = require("express")
    // const app = express()
    // const cors = require("cors")

    // app.use(
    //   cors({
    //     origin: "*",
    //     credentials: true,
    //   })
    // )

    //   app.get("/data", (req: any, res: { json: (arg0: { name: string; }) => void; }) => {
    //     res.json({ name: "Kyle"})
    //   })

    //   app.listen(8080)

    // console.log(pet)
    // this.http.post('http://localhost:8080/pet/add/pet.json',pet)
    // .subscribe((res) => {
    //   console.log(res);
    // });
  }
}
