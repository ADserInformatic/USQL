import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  status='';
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.status = localStorage.getItem('resultado')!;
    if (parseInt(this.status)==1){
      this.router.navigate(['/mainr']);
    }
  }

}
