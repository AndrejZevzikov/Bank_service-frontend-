import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CurrencyRate } from 'src/app/entities/currency-rate';
import { AuthUserService } from 'src/app/sevices/auth-user.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  constructor(private httpClient:HttpClient, private authUserService:AuthUserService) { }

  role:any;
  rates:CurrencyRate[]=[];
  apiUrl:string = "http://localhost:8080/";
  headers:HttpHeaders = new HttpHeaders({'Authorization': 'Bearer '+this.authUserService.getJwt()});

  


  ngOnInit(): void {

    this.role = this.authUserService.getRole();
    this.httpClient.get<CurrencyRate[]>(this.apiUrl + "currency_rates",{headers:this.headers}).subscribe(
      (result) => {
        this.rates = result;
       
      }
    );
  }

  onUpdateCurrencyRrates(){
    this.httpClient.get(this.apiUrl + "currency_rates/update",{headers:this.headers}).subscribe(
      (result) => {
        this.httpClient.get<CurrencyRate[]>(this.apiUrl + "currency_rates",{headers:this.headers}).subscribe(
          (result) => {
            this.rates = result;
          }
        );
      }
    );
  }
}
