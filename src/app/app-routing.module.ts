import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoanEditComponent } from './components/loan-edit/loan-edit.component';
import { LoansComponent } from './components/loans/loans.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { MakePaymentComponent } from './components/make-payment/make-payment.component';
import { PaymentFormComponent } from './components/payment-form/payment-form.component';
import { RecoveryComponent } from './components/recovery/recovery.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { UsersPageComponent } from './components/users-page/users-page.component';

const routes: Routes = [
  {path:"",component:HomePageComponent},
  {path:"main",component:MainPageComponent},
  {path:"login",component:LoginPageComponent},
  {path:"users",component:UsersPageComponent},
  {path:"make_payment",component:MakePaymentComponent},
  {path:"loans",component:LoansComponent},
  {path:"register",component:RegisterPageComponent},
  {path:"loan_edit/:id",component:LoanEditComponent},
  {path:"make_pay",component:PaymentFormComponent},
  {path:"recovery",component:RecoveryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
