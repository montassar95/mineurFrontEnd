import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BreadcrumbService } from 'src/app/shared/breadcrumb/breadcrumb.service';

@Component({
  selector: 'app-identite',
  templateUrl: './identite.component.html',
  styleUrls: ['./identite.component.css']
})
export class IdentiteComponent implements OnInit {

   constructor(  private breadcrumbService: BreadcrumbService,private router: Router) { 
    this.breadcrumbService.setItems([
      {label: 'الإستقبال', routerLink: ['/']},
      
      {label: 'ملف الطفل' },
      {label: 'الهوية' },
  ]);}

  ngOnInit(): void {
  }


  
}
