import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { NgCircleProgressModule } from 'ng-circle-progress';
import { BLE } from '@ionic-native/ble/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    NgCircleProgressModule.forRoot({
          // set defaults here
    radius: 100,
    outerStrokeWidth: 16,
    innerStrokeWidth: 8,
    outerStrokeColor: "#78C000",
    innerStrokeColor: "#C7E596",
    animationDuration: 300,    
    animation: false,
    responsive: true,
    renderOnClick: false
    }),
    IonicModule.forRoot(),
    AppRoutingModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },BLE
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
