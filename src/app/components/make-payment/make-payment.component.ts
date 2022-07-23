import { Component, OnInit } from '@angular/core';
import { AuthUserService } from 'src/app/sevices/auth-user.service';

@Component({
  selector: 'app-make-payment',
  templateUrl: './make-payment.component.html',
  styleUrls: ['./make-payment.component.css']
})
export class MakePaymentComponent implements OnInit {

  constructor(private authUserService: AuthUserService) { }

  ngOnInit(): void {
    this.authUserService.checkAccesToken();

  }
}
