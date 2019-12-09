import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';


import {PostCardComponent} from './post-card/post-card.component';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';


/* provides all custom components
*  If you want to import them you have to add it to imports in the module you want to use it in.
*/
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule
  ],
  declarations: [
    PostCardComponent,
    RegisterComponent,
    LoginComponent
  ],
  exports: [PostCardComponent,
    RegisterComponent,
    LoginComponent
  ]
})
export class ComponentsModule{}
