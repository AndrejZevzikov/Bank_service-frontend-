import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/entities/customer';
import { AuthUserService } from 'src/app/sevices/auth-user.service';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.css']
})
export class UsersPageComponent implements OnInit {

  constructor(private authUserService: AuthUserService, private httpClient: HttpClient) { }

  users: Customer[] = [];
  apiUrl = "http://localhost:8080/customer";
  headers: HttpHeaders = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authUserService.getJwt() });
  searchField: string = "";
  alert: string = "";


  ngOnInit(): void {
    this.authUserService.checkAccesToken("ADMIN");
    this.getAllUsers();
  }
  notDoneYet(){
    this.alert = "This Functionality still in development proccess";
    this.setAlertTofalse();
  }

  getAllUsers() {
    this.httpClient.get<Customer[]>(this.apiUrl + "/all", { headers: this.headers }).subscribe(
      (result) => {
        this.users = result;
      },
      (error) => {

      }
    );
  }


  setAlertTofalse() {
    setTimeout(() => {
      this.alert = ""
      localStorage.removeItem("alert")
    }, 3000)
  }

  onSearch() {
    if (this.searchField == "") {
      this.getAllUsers();
    } else {
      console.log(this.searchField);
      this.httpClient.get<Customer[]>(this.apiUrl + "/search/" + this.searchField, { headers: this.headers }).subscribe(
        (result) => {
          this.users = result;
        },
        (error) => {

        }
      );
    }
  }

  onDelete(id: any, role:any) {

    if (role == "ADMIN") {
      this.alert = "You can't delete Admin"
      this.setAlertTofalse();
    } else {

      this.httpClient.delete<Customer[]>(this.apiUrl + "/delete/" + id, { headers: this.headers }).subscribe(
        (result) => {
          this.users = result;
        },
        (error) => {

        }
      );
    }
  }
}
