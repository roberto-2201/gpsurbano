import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unidades',
  templateUrl: './unidades.component.html',
  styleUrls: ['./unidades.component.css']
})
export class UnidadesComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  mapaTunas(){
   this.router.navigate(['/mapa/TUNAS']);
   }

   mapaMetro(){
    this.router.navigate(['/mapa/METRO']);
    }
   

}
