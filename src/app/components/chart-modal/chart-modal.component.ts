import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthUserService } from 'src/app/sevices/auth-user.service';

@Component({
  selector: 'app-chart-modal',
  templateUrl: './chart-modal.component.html',
  styleUrls: ['./chart-modal.component.css']
})
export class ChartModalComponent implements OnInit {

  constructor(private httpClient: HttpClient, public activeModal: NgbActiveModal, private authUserService: AuthUserService) { }
  apiUrl: string = "http://localhost:8080/";
  headers: HttpHeaders = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authUserService.getJwt()});



  chartOptions = {};

  ngOnInit(): void {
    this.httpClient.get<any>(this.apiUrl + "currency_rates/chart_rates", { headers: this.headers }).subscribe(
      (result) => {
       this.chartOptions = {
        animationEnabled: true,
        title: {
          text: "Currency Rates"
        },
        axisY: {
          title: "Rate"
        },
        toolTip: {
          shared: true
        },
        legend: {
          cursor: "pointer",
          itemclick: function (e: any) {
            if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
              e.dataSeries.visible = false;
            } else {
              e.dataSeries.visible = true;
            }
            e.chart.render();
          }
        },
        data: result 
      }
      }
    );
  }
}

