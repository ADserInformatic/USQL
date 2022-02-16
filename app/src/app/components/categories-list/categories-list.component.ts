import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService } from 'src/app/services/categories.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent implements OnInit {

  categories:any;
  constructor(public service: CategoriesService, private router: Router) { }

  ngOnInit(): void {
    this.service.list().subscribe(
      (category: any) => {
        // this.categories=JSON.parse(category);
        this.categories=category;
        this.categories.reverse();
      },(err: HttpErrorResponse) => {console.log(err)}
    );
  }

}
