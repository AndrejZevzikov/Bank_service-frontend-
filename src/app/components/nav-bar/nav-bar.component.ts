import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthUserService } from 'src/app/sevices/auth-user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private router:Router, private authUserService:AuthUserService) { }

  role:any;

  ngOnInit(): void {
    this.role = this.initRole();
  }

  initRole(){
    return this.authUserService.getRole();
  }

  onLogout(){
    this.authUserService.clearStorage();
    this.router.navigate(["/"]);
  }

}
