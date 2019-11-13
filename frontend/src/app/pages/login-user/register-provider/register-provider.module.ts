import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RegisterProviderPage } from './register-provider.page';

import { RegisterModule } from "../../../register/register.module"

const routes: Routes = [
  {
    path: '',
    component: RegisterProviderPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    RegisterModule
  ],
  declarations: [RegisterProviderPage]
})
export class RegisterProviderPageModule {}
