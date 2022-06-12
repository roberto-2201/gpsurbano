import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UnidadesComponent } from './unidades/unidades.component';
import { MapaComponent } from './mapa/mapa.component';
import { HttpClientModule } from '@angular/common/http';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { LoginGuard } from './login.guard';
const config: SocketIoConfig = {url: 'http://18.116.58.150:3000/', options: {}}; // con esta direccion me conecto al socket io

@NgModule({
  declarations: [
    AppComponent,
    UnidadesComponent,
    MapaComponent,
    LoginComponent,
  ],
  imports: [
    HttpClientModule,
    SocketIoModule.forRoot(config),
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [LoginGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
