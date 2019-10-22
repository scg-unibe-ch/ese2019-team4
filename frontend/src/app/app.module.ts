import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';

import {SideMenuComponent} from './side-menu/side-menu.component';
import { AppRoutingModule } from './app-routing.module';
import { DatabaseComponent } from './database/database.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    SideMenuComponent,
    SideMenuComponent,
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
    RegisterComponent,
    {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
  ],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
