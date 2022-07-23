import { Component, OnInit } from '@angular/core';
import { AuthUserService } from 'src/app/sevices/auth-user.service';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.css']
})
export class UsersPageComponent implements OnInit {

  constructor(private authUserService: AuthUserService) { }

  ngOnInit(): void {
    this.authUserService.checkAccesToken();

  }
}
