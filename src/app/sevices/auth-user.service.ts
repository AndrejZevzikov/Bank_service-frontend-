import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthUserService {

  constructor() { }

  public setRole(role:string){
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
}
