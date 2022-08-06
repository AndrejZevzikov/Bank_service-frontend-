import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Loan } from 'src/app/entities/loan';
import { AuthUserService } from 'src/app/sevices/auth-user.service';

@Component({
  selector: 'app-loan-edit',
  templateUrl: './loan-edit.component.html',
  styleUrls: ['./loan-edit.component.css']
})
export class LoanEditComponent implements OnInit {

  constructor(private httpClient: HttpClient, private router: Router, private route: ActivatedRoute, private authUserService: AuthUserService) { }

  apiLoanUrl: string = "http://localhost:8081/loans";
  headers: HttpHeaders = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authUserService.getJwt() });
  loan: Loan = {};
  types: any[] = [];
  statuses: any[] = [];

  ngOnInit(): void {
    this.authUserService.checkAccesToken("ADMIN");
    console.log(this.route.snapshot.paramMap.get('id'))
    this.httpClient.get<Loan>(this.apiLoanUrl + "/id/" + this.route.snapshot.paramMap.get('id'), { headers: this.headers }).subscribe(
      (result) => {
        this.loan = result;
        this.httpClient.get<any>(this.apiLoanUrl + "/types", { headers: this.headers }).subscribe(
          (result) => {
            this.types = result;

          }
        );
        this.httpClient.get<any>(this.apiLoanUrl + "/statuses", { headers: this.headers }).subscribe(
          (result) => {
            this.statuses = result;

          }
        );
      }
    )
  }

  onUpdate() {
    this.httpClient.put<Loan>(this.apiLoanUrl + "/edit",this.loan, { headers: this.headers }).subscribe(
      (result) => {
       this.router.navigate(["/loans"])

      }

    );
  }

}
