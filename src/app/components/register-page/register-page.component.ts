import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/entities/customer';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  customer: Customer = {};
  apiUrl: string = "";

  constructor(private router: Router, private httpClient: HttpClient) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.httpClient.post<Customer>(this.apiUrl, this.customer).subscribe(
      (result) => {
        this.router.navigate(["/"])
      },
      (error) => {
        alert("Invalid info")
      }

    )


  }



}
