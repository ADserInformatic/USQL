import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Router } from '@angular/router';
import { CategoriesService } from 'src/app/services/categories.service';


@Component({
  selector: 'app-categories-del',
  templateUrl: './categories-del.component.html',
  styleUrls: ['./categories-del.component.css']
})
export class CategoriesDelComponent implements OnInit {
  status='';
  estado=false;
  rol='';
  errorc = false;
  category: any;
  cat_id = "";
  errorcategoria=false;
respuesta:any;
  userForm: FormGroup = this.formBuilder.group({
    nombre:['',Validators.required],
    portada: ['', Validators.required],
    hide: ['', Validators.required]
  });
  constructor(private formBuilder: FormBuilder, public service: CategoriesService, private router: Router, private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this.userForm.reset();
    this.userForm.patchValue({portada:'1'});
    this.userForm.patchValue({hide:'1'});

    this.errorcategoria=false;
    this.errorc = false;

    this.status = localStorage.getItem('resultado')!;
    if (parseInt(this.status)==1){  this.estado=true; }
    else{this.router.navigate(['/main']);}
    this.rol = localStorage.getItem('rol')!;
    if (parseInt(this.rol)==1){this.router.navigate(['/mainr']);}

    this.cat_id = this._route.snapshot.paramMap.get('cat_id')!;
    this.service.view(this.cat_id).subscribe(
      (category: any) => {
        if (category.data.portada=='0'){
          this.userForm.patchValue({portada:'0'});
        }else{
          this.userForm.patchValue({portada:'1'});
        }
        if (category.data.hide=='0'){
          this.userForm.patchValue({hide:'0'});
        }else{
          this.userForm.patchValue({hide:'1'});
        }
        this.userForm.patchValue({nombre: category.data.nombre});        
      }
    );
    this.userForm.get('nombre')?.disable();
    this.userForm.get('portada')?.disable();
    this.userForm.get('hide')?.disable();






  }
  onSubmit(): void {
    this.errorc = false;
    this.errorcategoria=false;
    // this.service.clearFormData();
    // this.service.formData = {
    //   nombre : this.userForm.value.nombre,
    //   portada : this.userForm.value.portada,
    //   hide : this.userForm.value.hide,
    // };
    this.insertRecord();
  }

  insertRecord() {
    this.service.delCategory(this.cat_id).subscribe(
      res => {
        this.respuesta=res;
        if (this.respuesta.error == true) {
          
           this.errorcategoria = true;
        //MOSTRAR UN MENSAJE QUE SE GUARDO CORRECTAMENTE

              }else{ this.router.navigate(['/categorieslist']);
              this.userForm.reset();}
             
            },


      (err: HttpErrorResponse) => {
        console.log(err);
        var MensajeError = err.error.message;
        console.log(MensajeError);
       
        this.errorc = true;
      
        console.log('algo malio sal');
        this.userForm.reset();
      }
      

    );
  }

}