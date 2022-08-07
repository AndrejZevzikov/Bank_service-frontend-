import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Balance } from 'src/app/entities/balance';
import { Currency } from 'src/app/entities/currency';
import { Transaction } from 'src/app/entities/transaction';
import { AuthUserService } from 'src/app/sevices/auth-user.service';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.css']
})
export class PaymentFormComponent implements OnInit {

  constructor(private httpClient: HttpClient, public activeModal: NgbActiveModal, private authUserService: AuthUserService, private router: Router) { }

  headers: HttpHeaders = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authUserService.getJwt() });
  apiUrl: string = "http://localhost:8080/";
  currencies: Currency[] = [];
  payment: Transaction = {};
  balances: Balance[] = [];
  firstBalance:any;
  alert = "";

  ngOnInit(): void {
    this.authUserService.checkAccesToken("CLIENT");

    this.httpClient.get<Balance[]>(this.apiUrl + "balance", { headers: this.headers }).subscribe(
      (result) => {
        this.balances = result;
        this.firstBalance = this.balances[0];
      }
    )
  }

  onPay(){
    this.payment.currencyCode = this.getCurrencyCodeByAccountNumber();
    this.httpClient.post<Transaction>(this.apiUrl + "transactions",this.payment,{headers: this.headers}).subscribe(
      (result) => {
      this.activeModal.close();
      location.reload();
      },
      (error) =>{ 
        this.alert = error.error;
      }
    )

  }

  getCurrencyCodeByAccountNumber():any{
    for (let index = 0; index < this.balances.length; index++) {
      if(this.balances[index].accountNumber == this.payment.payerAccountNumber){
        return this.balances[index].currencyCode;
      }
    }
  }
}
