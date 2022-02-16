import { PrincipalService } from './../../services/principal.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-autor',
  templateUrl: './autor.component.html',
  styleUrls: ['./autor.component.css']
})
export class AutorComponent implements OnInit {
autores:any;
autor={
  urlautor:"",
  textautor:"",
  urlwwa:"",
  textwwa:"",
}

  constructor(public service:PrincipalService) { }

  ngOnInit(): void {

    this.service.Getmain().subscribe(
      (res:any)=>{
        this.autores=res
        this.autor.textautor=this.autores.textautor;
        this.autor.urlautor=this.autores.urlautor;
        this.autor.urlwwa=this.autores.urlwwa;
        this.autor.textwwa=this.autores.textwwa;

      }
    )
  }

}
