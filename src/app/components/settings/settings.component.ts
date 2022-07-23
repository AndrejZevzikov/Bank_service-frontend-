import { Component, OnInit } from '@angular/core';
import { AuthUserService } from 'src/app/sevices/auth-user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(private authUserService: AuthUserService) { }

  ngOnInit(): void {
    this.authUserService.checkAccesToken();

  }
}
