import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { MainPageAdminComponent } from './components/main-page-admin/main-page-admin.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';

const routes: Routes = [
  {path:"",component:HomePageComponent},
  {path:"main",component:MainPageComponent},
  {path:"mainAdmin",component:MainPageAdminComponent},
  {path:"login",component:LoginPageComponent},
  {path:"register",component:RegisterPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
