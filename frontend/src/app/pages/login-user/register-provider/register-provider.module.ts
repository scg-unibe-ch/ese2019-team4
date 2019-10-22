import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RegisterProviderPage } from './register-provider.page';

import { RegisterComponent } from "../../../register/register.component"

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
    RouterModule.forChild(routes)
  ],
  declarations: [RegisterProviderPage, RegisterComponent]
})
export class RegisterProviderPageModule {}
