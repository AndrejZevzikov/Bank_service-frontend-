import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Currency } from 'src/app/entities/currency';
import { AuthUserService } from 'src/app/sevices/auth-user.service';

@Component({
  selector: 'app-add-balance-modal',
  templateUrl: './add-balance-modal.component.html',
  styleUrls: ['./add-balance-modal.component.css']
})
export class AddBalanceModalComponent implements OnInit {

  constructor(private httpClient: HttpClient, public activeModal: NgbActiveModal, private authUserService:AuthUserService, private router:Router ) { }
  apiUrl: string = "http://localhost:8080/";
  currencies:Currency[]=[];
  selected:any;
  headers: HttpHeaders = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authUserService.getJwt()});
  errorMessage:string = "";


  ngOnInit(): void {
    this.httpClient.get<Currency[]>(this.apiUrl + "currency").subscribe(
      (result) => {
        this.currencies = result; 
        this.selected = this.currencies[0].id;
       
      }
    )
  }

  onSubmit(){
    this.httpClient.post<any>(this.apiUrl + "balance/add/" + this.selected,{}, { headers: this.headers }).subscribe(
      (result) => {
        this.activeModal.close();
        location.reload();
          },
          (error) =>{
            this.errorMessage = "this currency alreadyd exists"
          }
        );
      }
  }


