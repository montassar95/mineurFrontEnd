import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CrudEnfantService } from 'src/app/demo/service/crud-enfant.service';
import { TypeTribunal } from 'src/app/domain/typeTribunal';
import { BreadcrumbService } from 'src/app/shared/breadcrumb/breadcrumb.service';

@Component({
  selector: 'app-type-tribunal',
  templateUrl: './type-tribunal.component.html',
  styleUrls: ['./type-tribunal.component.css']
  ,providers: [MessageService]
})
export class TypeTribunalComponent implements OnInit {

id;
nom;
degre;
  typeTribunal:TypeTribunal;
  display=false;

  constructor(  private crudservice: CrudEnfantService,  private service: MessageService,
    private breadcrumbService: BreadcrumbService,private router: Router) { 
    this.breadcrumbService.setItems([
      {label: 'الإستقبال', routerLink: ['/']},
  
      {label: 'رموز القضايا' },
      {label: ' قائمة  أنواع المحاكم' },
  ]);}

  ngOnInit(): void {
    this.showAllTypeTribunal();
  }
  typeTribunals : TypeTribunal[]= [];

  showAllTypeTribunal() {
      
        
    this.crudservice.getlistEntity("typeTribunal")
    .subscribe( data => {
      if(data.result){
     
        this.typeTribunals= data.result;
        
     
       
      }
      else{
        
        this.typeTribunals= [];
        
     
      }
    
    });
  
  
}
addTyTr(){
  
  this.typeTribunal= new TypeTribunal();
  this.typeTribunal.id=this.id;
  this.typeTribunal.libelleTypeTribunal=this.nom;
 
  this.typeTribunal.statutNiveau=this.degre;

  this.crudservice.createLigne("typeTribunal",   this.typeTribunal)
  .subscribe(data => {
    if(data.result){
      console.log( data.result );
      this.showAllTypeTribunal();
    
     
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

delete(typeTribunal: TypeTribunal){
 
  this.crudservice.deleteLigne("typeTribunal", typeTribunal.id) .subscribe(data => {
    if(data.status == 417){
      this.service.add({ key: 'tst', severity: 'error', summary: '.   خطأ    ', detail: ' عليك تثبت     '  });
    }
    else{
      this.showAllTypeTribunal();
    }
    
  });
 

}
}
