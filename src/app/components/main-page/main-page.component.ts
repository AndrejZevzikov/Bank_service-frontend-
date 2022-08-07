import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Balance } from 'src/app/entities/balance';
import { CurrencyRate } from 'src/app/entities/currency-rate';
import { Loan } from 'src/app/entities/loan';
import { Transaction } from 'src/app/entities/transaction';
import { AuthUserService } from 'src/app/sevices/auth-user.service';
import { AddBalanceModalComponent } from '../add-balance-modal/add-balance-modal.component';
import {MatButtonModule} from '@angular/material/button';
import { PaymentFormComponent } from '../payment-form/payment-form.component';
import { ChartModalComponent } from '../chart-modal/chart-modal.component';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  constructor(private httpClient: HttpClient, private authUserService: AuthUserService, private modalService: NgbModal) { }

  role: any;
  rates: CurrencyRate[] = [];
  balances: Balance[] = [];
  transactions:Transaction[]=[];
  loans:Loan[] = [];
  apiUrl: string = "http://localhost:8080/";
  headers: HttpHeaders = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authUserService.getJwt()});
  totalAmount: any;

  onAddNew() {
    const modalRef = this.modalService.open(AddBalanceModalComponent);
  }


  ngOnInit(): void {
    this.authUserService.checkAccesToken();
    this.getLoans();
    this.role = this.authUserService.getRole();
    this.getCurrencyRates();
    this.getBalances();
    this.getTotalBalance();
    this.getTransactions();
    
  }

getLoans(){
  this.httpClient.get<Loan[]>("http://localhost:8081/" + "loans" , { headers: this.headers }).subscribe(
    (result) => {
     this.loans = result;
    }
  );
}




  getCurrencyRates() {
    this.httpClient.get<CurrencyRate[]>(this.apiUrl + "currency_rates", { headers: this.headers }).subscribe(
      (result) => {
        this.rates = result;
      }
    );
  }

  getBalances() {
    this.httpClient.get<Balance[]>(this.apiUrl + "balance", { headers: this.headers }).subscribe(
      (result) => {
        this.balances = result;
      }
    );
  }

  getTotalBalance() {
    this.httpClient.get<any>(this.apiUrl + "customer/total_balance", { headers: this.headers }).subscribe(
      (result) => {
        this.totalAmount = result;
      }
    );
  }

  getTransactions(){
    this.httpClient.get<Transaction[]>(this.apiUrl + "transactions", { headers: this.headers }).subscribe(
      (result) => {
        this.transactions = result;
      }
    );
  }

  onUpdateCurrencyRrates() {
    this.httpClient.get(this.apiUrl + "currency_rates/update", { headers: this.headers }).subscribe(
      (result) => {
        this.getCurrencyRates();
        this.getTotalBalance();
      }
    );
  }
  openPaymentModal() {
    const modalRef = this.modalService.open(PaymentFormComponent);
  }

  openChartModal() {
    const modalRef = this.modalService.open(ChartModalComponent);
  }
}

