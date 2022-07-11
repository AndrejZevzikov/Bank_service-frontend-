import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor() { }

  scrollToTop(){
    document.getElementById("mainPicture")?.scrollIntoView({behavior:'smooth'})
  }

  ngOnInit(): void {
  }

}
