import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Customer } from 'src/app/entities/customer';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  apiUrl:string = "http://localhost:8080/customer";

  constructor(private httpClient:HttpClient,public activeModal: NgbActiveModal) { }

  customer:Customer = {email:""};
  modalReference:any;

  ngOnInit(): void {
  }
  onSubmit(){
    this.httpClient.get(this.apiUrl + "/forgot/email="+this.customer.email).subscribe(
      (result) => {
        //TODO prideti alerta
      }
    )
    this.activeModal.close();
  }
}
