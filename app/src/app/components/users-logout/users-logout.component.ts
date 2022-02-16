import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-logout',
  templateUrl: './users-logout.component.html',
  styleUrls: ['./users-logout.component.css']
})

export class UsersLogoutComponent implements OnInit {
  status='';
  estado=false;
  token='';
  constructor(public service: UsersService, private router: Router) { }

  ngOnInit(): void {this.token = localStorage.getItem('user_id')!;
  this.status = localStorage.getItem('resultado')!;
    if (parseInt(this.status)==0){  this.estado=true; }else{this.estado=false; }
  
}

desloguearse(){
  //this.chaUser(this.token);
  localStorage.clear();
  this.router.navigate(['/principal']);
}
 chaUser(token:string){
  this.service.chau(token).subscribe(
    (res: any) => {
      if (res.resultado == 0) {
        localStorage.clear();
        localStorage.setItem('resultado', res.resultado);
        this.router.navigate(['/principal']);
      }
    }
  );
}
 


}
