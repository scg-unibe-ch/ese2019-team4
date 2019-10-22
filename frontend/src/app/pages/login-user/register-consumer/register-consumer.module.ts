import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RegisterConsumerPage } from './register-consumer.page';

import { RegisterComponent } from "../../../register/register.component"


const routes: Routes = [
  {
    path: '',
    component: RegisterConsumerPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RegisterConsumerPage, RegisterComponent]
})
export class RegisterConsumerPageModule {}
