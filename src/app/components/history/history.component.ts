import { Component, OnInit } from '@angular/core';
import { AuthUserService } from 'src/app/sevices/auth-user.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  constructor(private authUserService: AuthUserService) { }

  ngOnInit(): void {
    this.authUserService.checkAccesToken();

  }
}

