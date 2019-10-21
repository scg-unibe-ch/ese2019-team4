import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LoginUserPage } from './login-user.page';

import { LoginComponent } from '../../login/login.component';

const routes: Routes = [
  {
    path: '',
    component: LoginUserPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
  declarations: [LoginUserPage, LoginComponent]
})
export class LoginUserPageModule {}
