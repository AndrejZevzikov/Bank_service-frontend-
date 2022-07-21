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

  


  ngOnInit(): void {
    let headers:HttpHeaders = new HttpHeaders({'access_token': ''+this.authUserService.getJwt()});
    this.role = this.authUserService.getRole();
    this.httpClient.get<CurrencyRate[]>(this.apiUrl + "currency_rates",{headers:headers}).subscribe(
      (result) => {
        this.rates = result;
       
      }
    );
  }
}
