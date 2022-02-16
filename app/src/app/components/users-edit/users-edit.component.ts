import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';




@Component({
  selector: 'app-users-edit',
  templateUrl: './users-edit.component.html',
  styleUrls: ['./users-edit.component.css']
})
export class UsersEditComponent implements OnInit {
  rol: string = '1';
  user: any;
  user_id = "";
  respuesta:any;
  emailPattern ="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$";
  // passPattern ="^(?=/\w*/\d)(?=/\w*[A-Z])(?=/\w*[a-z])\S{6,16}$"
  erroru = false;
  errorc = false;
  password="";
  userForm: FormGroup = this.formBuilder.group({
    nickname: ['',[ Validators.required, Validators.pattern("^[a-z0-9]{1,50}?$")]],
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    //password: ['', [ Validators.required, Validators.pattern("^[a-zA-Z0-9@#$]{6,25}?$")]],
    email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
    rol: ['', Validators.required],
    descripcion: ['']
  });
  constructor(private formBuilder: FormBuilder, public service: UsersService, private router: Router, private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this.user_id = this._route.snapshot.paramMap.get('user_id')!;
  this.errorc = false;
  this.erroru = false;
  this.service.acceder(this.user_id).subscribe(
    (usuario: any) => {
      if (usuario.data.rol=='0'){
        this.userForm.patchValue({rol:'0'});
      }else{
        this.userForm.patchValue({rol:'1'});
      }
      this.userForm.patchValue(
        {
          nickname: usuario.data.nickname,
          nombre: usuario.data.nombre,
          apellido: usuario.data.apellido,
          descripcion: usuario.data.user_descripcion,
          email: usuario.data.email,   
          //password: usuario.password, //ME LLEGA EL TOKEN..CAMBIARLO PARA QUE ME LLEGUE BIEN
              
        }
        
      );
      this.password=usuario.data.password;
      
    }
  );
}

onSubmit(): void {
  this.errorc = false;
  this.service.clearFormData();
  this.service.formData = {
    nickname: this.userForm.value.nickname,
    nombre: this.userForm.value.nombre,
    apellido: this.userForm.value.apellido,
    password: this.password,//la variable
    email: this.userForm.value.email,
    user_foto: "img/profile.png",
    active: true,
    token: "",
    rol: this.userForm.value.rol,
    user_descripcion: this.userForm.value.descripcion,
  };
  this.updateRecord();
}

updateRecord() {
  this.service.editUser(this.service.formData,this.user_id).subscribe(
    res => {
      this.respuesta=res;
      
      console.log(this.respuesta)
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

    },
    (err: HttpErrorResponse) => {

      var MensajeError = err.error.message;
      console.log(MensajeError);
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


