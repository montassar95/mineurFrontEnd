import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CrudEnfantService } from 'src/app/demo/service/crud-enfant.service';
import { ClassePenale } from 'src/app/domain/classePenale';
import { BreadcrumbService } from 'src/app/shared/breadcrumb/breadcrumb.service';

@Component({
  selector: 'app-classe-penale',
  templateUrl: './classe-penale.component.html',
  styleUrls: ['./classe-penale.component.css']
  ,providers: [MessageService]
})
export class ClassePenaleComponent implements OnInit {

  display=false;
id;
nom;
classePenale:ClassePenale;
  constructor(  private crudservice: CrudEnfantService,  private service: MessageService,
    private breadcrumbService: BreadcrumbService,private router: Router) { 
    this.breadcrumbService.setItems([
      {label: 'الإستقبال', routerLink: ['/']},
  
      {label: 'رموز الهوية' },
      {label: ' الصنف الجزائي   ' },
  ]);}

  ngOnInit(): void {
    this.showAllClassePenale(); 
  }

  classePenales : ClassePenale[]= [];

  showAllClassePenale() {
      
        
    this.crudservice.getlistEntity("classePenale")
    .subscribe( data => {
      if(data.result){
     
        this.classePenales= data.result;
        
     
       
      }
      else{
        
        this.classePenales= [];
        
     
      }
    
    });
  
  
}

addClPe(){
  
  this.classePenale= new ClassePenale();
  this.classePenale.id=this.id;
  this.classePenale.libelle_classe_penale=this.nom;
 
  

  this.crudservice.createLigne("classePenale",   this.classePenale)
  .subscribe(data => {
    if(data.result){
      console.log( data.result );
      this. showAllClassePenale();
    
     
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
delete(classePenale: ClassePenale){
 
  this.crudservice.deleteLigne("classePenale", classePenale.id) .subscribe(data => {
    console.log(data.status)
    if(data.status == 417){
      this.service.add({ key: 'tst', severity: 'error', summary: '.   خطأ    ', detail: ' عليك تثبت     '  });
    }
    else{
      this.showAllClassePenale();
    }
   
  });
 

}
}
