import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';


@Component({
  selector: 'app-users-add',
  templateUrl: './users-add.component.html',
  styleUrls: ['./users-add.component.css']
})

export class UsersAddComponent implements OnInit {
  status='';
  rol='';
  estado=false;
  emailPattern ="^[a-zA-Z0-9!#$%&'*_+-]([\.]?[a-zA-Z0-9!#$%&'*_+-])+@[a-zA-Z0-9]([^@&%$\/()=?¿!.,:;]|\d)+[a-zA-Z0-9][\.][a-zA-Z]{2,4}([\.][a-zA-Z]{2})?$";
  passPattern ="^(?=/\w*/\d)(?=/\w*[A-Z])(?=/\w*[a-z])\S{6,16}$"
  erroru = false;
  errorc = false;
  respuesta:any;
  userForm: FormGroup = this.formBuilder.group({
    nickname: ['',[ Validators.required, Validators.pattern("^[a-z0-9]{1,50}?$")]],
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    password: ['', [ Validators.required, Validators.pattern("^[a-zA-Z0-9@#$]{6,25}?$")]],
    email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
    rol: ['', Validators.required],
    descripcion: ['']
  });
  constructor(private formBuilder: FormBuilder, public service: UsersService, private router: Router) { }

  ngOnInit(): void {
    this.userForm.reset();
    this.userForm.patchValue({rol:'1'});
    this.errorc = false;
    this.erroru = false;
    this.status = localStorage.getItem('resultado')!;
    if (parseInt(this.status)==1){
      this.estado=true;
    }
  }
  onSubmit(): void {
    this.errorc = false;
    this.service.clearFormData();
    this.service.formData = {
      nickname: this.userForm.value.nickname,
      nombre: this.userForm.value.nombre,
      apellido: this.userForm.value.apellido,
      password: this.userForm.value.password,
      email: this.userForm.value.email,
      user_foto: "./../../../assets/img/profile.png",
      active: true,
      token: "sin",
      rol: this.userForm.value.rol,
      user_descripcion: this.userForm.value.descripcion,
    };
    this.insertRecord();
  }

  insertRecord() {
    this.service.postUser(this.service.formData).subscribe(
      res => {
        //MOSTRAR UN MENSAJE QUE SE GUARDO CORRECTAMENTE
        
        this.respuesta=res;
        if (this.respuesta.error == true) {
          if(this.respuesta.mensaje=="EMAIL REGISTRADO"){
            this.errorc = true;}
          if(this.respuesta.mensaje=="NICKNAME REGISTRADO"){
              this.erroru = true;}                 
        }
        else{
          this.rol = localStorage.getItem('rol')!;
        this.router.navigate(['/userslist']);
        this.userForm.reset();}
        
        
        // if (parseInt(this.status)==0){
        //   this.router.navigate(['/panela']);
        // }else{
        //   if (parseInt(this.rol)==1){
        //     this.router.navigate(['/main']);
        //   }
        // }
       
      },
      (err: HttpErrorResponse) => {

        var MensajeError = err.error.ModelState.toString();
        //console.log(err);
       console.log('MensajeError');
        if (MensajeError == "EL MAIL YA SE ENCUENTRA EN LA BASE DE DATOS") {
          this.errorc = true;
          this.userForm.reset();
        }
        else {
          if (MensajeError == "EL NICKNAME YA SE ENCUENTRA EN LA BASE DE DATOS") {
            this.erroru = true;
            this.userForm.reset();
          } else {
            console.log('algo malio sal');
            this.userForm.reset();
          }
        }
        this.router.navigate(['/usersadd']);
      }
    );
  }

}
