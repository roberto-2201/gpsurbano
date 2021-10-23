import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MapCustomService } from '../map-custom.service';
import { Socket } from "ngx-socket-io";

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {
  @ViewChild('asGeoCoder') asGeoCoder: ElementRef;
  modeInput = 'start';
  wayPoints: WayPoints = { start: null, end: null };
  ruta = '';
  mostrarRuta={
    ruta:'',
    ico:''
  };
  constructor(private router: Router,
    private mapCustomService: MapCustomService,
    private renderer2: Renderer2,
    private socket: Socket,
    private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this.ruta = '';
    this.ruta = this._route.snapshot.paramMap.get('ruta');
    this.mostrarRuta
    if (this.ruta === 'TUNAS') {
      this.mostrarRuta.ruta='UNI1';
      this.mostrarRuta.ico='marker';
    }else if (this.ruta === 'METRO') {
      this.mostrarRuta.ruta='UNI2';
      this.mostrarRuta.ico='bus';
    }
    
    this.mapCustomService.buildMap()
      .then(({ geocoder, map }) => {
        // this.asGeoCoder
        this.renderer2.appendChild(this.asGeoCoder.nativeElement,
          geocoder.onAdd(map)
        );


        console.log('*** TODO BIEN *****');
      })
      .catch((err) => {
        console.log('******* ERROR ******', err);
      });

    this.mapCustomService.cbAddress.subscribe((getPoint) => {
      if (this.modeInput === 'start') {
        this.wayPoints.start = getPoint;
      }
      if (this.modeInput === 'end') {
        this.wayPoints.end = getPoint;
      }
    });


    //Recibe coord bus1
    this.socket.fromEvent(this.mostrarRuta.ruta)
      .subscribe((coords: string) => {

        const newCord = coords.split(',');
        const cors = [parseFloat(newCord[1]), parseFloat(newCord[0])];
        console.log('RUTA: ',this.mostrarRuta.ruta);

        this.mapCustomService.addMarkerCustom(cors, this.mostrarRuta.ico);

      });
   
  
    this.socket.fromEvent('message')
      .subscribe((ms) => {
        console.log('Message server: ', ms);

      });

  }

  drawRoute(): void {
    console.log('***** PUNTOS de ORIGEN y DESTINO', this.wayPoints)
    const coords = [
      [-89.8939141, 14.2876664],
      [-89.8829917, 14.2811682]
    ];
    console.log(coords);

    this.mapCustomService.loadCoords(coords, this.ruta);
  }

  changeMode(mode: string): void {
    this.modeInput = mode;
  }

  testMarker(): void {
    this.mapCustomService.addMarkerCustom([-8.628139488926513, 41.159082702543635], 'marker');
  }


  irUnidades() {
    this.router.navigate(['/unidades/']);
  }

}


export class WayPoints {
  start: any;
  end: any
}