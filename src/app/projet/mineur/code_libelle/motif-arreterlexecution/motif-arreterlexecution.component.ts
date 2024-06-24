import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CrudEnfantService } from 'src/app/demo/service/crud-enfant.service';
import { MotifArreterlexecution } from 'src/app/domain/motifArreterlexecution';
import { BreadcrumbService } from 'src/app/shared/breadcrumb/breadcrumb.service';

@Component({
  selector: 'app-motif-arreterlexecution',
  templateUrl: './motif-arreterlexecution.component.html',
  styleUrls: ['./motif-arreterlexecution.component.css']
  ,providers: [MessageService]
})
export class MotifArreterlexecutionComponent implements OnInit {
  motifArreterlexecution: MotifArreterlexecution;
  display=false;
id;
nom;
  constructor(  private crudservice: CrudEnfantService,  private service: MessageService,
    private breadcrumbService: BreadcrumbService,private router: Router) { 
    this.breadcrumbService.setItems([
      {label: 'الإستقبال', routerLink: ['/']},
  
      {label: 'رموز التغيرات' },
      {label: 'أسباب السراح ( إيقاف تنفيذ )' },
  ]);}

  ngOnInit(): void {
    this.showAllMotifArreterlexecution();
  }
  motifArreterlexecutions : MotifArreterlexecution[]= [];

  showAllMotifArreterlexecution() {
      
        
    this.crudservice.getlistEntity("motifArreterlexecution")
    .subscribe( data => {
      if(data.result){
     
        this.motifArreterlexecutions= data.result;
        
     
       
      }
      else{
        
        this.motifArreterlexecutions= [];
        
     
      }
    
    });
  
  
}
addTyJu(){
  
  this.motifArreterlexecution= new MotifArreterlexecution();
  this.motifArreterlexecution.id=this.id;
  this.motifArreterlexecution.libelleMotifArretere=this.nom;
 
  

  this.crudservice.createLigne("motifArreterlexecution",   this.motifArreterlexecution)
  .subscribe(data => {
    if(data.result){
      console.log( data.result );
      this.showAllMotifArreterlexecution();
    
     
    }
  
    
  });
  this.display=false;
}

add(){
  this.id="";
  this.nom="";
  this.display=true;
}

update(){
  this.display=true;
}
delete(motifArreterlexecution: MotifArreterlexecution){
 
  this.crudservice.deleteLigne("motifArreterlexecution", motifArreterlexecution.id) .subscribe(data => {
    if(data.status == 417){
      this.service.add({ key: 'tst', severity: 'error', summary: '.   خطأ    ', detail: ' عليك تثبت     '  });
    }
    else{
      this.showAllMotifArreterlexecution();
    }
  
  });
 

}
}
