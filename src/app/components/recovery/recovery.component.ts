import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthUserService } from 'src/app/sevices/auth-user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.css']
})
export class RecoveryComponent implements OnInit {

  constructor(private httpClient: HttpClient, private authUserService: AuthUserService, private route: ActivatedRoute, private router:Router) { }
  apiUrl = "http://localhost:8080"

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      let recoverypath = params['link'];
      console.log("http://localhost:8080"+ "/customer/recovery/" + recoverypath)
      this.httpClient.get(this.apiUrl + "/customer/recovery/" + recoverypath).subscribe(
        (result) => {
          
        }
      )
     
    });
    this.router.navigate(["/login"])
  }
}
