import { DatavComponent } from './../datav/datav.component';
import { CargarjvService } from './../../services/cargarjv.service';
import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, Input, Output  } from '@angular/core';
import { Router,NavigationEnd, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-navbar-reg',
  templateUrl: './navbar-reg.component.html',
  styleUrls: ['./navbar-reg.component.css']
})

export class NavbarRegComponent implements OnInit {
  // @ViewChild('datosDesdeElPadre', { static: false }) 
  // datosDesdeElPadre: DatavComponent;
  actual="";
  homer=false;
  policy=false;
  literacy=false;
  dvisuals=false;
  download=false;
  contact=false;
  panel=false;
  ruta:any;
  Username = '';
  imgperfil='./../../../assets/img/profile.png';
  status='';
  estado=false;
  rol='';
  recargardv=false;

  // cities:any;
  constructor(private router: Router, public cargaJS: CargarjvService,
    private _route: ActivatedRoute ) {cargaJS.CargaScript(['hamburguesa.js']) }

  ngOnInit(): void {
      // this.ruta=this._route;
      // if(this.ruta.component.name!="DownloadComponent"){;}



      this.Username = localStorage.getItem('nickname')!;
      this.imgperfil = localStorage.getItem('imgperfil')!;
      this.router.events.subscribe((evt) => {
        if (evt instanceof NavigationEnd) {
            this.router.navigated = false;
            window.scrollTo(0, 0);
        }
    });
    this.actual=this.router.url;
    switch(this.actual){
      case "/mainr": this.homer=true;break;
      case "/policy": this.policy=true;break;
      case "/literacy": this.literacy=true;break;
      case "/dvisuals": this.dvisuals=true;break;
      case "/download": this.download=true;break;
      case "/contact": this.contact=true;break;
      case "/panela": this.panel=true;break;
      case "/ppal": this.panel=true;break;
      case "/categoryadd": this.panel=true;break;
      case "/vategorieslist": this.panel=true;break;
      case "/newslist": this.panel=true;break;
      case "/usersadd": this.panel=true;break;
      case "/userslist": this.panel=true;break;
      case "/newsadd": this.panel=true;break;
      case "/pholist": this.panel=true;break;
      case "/phoadd": this.panel=true;break;
      case "/vidlist": this.panel=true;break;
      case "/vidadd": this.panel=true;break;
    }
    this.status = localStorage.getItem('resultado')!;
    if (parseInt(this.status)==1){  this.estado=true; }
    else{this.router.navigate(['/main']);}
    this.rol = localStorage.getItem('rol')!;
    this.Username=this.Username.toUpperCase();
  }
  recargar(){setTimeout(function(){ window.location.reload();},0.1);};
}
