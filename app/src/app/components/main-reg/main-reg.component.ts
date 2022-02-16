import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-main-reg',
  templateUrl: './main-reg.component.html',
  styleUrls: ['./main-reg.component.css']
})
export class MainRegComponent implements OnInit {
  status='';
  estado=false;
  rol='';
  divtableu:any;


  constructor(private router: Router) { }
  
  ngOnInit(): void {
    this.status = localStorage.getItem('resultado')!;
    if (parseInt(this.status)==1){  this.estado=true; }
    else{this.router.navigate(['/main']);}
    this.rol = localStorage.getItem('rol')!;
    //if (parseInt(this.rol)==0){}else{};
}
//  initViz() {
//   var containerDiv = document.getElementById("vizContainer"),
//       url = "http://public.tableau.com/views/RegionalSampleWorkbook/Storms",
//       options = {
//           hideTabs: true,
//           onFirstInteractive: function () {
//               console.log("Run this code when the viz has finished loading.");
//           }
//       };

  // var viz = new tableau.Viz(containerDiv, url, options);
  // Create a viz object and embed it in the container div.
// }

}
