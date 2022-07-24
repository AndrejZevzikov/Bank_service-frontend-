import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomePageComponent } from './components/home-page/home-page.component';
import { HttpClientModule } from '@angular/common/http';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgMaterialModule } from './ng-material/ng-material.module';
import { ModalComponent } from './components/modal/modal.component';
import { UsersPageComponent } from './components/users-page/users-page.component';
import { MakePaymentComponent } from './components/make-payment/make-payment.component';
import { HistoryComponent } from './components/history/history.component';
import { LoansComponent } from './components/loans/loans.component';
import { SettingsComponent } from './components/settings/settings.component';
import { RecoveryComponent } from './components/recovery/recovery.component';
import { AddBalanceModalComponent } from './components/add-balance-modal/add-balance-modal.component';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    NavBarComponent,
    MainPageComponent,
    LoginPageComponent,
    RegisterPageComponent,
    ModalComponent,
    UsersPageComponent,
    MakePaymentComponent,
    HistoryComponent,
    LoansComponent,
    SettingsComponent,
    RecoveryComponent,
    AddBalanceModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule, 
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    NgMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
