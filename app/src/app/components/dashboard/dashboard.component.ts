import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  token='';
  tmp="";
  dir=0;
  constructor(public service: UsersService, private router: Router) { }

   ngOnInit(): void {
    //this.token = localStorage.getItem('token')!;
  // this.chaUser(this.token);
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
