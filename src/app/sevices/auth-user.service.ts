import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthUserService {

  constructor(private httpClient: HttpClient, private router:Router) { }

  apiUrl: string = "http://localhost:8080/customer/valid"
  invalidAccesTokenMesage:string = "You dont have access, please sign in";

  public setRole(role: string) {
    localStorage.removeItem("role");
    localStorage.setItem("role", role);
  }
  public getRole() {
    return localStorage.getItem("role");
  }

  public setJwt(jwt: string) {
    localStorage.setItem("jwt", jwt);
  }
  public getJwt() {
    return localStorage.getItem("jwt");
  }
  public setUsername(username: string) {
    localStorage.setItem("username", username);
  }
  public getUsername() {
    return localStorage.getItem("username");
  }

  public clearStorage() {
    localStorage.clear();
  }

  public checkAccesToken() {
    this.httpClient.get(this.apiUrl, { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.getJwt() }), observe: 'response' }).subscribe(
      (resp) => {
      },
      (error) => {
        localStorage.removeItem("alert");
        localStorage.setItem("alert", this.invalidAccesTokenMesage);
        this.router.navigate(["login"])
      }
    )
  }
}
