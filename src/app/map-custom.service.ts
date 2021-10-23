import { Injectable, EventEmitter } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { environment } from "../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Socket } from "ngx-socket-io";

@Injectable({
  providedIn: 'root'
})
export class MapCustomService {
  cbAddress: EventEmitter<any> = new EventEmitter<any>();
  mostrar = '';

  mapbox = (mapboxgl as typeof mapboxgl);
  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';
  lat = 14.2917827;
  lng = -89.9047073;
  zoom = 13;
  wayPoints: Array<any> = [];
  markerDriver: any = null;
  markerDriver2: any = null;
  markerDriver3: any = null;

  rutaTunas: any[] = [
    [-89.9086118168615, 14.298401974950975],
    [-89.90862500810596, 14.298371192484177],
    [-89.90858209276615, 14.298334804780056],
    [-89.90848016883412, 14.298230839878695],
    [-89.9084587111642, 14.298142469674731],
    [-89.90838360931369, 14.298064495936504],
    [-89.90832460071687, 14.298002116926453],
    [-89.90829777862739, 14.297908548378922],
    [-89.90822804119477, 14.297825376303969],
    [-89.90817976143374, 14.29775260071315],
    [-89.90811538841903, 14.297674626839711],
    [-89.90808856632957, 14.29761224772147],
    [-89.90804028656851, 14.297539472061668],
    [-89.90798664238957, 14.297440705057099],
    [-89.9079598203001, 14.297378325873975],
    [-89.907856159429, 14.29720564163092],
    [-89.90784340062115, 14.297146914336688],
    [-89.90780831389955, 14.297066550645999],
    [-89.90776365807207, 14.296961459622537],
    [-89.90772538164849, 14.29688109586558],
    [-89.90766796701315, 14.296720368265483],
    [-89.90762650088763, 14.296621458915988],
    [-89.90752443042062, 14.296368003496145],
    [-89.90745106727547, 14.29621654829969],
    [-89.90737770413031, 14.296049638373189],
    [-89.90732028949421, 14.29587036460812],
    [-89.90725011605102, 14.295712727215856],
    [-89.90716399409017, 14.29554272597043],
    [-89.90703321630966, 14.295199632181143],
    [-89.90696623256842, 14.295119267794474],
    [-89.90681312686118, 14.29492762951563],
    [-89.90671743580226, 14.294810173721794],
    [-89.90659941682964, 14.294705081643738],
    [-89.90645906994324, 14.29458762573366],
    [-89.90645588024127, 14.29458144384195],
    [-89.90633148186471, 14.294473260709639],
    [-89.90626130842152, 14.29443616933801],
    [-89.90617837617047, 14.294392896063373],
    [-89.90607750440208, 14.294344530337776],
    [-89.90602819259057, 14.294271014751317],
    [-89.90592577575131, 14.294153389762993],
    [-89.90591439610249, 14.294138686635131],
    [-89.90589163680488, 14.294057819414673],
    [-89.90585370464218, 14.293984303734492],
    [-89.90576000915645, 14.293874846137873],
    [-89.90560212696427, 14.293883588680378],
    [-89.90541266833365, 14.293844247236407],
    [-89.90520065510415, 14.29383987596443],
    [-89.90502472923288, 14.293791791967088],
    [-89.90483075968248, 14.293796163239996],
    [-89.90464130105185, 14.293756821780732],
    [-89.90434358034662, 14.293730594137402],
    [-89.90415863263576, 14.2937174803146],
    [-89.90389699928872, 14.293678138841571],
    [-89.9038834665294, 14.293691252666678],
    [-89.90361732222675, 14.293638797359943],
    [-89.90323389404574, 14.293608198426364],
    [-89.9032413231136, 14.293630996931894],
    [-89.9029409157056, 14.293605005167315],
    [-89.90298383104961, 14.293594608460634],
    [-89.90266196596961, 14.293589410107128],
    [-89.90246884692162, 14.293594608460634],
    [-89.9022971855456, 14.293630996931894],
    [-89.90201823580962, 14.293693377154627],
    [-89.90194313395763, 14.293729765609882],
    [-89.90150825362261, 14.293379417225474],
    [-89.90115420203463, 14.293202672969384],
    [-89.89992575031263, 14.292495694555965],
    [-89.89962534290464, 14.292318949605368],
    [-89.89905135017865, 14.292027839972178],
    [-89.89870802742666, 14.291840697866151],
    [-89.89781216961615, 14.291284469013476],
    [-89.89862756115213, 14.291773118726788],
    [-89.89759222847816, 14.291149310394697],
    [-89.89734010083217, 14.291040143758696],
    [-89.8971147952723, 14.290868596070132],
    [-89.89695897923134, 14.290412413751058],
    [-89.89662517116126, 14.289538144325105],
    [-89.89632293953022, 14.28898298147575],
    [-89.89646728896626, 14.289135979231913],
    [-89.89631391769082, 14.288978610093064],
    [-89.89592146766248, 14.288532730268457],
    [-89.89579065098636, 14.288405960353046],
    [-89.89625527573256, 14.288917410953765],
    [-89.89610190445713, 14.28872069932187],
    [-89.89590342398301, 14.288497759264445],
    [-89.89575005270757, 14.28835787519404],
    [-89.89573200902808, 14.28822673379905],
    [-89.89570043258902, 14.288148048925347],
    [-89.8955876595924, 14.288078106792298],
    [-89.89537113543882, 14.288043135717627],
    [-89.89568689982944, 14.288148048925347],
    [-89.89563727971091, 14.288104335094753],
    [-89.89555608315332, 14.288104335094753],
    [-89.89546135383613, 14.288056249871271],
    [-89.8953846681984, 14.288034392948106],
    [-89.89530347164083, 14.288025650178241],
    [-89.89510619835393, 14.288032595023697],
    [-89.89482929356075, 14.2880068638491],
    [-89.89424513824366, 14.28795907737419],
    [-89.89383167766205, 14.287940697958055],
    [-89.89333476632089, 14.287925994424075],
    [-89.89276199065282, 14.287881883816345],
    [-89.89183265263931, 14.287845124967827],
    [-89.89135470737986, 14.287837773197829],
    [-89.89126400947981, 14.28778896070884],
    [-89.89127742052482, 14.287704485268991],
    [-89.8913029015103, 14.287578421861284],
    [-89.8913082659283, 14.287470553116153],
    [-89.8913189947643, 14.287444560639715],
    [-89.8913189947643, 14.287369182441063],
    [-89.8913257002868, 14.28732889408314],
    [-89.89112565843307, 14.287314763386867],
    [-89.8900232705341, 14.28719779713826],
    [-89.88918642132612, 14.28711981960539],
    [-89.88904694645811, 14.287127617359891],
    [-89.88904380458361, 14.286994637068396],
    [-89.88907599109162, 14.28693485424165],
    [-89.88916986840661, 14.286690524262804],
    [-89.8892074193326, 14.286602149524263],
    [-89.88927983897561, 14.286511175492471],
    [-89.88928788560261, 14.286389010306179],
    [-89.88928861110094, 14.286327189128231],
    [-89.88927904199484, 14.286296278532891],
    [-89.8890940392761, 14.286191182464202],
    [-89.88873360294708, 14.285906804655038],
    [-89.88864748099238, 14.285795526284058],
    [-89.88862196337617, 14.285795526284058],
    [-89.88859325605792, 14.285733704943063],
    [-89.88852308261332, 14.28565024610579],
    [-89.88840506363834, 14.285495692621671],
    [-89.88832060626032, 14.285399077109178],
    [-89.88820783326368, 14.285261376831627],
    [-89.88811310394648, 14.285132419352422],
    [-89.88804995106835, 14.285066847724496],
    [-89.88799356457002, 14.28497504741327],
    [-89.88799356457002, 14.28497504741327],
    [-89.88703325856797, 14.28416621840972],
    [-89.88382439025878, 14.282512969877835],
    [-89.88202904415209, 14.281699870877093],
    [-89.88137044985163, 14.281420094197616],
    [-89.88101859810207, 14.281315177853156],
    [-89.88891612899874, 14.28730396112276],
    [-89.88887321365476, 14.28748590850848],
    [-89.88883029831074, 14.287566485160866],
    [-89.88880884063875, 14.28764446253892],
    [-89.88876056087678, 14.287769226287544],
    [-89.88873910320477, 14.28792258163384],
    [-89.88870155227877, 14.288083734596958],
    [-89.88877466182514, 14.2881715200559],
    [-89.88979926566311, 14.288254695701179],
    [-89.89092579344879, 14.288259894179044],
    [-89.89175727824161, 14.288301481990086],
    [-89.89183238009626, 14.288306680468372],
    [-89.89224007586617, 14.288337871321584],
    [-89.89264777163417, 14.288337871321584],
    [-89.89284089068526, 14.288384657593076],
    [-89.89309838274927, 14.28836906217094],
    [-89.89351144293524, 14.28845223774318],
    [-89.89370620439226, 14.288436582647783],
    [-89.89395204952496, 14.288493410542001],
    [-89.89399715872362, 14.288515267420575],
    [-89.89383200716227, 14.289242387460497],
    [-89.89375545431363, 14.289563853234762],
    [-89.89370122937918, 14.289857499454024],
    [-89.89465131780776, 14.290326177408152],
    [-89.89624818344036, 14.291025590770497],
    [-89.89716841110096, 14.291471465671044],
    [-89.89785407092633, 14.291873626585726],
    [-89.89835929395652, 14.292118419841836],
    [-89.89903593193644, 14.292529322181515],
    [-89.89988398487125, 14.293045134694157],
    [-89.90012757454403, 14.293158788139575],
    [-89.9003260550252, 14.293272441537514],
    [-89.90132747923546, 14.293805737437157],
    [-89.90143574131226, 14.293866935246388],
    [-89.90165226547468, 14.293831965081138],
    [-89.90189585514743, 14.293735797072765],
    [-89.90222966321753, 14.293648371574927],

  ];
  rutaMetroPlaza: any[] = [
    [-89.91156100715068, 14.293452242534368],
    [-89.90877328980372, 14.293936530328098],
    [-89.90571226705264, 14.29381545848184],
    [-89.90343211745235, 14.293573314593798],
    [-89.90192721246497, 14.293695439757098],
    [-89.9003590760765, 14.292796524642178],
    [-89.89735532186758, 14.291169907205965],
    [-89.89719627727585, 14.29093061805713],
    [-89.89699325025666, 14.2904311895964],
    [-89.8964466390511, 14.289296120789023],
    [-89.89589412056486, 14.288544726269976],
    [-89.89444547333426, 14.287964294393305],
    [-89.89422724762136, 14.287865305853023],
    [-89.89425629416134, 14.2876695164605],
    [-89.89428415275854, 14.287408546262844],
    [-89.89427486655948, 14.287332054940645],
    [-89.89419129076786, 14.287183571711555],
    [-89.89399163748789, 14.287084582837739],
    [-89.89399628059294, 14.28670662491395],
    [-89.89413209063936, 14.286149505099466],
    [-89.89430388273254, 14.28595275650539],
    [-89.89446005736269, 14.285843031253213],
    [-89.8948231633778, 14.285759791371024],
    [-89.8947491790193, 14.285625855594125],
    [-89.89482140869694, 14.284811353196188],
    [-89.89516942441658, 14.284105024511225],
    [-89.89550545763991, 14.28345988400547],
    [-89.8957981028474, 14.28293549341687],
    [-89.89619523829319, 14.282117364390949],
    [-89.89623534134306, 14.282010979676334],
    [-89.8965417905688, 14.28215277987323],
    [-89.89728444675539, 14.282420327168678],
    [-89.89807679742322, 14.282829673916389],
    [-89.89892943783121, 14.283167550353419],
    [-89.89928282070488, 14.283526062043501],
    [-89.89963620357528, 14.283999617652182],
    [-89.89950311877196, 14.283832347778047],
    [-89.89994885632723, 14.284264305151085],
    [-89.8997116290885, 14.285631342950106],
    [-89.89966519809317, 14.285748330551888],
    [-89.89882944017704, 14.286882207233063],
    [-89.8981597281962, 14.287309154513888],
    [-89.8966920652193, 14.288650683317702],
    [-89.89611781801173, 14.288313583011359],
    [-89.89659445815113, 14.288596780165276],
    [-89.89583768998342, 14.28814684178634],
    [-89.89463158564848, 14.287990953934864],
    [-89.89206822579155, 14.28785096301463],
    [-89.89198599762727, 14.288104768234597],
    [-89.89199704084123, 14.288275994009709],
    [-89.89212836763345, 14.288307810084607],
    [-89.89444628365285, 14.288676876113641],
    [-89.89549689714609, 14.289300469062754],
    [-89.89640813184519, 14.29016481192639],
    [-89.89690030039581, 14.290664248506936]
  ]




  constructor(private httpClient: HttpClient, private socket: Socket) {
    this.mapbox.accessToken = environment.mapPk;
  }

  buildMap(): Promise<any> {
    /**
     * TODO: Aqui construimos el mapa
     */
    return new Promise((resolve, reject) => {
      try {
        this.map = new mapboxgl.Map({
          container: 'map',
          style: this.style,
          zoom: this.zoom,
          center: [this.lng, this.lat]
        });

        // this.map.addControl(new mapboxgl.NavigationControl())

        /**
         *  TODO: Aqui construimos el input buscador de direcciones
         */
        const geocoder = new MapboxGeocoder({
          accessToken: mapboxgl.accessToken,
          mapboxgl
        });

        // *************
        geocoder.on('result', ($event) => {
          const { result } = $event;
          geocoder.clear();
          console.log('*********', result)
          this.cbAddress.emit(result);
        })

        resolve({
          map: this.map,
          geocoder
        });

      } catch (e) {
        reject(e);
      }
    });
  }

  loadCoords(coords, ruta): void {

    /*  const url = [
       `https://api.mapbox.com/directions/v5/mapbox/driving/`,
       `${coords[0][0]},${coords[0][1]};${coords[1][0]},${coords[1][1]}`,
       `?steps=true&geometries=geojson&access_token=${environment.mapPk}`,
     ].join('');
     //`,-89.8939141,14.2876664;-89.8829917,14.2811682`,
     this.httpClient.get(url).subscribe((res: any) => {
  */

    //const data = res.routes[0];
    const route1 = this.rutaTunas;
    const route2 = this.rutaMetroPlaza;
    const route = ruta === 'TUNAS' ? route1 : route2;

    console.log('RUTA', route);
    console.log('RUTA T', this.rutaTunas);


    this.map.addSource('route', {
      type: 'geojson',
      data: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: route
        }
      }
    });

    //pinta la ruta en el mapa
    this.map.addLayer({
      id: 'route',
      type: 'line',
      source: 'route',
      layout: {
        'line-join': 'round',
        'line-cap': 'round'
      },
      paint: {
        'line-color': 'red',
        'line-width': 8
      }
    });

    this.wayPoints = route;
    this.map.fitBounds([route[0], route[route.length - 1]], {
      padding: 70
    });

    this.socket.emit('find-driver', { points: route });

    //});


  }

  addMarkerCustom(coords, image): void {

    const el = document.createElement('div');
    el.className = image;
    if (image === 'marker') {

      if (!this.markerDriver) {
        this.markerDriver = new mapboxgl.Marker(el);
      } else {
        if(this.markerDriver2){
          this.markerDriver2.remove();
          console.log('METRO ELIMINADO');

        }
        this.markerDriver
          .setLngLat(coords)
          .addTo(this.map);
      }


    } else if (image === 'bus') {

      if (!this.markerDriver2) {
        this.markerDriver2 = new mapboxgl.Marker(el);
      } else {
        if(this.markerDriver){
          this.markerDriver.remove();
          console.log('TUNAS ELIMINADO');
          
        }
        this.markerDriver2
          .setLngLat(coords)
          .addTo(this.map);
      }

    } else if (image === 'bus2') {

      if (!this.markerDriver3) {
        this.markerDriver3 = new mapboxgl.Marker(el);
      } else {

        this.markerDriver3
          .setLngLat(coords)
          .addTo(this.map);
      }


    }

  }

  
}