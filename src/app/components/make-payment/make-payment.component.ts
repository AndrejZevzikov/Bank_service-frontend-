import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Transaction } from 'src/app/entities/transaction';
import { AuthUserService } from 'src/app/sevices/auth-user.service';
import { AddBalanceModalComponent } from '../add-balance-modal/add-balance-modal.component';
import { PaymentFormComponent } from '../payment-form/payment-form.component';

@Component({
  selector: 'app-make-payment',
  templateUrl: './make-payment.component.html',
  styleUrls: ['./make-payment.component.css']
})
export class MakePaymentComponent implements OnInit {

  constructor(private authUserService: AuthUserService, private httpClient: HttpClient, private router: Router, private modalService: NgbModal) { }
  transactions: Transaction[] = [];
  apiUrl: string = "http://localhost:8080/transactions";
  role: any;
  headers: HttpHeaders = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authUserService.getJwt() });

  ngOnInit(): void {
    this.authUserService.checkAccesToken();
    this.getTransactions();

  }

  getTransactions() {
    this.authUserService.checkAccesToken();
    this.role = this.authUserService.getRole();
    this.httpClient.get<Transaction[]>(this.apiUrl + "/all", { headers: this.headers }).subscribe(
      (result) => {
        this.transactions = result;
      }
    );
  }
  openPaymentModal() {
    const modalRef = this.modalService.open(PaymentFormComponent);
  }
}
