import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';


@Component({
  selector: 'app-users-del',
  templateUrl: './users-del.component.html',
  styleUrls: ['./users-del.component.css']
})
export class UsersDelComponent implements OnInit {
  rol: string = '1';
  user: any;
  user_id = "";
  userForm: FormGroup = this.formBuilder.group({
    nickname: ['', Validators.required],
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    email: ['', Validators.required, Validators.pattern("/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/")],
    rol: ['', Validators.required],
    descripcion: ['']
  });
  constructor(private formBuilder: FormBuilder, public service: UsersService, private router: Router, private _route: ActivatedRoute) { }

  ngOnInit(): void {this.user_id = this._route.snapshot.paramMap.get('user_id')!;
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
        }
      );
      
    }
  );
  this.userForm.get('nickname')?.disable();
  this.userForm.get('nombre')?.disable();
  this.userForm.get('apellido')?.disable();
  this.userForm.get('email')?.disable();
  this.userForm.get('rol')?.disable();
  this.userForm.get('descripcion')?.disable();
}

onSubmit(): void {
  this.service.DeleteUser(this.user_id).subscribe(
    (res:any) => {
      //MOSTRAR UN MENSAJE QUE SE Borro CORRECTAMENTE
      this.router.navigate(['/userslist']);
      this.userForm.reset();
    },
    (err: HttpErrorResponse) => {

      var MensajeError = err;

      console.log(MensajeError);
      
    }
  );
}

}


