import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from 'src/app/shared/breadcrumb/breadcrumb.service';

@Component({
  selector: 'app-modifier-mutaion',
  templateUrl: './modifier-mutaion.component.html',
  styleUrls: ['./modifier-mutaion.component.css']
})
export class ModifierMutaionComponent implements OnInit {

  constructor(  private breadcrumbService: BreadcrumbService) { 
    this.breadcrumbService.setItems([
      {label: 'الإستقبال', routerLink: ['/']},
      
      {label: 'ملف الطفل' },
      {label: ' تحيين معطيات نقلة طفل' },
  ]);}

  ngOnInit(): void {
  }

}
