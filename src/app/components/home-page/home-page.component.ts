import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { News } from 'src/app/entities/news';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(private httpClient: HttpClient, private router: Router) { }

  apiUrl = "http://localhost:8080"
  newsList: News[] = [];
  newsPerPage = 5;
  alert: any;


  scrollToTop() {
    document.getElementById("mainPicture")?.scrollIntoView({ behavior: 'smooth' })
  }



  onLoadMore() {
    this.newsPerPage = this.newsPerPage + 5;
    this.httpClient.get<News[]>(this.apiUrl + "/news/" + this.newsPerPage).subscribe(
      (result) => {
        this.newsList = result;
      }
    )
  }

  setAlertTofalse() {
    setTimeout(() => {
      this.alert = ""
      localStorage.removeItem("alert")
    }, 3000)
  }

  setTimeBreak(){
    setTimeout(() => {
      this.alert = localStorage.getItem("alert");
    },500)
  }


  ngOnInit(): void {
    this.httpClient.get<News[]>(this.apiUrl + "/news/5").subscribe(
      (result) => {
        this.newsList = result;
      }
    )
    this.newsPerPage = 5;
    this.setTimeBreak();
    this.setAlertTofalse();
  }
}
