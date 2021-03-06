import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/entities/customer';
import { HomePageComponent } from '../home-page/home-page.component';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  customer: Customer = {};
  apiUrl: string = "http://localhost:8080/customer";

  constructor(private router: Router, private httpClient: HttpClient) { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.customer)
    this.httpClient.post<Customer>(this.apiUrl + "/save", this.customer).subscribe(
      (result) => {
        localStorage.setItem("alert","show");
        this.router.navigate(["/"])
      },
      (error) => {
        alert("Invalid data");
      }
    );
  }
}

