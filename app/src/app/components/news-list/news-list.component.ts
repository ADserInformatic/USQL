import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService } from 'src/app/services/categories.service';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit {
  status='';
  estado=false;
  categorianombre:any;
  news:any;

  constructor(
    public service: NewsService,
    public serviceCat: CategoriesService, 
    private router: Router) { }

  ngOnInit(): void { this.status = localStorage.getItem('resultado')!;
  if (parseInt(this.status)==1){
    this.estado=true;
  }
  this.service.listar().subscribe(
    (noticia: any) => {
      this.news=noticia;
    }
    
  );
}
  // async getCategoria(id_categoria:any): Promise<any>{

  //      this.serviceCat.view(id_categoria).subscribe(
  //     (cat: any) => {
        
  //       this.categorianombre=cat;
  //     });
  //    return this.categorianombre.nombre;
  // }
  async borrarpdf(id:any){
    let identificador=id[0];
    await this.service.delPDF(identificador).subscribe(
      (res: any) => {
        setTimeout(function(){ window.location.reload();},0.1);
      })
      
  }

}
