import { PrincipalService } from './../../../services/principal.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  main:any;
  userForm: FormGroup = this.formBuilder.group({
    fotowwa: ['', Validators.required],
    textwwa: ['', Validators.required],
    fotoautor: ['', Validators.required],
    textautor: ['', Validators.required],
  });
  constructor(private formBuilder: FormBuilder, public service: PrincipalService, private router: Router, private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this.service.Getmain().subscribe(
      (res:any)=>{
        this.main=res;
        console.log(res)
        this.userForm.patchValue(
          {
            fotowwa: this.main.urlwwa,
            textwwa: this.main.textwwa,
            fotoautor: this.main.urlautor,
            textautor: this.main.textautor
          }
      )
      },(err: HttpErrorResponse) => {

        this.userForm.patchValue(
          {
            fotowwa: "",
            textwwa: "",
            fotoautor: "",
            textautor: ""
          })
      }
    )
    this.userForm.patchValue({fotowwa: "a",fotoautor:"a"}) //linea a borrar

  }


onSubmit(): void {

  this.service.clearFormData();
  this.service.formData = {
    urlwwa: this.userForm.value.fotowwa,
    textwwa: this.userForm.value.textwwa,
    urlautor: this.userForm.value.fotoautor,
    textautor: this.userForm.value.textautor//la variable
  };

  this.service.Postmain(this.service.formData).subscribe(
    res=>{
      this.router.navigate(['/panela']);
    }

  )
}

 
}
 