import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoryComponent } from './components/history/history.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoansComponent } from './components/loans/loans.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { MakePaymentComponent } from './components/make-payment/make-payment.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { SettingsComponent } from './components/settings/settings.component';
import { UsersPageComponent } from './components/users-page/users-page.component';

const routes: Routes = [
  {path:"",component:HomePageComponent},
  {path:"main",component:MainPageComponent},
  {path:"login",component:LoginPageComponent},
  {path:"users",component:UsersPageComponent},
  {path:"make_payment",component:MakePaymentComponent},
  {path:"history",component:HistoryComponent},
  {path:"loans",component:LoansComponent},
  {path:"settings",component:SettingsComponent},
  {path:"register",component:RegisterPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
