import { Router, ActivatedRoute } from '@angular/router';

import { Location } from '@angular/common';
import { Component, OnInit,  } from '@angular/core';
import {CargarjvService} from '../../services/cargarjv.service';



// import { CiudadesService } from 'src/app/services/ciudades.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']

  
})



export class NavbarComponent implements OnInit {
  actual="";
  home=false;
  policy=false;
  literacy=false;
  dvisuals=false;
  download=false;
  contact=false;

  
  constructor(
    private cargaJS:CargarjvService,
    private router: Router,
    private act: ActivatedRoute
  ) { 
    cargaJS.CargaScript(['hamburguesa.js']);
  }
  ngOnInit(): void {
    this.actual=this.router.url;
    switch(this.actual){
      case "/main": this.home=true;break;
      case "/policy": this.policy=true;break;
      case "/literacy": this.literacy=true;break;
      case "/dvisuals": this.dvisuals=true;break;
      case "/download": this.download=true;break;
      case "/contact": this.contact=true;break;
    }
 
  }
  // ir(){this.router.navigateByUrl('/rec', { skipLocationChange: true });
  // this.router.navigate(["/literacy"]);}
  recargar(){setTimeout(function(){ window.location.reload();},0.1);};
}
