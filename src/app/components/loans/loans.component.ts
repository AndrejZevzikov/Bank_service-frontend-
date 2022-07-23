import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthUserService } from 'src/app/sevices/auth-user.service';

@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.css']
})
export class LoansComponent implements OnInit {

  apiUrl: string = "http://localhost:8080/customer"

  constructor(private authUserService: AuthUserService) { }

  ngOnInit(): void {
    this.authUserService.checkAccesToken();

  }
}

