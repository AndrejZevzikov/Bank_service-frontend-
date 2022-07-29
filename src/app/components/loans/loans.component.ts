import { HttpClient, HttpEvent, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Loan } from 'src/app/entities/loan';
import { AuthUserService } from 'src/app/sevices/auth-user.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.css']
})
export class LoansComponent implements OnInit {

  apiUrl: string = "http://localhost:8080/customer";
  apiLoanUrl: string = "http://localhost:8081/loans";

  constructor(private authUserService: AuthUserService, private httpClient: HttpClient) { }
  headers: HttpHeaders = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authUserService.getJwt() });
  loans: Loan[] = [];

  ngOnInit(): void {
    this.authUserService.checkAccesToken();
    this.getLoans();
  }

  onPrinterClick(loan: any) {
    console.log(loan);

    this.httpClient.get(this.apiLoanUrl + "/pdf/" + loan, {
      headers: this.headers,
      reportProgress: true,
      observe: 'events',
      responseType: 'blob'
    }).subscribe(
      event =>{
        if(event.type == HttpEventType.Response){
          saveAs(new File([event.body!], "file", //event.headers.get('File-Name')!, 
                  {type: `${event.headers.get('Content-Type')};charset=utf-8`}));
        }
      }
    );
  }

  getLoans() {
    this.httpClient.get<Loan[]>(this.apiLoanUrl, { headers: this.headers }).subscribe(
      (result) => {
        this.loans = result;
      }
    );
  }
}

