import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PostservicePage } from './postservice.page';
import {ComponentsModule} from '../../components/components.module';
import {Autosize} from '../../components/autosize';

const routes: Routes = [
  {
    path: '',
    component: PostservicePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule
  ],
  declarations: [PostservicePage, Autosize]
})
export class PostservicePageModule {}
