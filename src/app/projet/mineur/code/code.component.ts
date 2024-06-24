import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from 'src/app/shared/breadcrumb/breadcrumb.service';

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.css']
})
export class CodeComponent implements OnInit {
  codes: { nom: string; }[];

  constructor(  private breadcrumbService: BreadcrumbService) { 
    this.breadcrumbService.setItems([
      {label: 'الإستقبال', routerLink: ['/']},
      
      {label: 'الرموز' },
   
  ]);}
  ngOnInit(): void {
    this.codes = [
      {nom: 'رموز القضايا'},
      {nom: 'رموز القضايا'},
      {nom: 'رموز القضايا'},
      {nom: 'رموز القضايا'},
      {nom: 'رموز القضايا'},
      {nom: 'رموز القضايا'},
       ];
  }

}
