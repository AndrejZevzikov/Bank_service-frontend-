import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Loan } from 'src/app/entities/loan';
import { AuthUserService } from 'src/app/sevices/auth-user.service';

@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.css']
})
export class LoansComponent implements OnInit {

  apiUrl: string = "http://localhost:8080/customer"

  constructor(private authUserService: AuthUserService, private httpClient: HttpClient) { }
  headers: HttpHeaders = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authUserService.getJwt() });
  loans: Loan[] = [];

  ngOnInit(): void {
    this.authUserService.checkAccesToken();
    this.getLoans();
  }

  onPrinterClick(loan: any) {
    console.log(loan);
  }

  getLoans() {
    this.httpClient.get<Loan[]>("http://localhost:8081/" + "loans", { headers: this.headers }).subscribe(
      (result) => {
        this.loans = result;
      }
    );
  }
}

