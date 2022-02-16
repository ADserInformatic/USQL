import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class CargarjvService {

  constructor() { }
  CargaScript(archivos: string[])
{
  for (let archivo of archivos)
  {
    let script = document.createElement("script");
    script.src = "./assets/ScriptsJS/" + archivo ;
    //script.src = "./../../assets/ScriptsJS" + archivo ;
    let body = document.getElementsByTagName("body")[0];
    body.appendChild(script);
  }
}
}