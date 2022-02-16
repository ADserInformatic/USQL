import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { NewsService } from 'src/app/services/news.service';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-news-del',
  templateUrl: './news-del.component.html',
  styleUrls: ['./news-del.component.css']
})
export class NewsDelComponent implements OnInit {
  status='';
  estado=false;
  categories:any;
  categoriaactual:any;
  rol='';
  new_id = "";
  erroru = false;
  errorc = false;
  categoriaelegida:any;
  userForm: FormGroup = this.formBuilder.group({
    category:['',Validators.required],
    Title: ['', Validators.required],
    Subtitle: [''],
    report: ['', Validators.required],
    fotoport: ['', Validators.required],
    fotonot: ['', Validators.required],
    videonot: ['', Validators.required],
    portada: ['', Validators.required],
    hide: ['', Validators.required]
  });
  constructor(
    private formBuilder: FormBuilder, 
    public service: NewsService, 
    public servicecat: CategoriesService, 
    private _route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.userForm.reset();
    this.errorc = false;
    this.status = localStorage.getItem('resultado')!;
    if (parseInt(this.status)==1){  this.estado=true; }
    else{this.router.navigate(['/main']);}
    this.rol = localStorage.getItem('rol')!;
    if (parseInt(this.rol)==1){this.router.navigate(['/mainr']);}
    
    this.new_id = this._route.snapshot.paramMap.get('new_id')!;


    this.service.acceder(this.new_id).subscribe(
      (noticia: any) => {
        if (noticia.portada=='0'){
          this.userForm.patchValue({portada:'0'});
        }else{
          this.userForm.patchValue({portada:'1'});
        }
        if (noticia.hide=='0'){
          this.userForm.patchValue({hide:'0'});
        }else{
          this.userForm.patchValue({hide:'1'});
        }
        this.userForm.patchValue({Title: noticia.titulo});  
        this.userForm.patchValue({Subtitle: noticia.subtitulo}); 
        this.userForm.patchValue({report: noticia.descripcion}); 
        this.userForm.patchValue({fotoport: noticia.foto_portada}); 
        this.userForm.patchValue({fotonot: noticia.foto_noticia}); 
        this.userForm.patchValue({videonot: noticia.video_noticia}); 
        this.userForm.patchValue({category: noticia.id_categoria}); 
      }
    );
    this.servicecat.list().subscribe(
      (cat: any) => {
        this.categories=cat;
      }
    );

    this.userForm.get('category')?.disable();
    this.userForm.get('Title')?.disable();
    this.userForm.get('Subtitle')?.disable();
    this.userForm.get('report')?.disable();
    this.userForm.get('fotoport')?.disable();
    this.userForm.get('fotonot')?.disable();
    this.userForm.get('videonot')?.disable();
    this.userForm.get('portada')?.disable();
    this.userForm.get('hide')?.disable();
    
  }
  onSubmit(): void {
    this.errorc = false;
    this.service.clearFormData();
    // this.service.formData = {
    //   id_categoria : this.userForm.value.category,
    //   titulo  : this.userForm.value.Title,
    //   subtitulo : this.userForm.value.Subtitle,
    //   descripcion : this.userForm.value.report,
    //   foto_portada : this.userForm.value.fotoport,
    //   foto_noticia : this.userForm.value.fotonot,
    //   video_noticia : this.userForm.value.videonot,
    //   portada : this.userForm.value.portada,
    //   hide : this.userForm.value.hide,
    // };
    // this.categoriaelegida = await this.getCategoria(this.userForm.value.category);
    this.insertRecord();
  }

  


  insertRecord() {
    this.service.DeleteNew(this.new_id).subscribe(
      res => {
        //MOSTRAR UN MENSAJE QUE SE GUARDO CORRECTAMENTE
        this.router.navigate(['/newslist']);
        this.userForm.reset();
      },
      (err: HttpErrorResponse) => {

        var MensajeError = err.error.ModelState.Error;
        console.log(err);
       console.log(MensajeError);
         console.log('algo malio sal');
            this.userForm.reset();
        
        
        //this.router.navigate(['/usersadd']);
      }

    );
  }

}
