import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthUserService {

  constructor() { }

  public setRole(role:string){
    localStorage.removeItem("role");
    localStorage.setItem("role",role);
  }
  public getRole(){
    return localStorage.getItem("role");
  }
  
  public setJwt(jwt:string){
    localStorage.setItem("jwt",jwt);
  }
  public getJwt(){
    return localStorage.getItem("jwt");
  }
  public setUsername(username:string){
    localStorage.setItem("username",username);
  }
  public getUsername(){
    return localStorage.getItem("username");
  }

  public clearStorage(){
    localStorage.clear();
  }
}
