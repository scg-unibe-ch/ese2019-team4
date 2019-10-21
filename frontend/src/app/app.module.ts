import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';

import {LoginComponent} from './login/login.component';
import {SideMenuComponent} from './side-menu/side-menu.component';
import {RegisterComponent} from './register/register.component';
import { AppRoutingModule } from './app-routing.module';
import { DatabaseComponent } from "./database/database.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SideMenuComponent,
    SideMenuComponent,
    RegisterComponent,
    DatabaseComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
  ],
  exports: [
    RegisterComponent,
    LoginComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
