import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Balance } from 'src/app/entities/balance';
import { CurrencyRate } from 'src/app/entities/currency-rate';
import { AuthUserService } from 'src/app/sevices/auth-user.service';
import { AddBalanceModalComponent } from '../add-balance-modal/add-balance-modal.component';

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
  apiUrl: string = "http://localhost:8080/";
  headers: HttpHeaders = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authUserService.getJwt() });
  totalAmount:any;

  onAddNew(){
    const modalRef = this.modalService.open(AddBalanceModalComponent);
  }


  ngOnInit(): void {
    this.authUserService.checkAccesToken();

    this.role = this.authUserService.getRole();

    this.httpClient.get<CurrencyRate[]>(this.apiUrl + "currency_rates", { headers: this.headers }).subscribe(
      (result) => {
        this.rates = result;
      }
    );

    this.httpClient.get<Balance[]>(this.apiUrl + "balance", { headers: this.headers }).subscribe(
      (result) => {
        this.balances = result;
      }
    );

    this.httpClient.get<any>(this.apiUrl + "customer/total_balance", { headers: this.headers }).subscribe(
      (result) => {
        this.totalAmount = result;
      }
    );
  }

  onUpdateCurrencyRrates() {
    this.httpClient.get(this.apiUrl + "currency_rates/update", { headers: this.headers }).subscribe(
      (result) => {
        this.httpClient.get<CurrencyRate[]>(this.apiUrl + "currency_rates", { headers: this.headers }).subscribe(
          (result) => {
            this.rates = result;
          }
        );
      }
    );
  }
}
