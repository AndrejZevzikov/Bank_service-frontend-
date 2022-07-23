import { HttpClient, HttpHeaders, HttpParams, HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/entities/customer';
import { AuthUserService } from 'src/app/sevices/auth-user.service';
import { Observable, throwError } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  constructor(private router: Router, private httpClient: HttpClient, private authUserService: AuthUserService, private modalService: NgbModal) { }

  customer: Customer = {}
  apiUrl: string = "http://localhost:8080/customer"
  alert:any = '';

  ngOnInit(): void {
    
    this.httpClient.get(this.apiUrl + "/valid", { headers: new HttpHeaders({'Authorization': 'Bearer '+this.authUserService.getJwt()}), observe:"response" }).subscribe(
      (resp) => {
        if(resp.ok){
          this.router.navigate(["main"]);
        }
      })
      this.setTimeBreak();
      this.setAlertTofalse();
  
  }

  openModal() {
    const modalRef = this.modalService.open(ModalComponent);
  }

  onLogin() {

    this.httpClient.get(this.apiUrl + "/login?" + this.addParams(), { observe: 'response' }).subscribe(
      
      (result) => {
        console.log(result.headers)
        let token = result.headers.get("access_token");
        if (token != undefined) {
          this.authUserService.setJwt(token);
          this.httpClient.get<Customer>(this.apiUrl + "/userWithToken", { headers: new HttpHeaders({ 'access_token': '' + this.authUserService.getJwt() }) }).subscribe(
            (resp) => {
              if (resp.authority && resp.username) {
                this.authUserService.setRole(resp.authority);
                this.authUserService.setUsername(resp.username);
                console.log(this.authUserService.getRole())

                this.router.navigate(["main"]);

              }
            }
          )
        }
      },
      error => {
        alert("Credentials are wrong.")
      }
    )
  }

  addParams() {
    let params = new HttpParams();

    if (this.customer.username && this.customer.password) {
      params = params.append('username', this.customer.username);
      params = params.append('password', this.customer.password);
      return params;
    }
    return params;
  }

  setTimeBreak(){
    setTimeout(() => {
      if(localStorage.getItem("alert") != null){
      this.alert = localStorage.getItem("alert");
      }
    },500)
  
  }
  setAlertTofalse() {
    setTimeout(() => {
      this.alert = ""
      localStorage.removeItem("alert")
    }, 3000)
  }

}
