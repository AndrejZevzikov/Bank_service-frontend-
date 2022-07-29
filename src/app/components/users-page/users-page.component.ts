import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/entities/customer';
import { AuthUserService } from 'src/app/sevices/auth-user.service';

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
  searchField:any;

  ngOnInit(): void {
    this.authUserService.checkAccesToken("ADMIN");
    this.getAllUsers();
    
  }

  getAllUsers(){
    this.httpClient.get<Customer[]>(this.apiUrl + "/all", { headers: this.headers }).subscribe(
      (result) => {
        this.users = result;
      },
      (error) => {

      }
    );
  }

  onSearch(){
    console.log(this.searchField);
  }
}
