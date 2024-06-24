import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from 'src/app/shared/breadcrumb/breadcrumb.service';

@Component({
  selector: 'app-attrape',
  templateUrl: './attrape.component.html',
  styleUrls: ['./attrape.component.css']
})
export class AttrapeComponent implements OnInit {

  constructor(  private breadcrumbService: BreadcrumbService) { 
    this.breadcrumbService.setItems([
      {label: 'الإستقبال', routerLink: ['/']},
      
      {label: 'ملف الطفل' },
      {label: '  إجراءات إلقاء القبض علي طفل فار' },
  ]);}
  ngOnInit(): void {
  }

}
