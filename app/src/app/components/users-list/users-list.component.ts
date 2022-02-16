import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
  //providers: [UsersService]
})
export class UsersListComponent implements OnInit {
  user_id="";
  nickname="";
  mail='';
  rol=''
  ApeNom='';
  descripcion='';
  users:any;
  constructor(public service: UsersService, private router: Router) { }

  ngOnInit(): void {
    this.service.listar().subscribe(
      (usuario: any) => {
        this.users=usuario;
        this.users.reverse();
      }
    );
  }
}
                                                                                