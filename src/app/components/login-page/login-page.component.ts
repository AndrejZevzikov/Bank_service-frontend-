import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/entities/customer';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  constructor(private router: Router) { }

  loginInfo: Customer = {}

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.loginInfo);
    this.router.navigate(["main"]);
  }

}
