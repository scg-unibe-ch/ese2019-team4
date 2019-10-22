import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from "./register.component"
import { AppModule } from "../app.module"
import {FormsModule} from '@angular/forms';



@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    CommonModule,
    AppModule,
    FormsModule
  ],
  exports: [
  ]
})
export class RegisterModule { }
