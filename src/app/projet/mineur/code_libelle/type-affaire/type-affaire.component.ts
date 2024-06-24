import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CrudEnfantService } from 'src/app/demo/service/crud-enfant.service';
import { TypeAffaire } from 'src/app/domain/typeAffaire';
import { BreadcrumbService } from 'src/app/shared/breadcrumb/breadcrumb.service';

@Component({
  selector: 'app-type-affaire',
  templateUrl: './type-affaire.component.html',
  styleUrls: ['./type-affaire.component.css']
  ,providers: [MessageService]
})
export class TypeAffaireComponent implements OnInit {

id;
nom;
degre1;
degre2;
  display=false;
  typeAffaire:TypeAffaire
  
  constructor(  private crudservice: CrudEnfantService,  private service: MessageService,
     private breadcrumbService: BreadcrumbService,private router: Router) { 
    this.breadcrumbService.setItems([
      {label: 'الإستقبال', routerLink: ['/']},
  
      {label: 'رموز القضايا' },
      {label: ' قائمة  أنواع القضايا   ' },
  ]);}

  ngOnInit(): void {
    this.showAllTypeAffaire();
  }
  typeAffaires : TypeAffaire[]= [];

  showAllTypeAffaire() {
      
        
    this.crudservice.getlistEntity("typeAffaire")
    .subscribe( data => {
      if(data.result){
     
        this.typeAffaires= data.result;
        
     
       
      }
      else{
        
        this.typeAffaires= [];
        
     
      }
    
    });
  
  
}

addTyAf(){
  
  this.typeAffaire= new TypeAffaire();
  this.typeAffaire.id=this.id;
  this.typeAffaire.libelle_typeAffaire=this.nom;
 
  this.typeAffaire.statutException=this.degre1;
  this.typeAffaire.statutNiveau=this.degre2;

  this.crudservice.createLigne("typeAffaire",   this.typeAffaire)
  .subscribe(data => {
    if(data.result){
      console.log( data.result );
      this. showAllTypeAffaire();
    
     
    }
  
    
  });
  this.display=false;
}

add(){
  this.id="";
  this.nom="";
  this.degre1="";
  this.degre2="";
  this.display=true;
}

update(){
  this.display=true;
}


delete(typeAffaire: TypeAffaire){
 
  this.crudservice.deleteLigne("typeAffaire", typeAffaire.id) .subscribe(data => {
    if(data.status == 417){
      this.service.add({ key: 'tst', severity: 'error', summary: '.   خطأ    ', detail: ' عليك تثبت     '  });
    }
    else{
      this.showAllTypeAffaire();
    }
    
  });
 

}

}
