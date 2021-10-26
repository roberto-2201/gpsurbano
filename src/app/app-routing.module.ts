import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './login.guard';
import { LoginComponent } from './login/login.component';
import { MapaComponent } from './mapa/mapa.component';
import { UnidadesComponent } from './unidades/unidades.component';


const routes: Routes = [
  {  path: 'login', component: LoginComponent },
  {  path: 'unidades', component: UnidadesComponent, canActivate:[LoginGuard]},
  { path: 'mapa/:ruta', component: MapaComponent, canActivate:[LoginGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full'  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

  

})


export class AppRoutingModule { }
