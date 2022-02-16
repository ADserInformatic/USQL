import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Router } from '@angular/router'; 
import { MailerService } from 'src/app/services/mailer.service';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {CargarjvService} from '../../services/cargarjv.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  errorG=false; 
  noerror=false;
  esperar= false;
  general=true;
  cartel=false;
  status='';
  estado=false;
  respuesta:any;
  
  constructor(public service: MailerService,private router:Router,private cargaJS:CargarjvService) { 
    cargaJS.CargaScript(['mapa.js']);
  }

  
    ngOnInit(): void {
      this.status = localStorage.getItem('resultado')!;
      if (parseInt(this.status)==1){
        this.estado=true;
      }
      this.resetForm();
    }
  
    resetForm(form?: NgForm) {
      if (form != null)
        form.resetForm();
      //quitar los alerts ya que aparecen al vaciar todo
      this.errorG=false; 
      this.respuesta="";
      this.noerror=false;
      this.esperar= false;
      this.general=false;
      this.service.formData = {
        nombre: '',
        correo: '',
        consulta: '',
      };
    }
  
     onSubmit(form: NgForm) {
      this.errorG=false; 
      this.esperar = true;
      this.noerror = false; 
      this.insertRecord(form);

    }
  
    insertRecord(form : NgForm){
      this.service.EnviarContacto(this.service.formData).subscribe(
        res => {
          this.respuesta=res;
          if(this.respuesta.error==false)
              {this.noerror=true;
              this.esperar = false;}
          if(this.respuesta.error==true)
              {this.errorG=true;
              this.esperar = false;}
          //this.router.navigate(['/principal']);
        },
        (err:HttpErrorResponse) => {
                  
          var MensajeError=err.error.ModelState.Error;
          ;
          console.log(MensajeError);
          this.errorG=true;
          this.esperar = false;
          }
      )
  }
    corregido(){
      this.errorG=false; 
      this.esperar = false;
      this.noerror = false;
    }
  }