import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http'

//Plugin para compartir 
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
//stsorage
import { IonicStorageModule } from '@ionic/storage-angular';
//platform
import { platform } from 'os';

@NgModule({
  declarations: [AppComponent],
  //BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule
  providers: [SocialSharing, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
  imports: [
    IonicStorageModule.forRoot(),
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    HttpClientModule
  ]
})
export class AppModule {}
