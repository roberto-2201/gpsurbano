import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapaComponent } from './mapa/mapa.component';
import { UnidadesComponent } from './unidades/unidades.component';

const routes: Routes = [
  {  path: 'unidades', component: UnidadesComponent },
  { path: 'mapa', component: MapaComponent },
  { path: '', redirectTo: '/unidades', pathMatch: 'full'  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
