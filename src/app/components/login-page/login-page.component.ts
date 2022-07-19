import { HttpClient, HttpParams } from '@angular/common/http';
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

  constructor(private router: Router, private httpClient: HttpClient, private authUserService: AuthUserService,private modalService: NgbModal) { }

  customer: Customer = {}
  apiUrl: string = "http://localhost:8080/customer"

  ngOnInit(): void {
  }
 
  openModal() {
    const modalRef = this.modalService.open(ModalComponent);
  }

  onSubmit() {

    this.httpClient.get(this.apiUrl + "/login?" + this.addParams(), { observe: 'response' }).subscribe(
      (result) => {
        console.log(result.headers)
        let token = result.headers.get("access_token");
        if (token !=undefined) {
          this.authUserService.setJwt(token);
          this.httpClient.get<Customer>(this.apiUrl + "/username=" + this.customer.username).subscribe(
            (resp) => {
              if(resp.authority && resp.username){
              this.authUserService.setRole(resp.authority);
              this.authUserService.setUsername(resp.username);
              }
            }
          )
        }
        this.router.navigate(["main"]);
      },
      error =>{
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

}
