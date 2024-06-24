import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng';
import { CrudEnfantService } from 'src/app/demo/service/crud-enfant.service';
import { BreadcrumbService } from 'src/app/shared/breadcrumb/breadcrumb.service';

@Component({
  selector: 'app-changement',
  templateUrl: './changement.component.html',
  styleUrls: ['./changement.component.scss'],
  providers: [MessageService]
})
export class ChangementComponent implements OnInit {
  idLiberation : number;
  idMutation : number;
  idDeces : number;
  idEchappes : number;
  msg="";
  isExist:boolean;
  idRevue : number;

  idChangementLieu : number;
  idPropagation : number;

  
  constructor(  private breadcrumbService: BreadcrumbService, 
                private crudservice: CrudEnfantService,
                private router: Router,
                private service: MessageService) { 

    this.breadcrumbService.setItems([
      {label: 'الإستقبال', routerLink: ['/']},
      
      {label: ' القضايا' },
  
  ]);}

  ngOnInit(): void {
  }


  dirLiberation() {
    this.crudservice.getLigneById("enfant", this.idLiberation)
    .subscribe(data => {
      if (data.result == null) {

        this.msg = 'عليك التثبت من معرف الطفل';
        this.service.add({
          key: 'tst',
          severity: 'error',
          summary: '.   خطأ    ',
          detail: 'عليك التثبت من معرف الطفل'
        });
        
        this.isExist=true;
      } 
      else {
        window.localStorage.removeItem("idValide");

        window.localStorage.setItem("idValide",  this.idLiberation.toString());
        this.router.navigate(['/mineur/liberation']);
       


      }



    });
    
  }
  dirEchappes() {
    this.crudservice.getLigneById("enfant", this.idEchappes)
    .subscribe(data => {
      if (data.result == null) {

        this.msg = 'عليك التثبت من معرف الطفل';
        this.service.add({
          key: 'tst',
          severity: 'error',
          summary: '.   خطأ    ',
          detail: 'عليك التثبت من معرف الطفل'
        });
        
        this.isExist=true;
      } 
      else {
        window.localStorage.removeItem("idValide");

        window.localStorage.setItem("idValide",  this.idEchappes.toString());
        this.router.navigate(['/mineur/echappes']);
    
      }

    });
   
  }

  dirMutation() {
    this.crudservice.getLigneById("enfant", this.idMutation)
    .subscribe(data => {
      if (data.result == null) {

        this.msg = 'عليك التثبت من معرف الطفل';
        this.service.add({
          key: 'tst',
          severity: 'error',
          summary: '.   خطأ    ',
          detail: 'عليك التثبت من معرف الطفل'
        });
        
        this.isExist=true;
      } 
      else {
        window.localStorage.removeItem("idValide");

        window.localStorage.setItem("idValide",  this.idMutation.toString());
        this.router.navigate(['/mineur/mutation']);
    
      }

    });
   
  }



  dirDeces() {

    this.crudservice.getLigneById("enfant", this.idDeces)
    .subscribe(data => {
      if (data.result == null) {

        this.msg = 'عليك التثبت من معرف الطفل';
        this.service.add({
          key: 'tst',
          severity: 'error',
          summary: '.   خطأ    ',
          detail: 'عليك التثبت من معرف الطفل'
        });
        
        this.isExist=true;
      } 
      else {
        window.localStorage.removeItem("idValide");

        window.localStorage.setItem("idValide",  this.idDeces.toString());
        this.router.navigate(['/mineur/deces']);
       


      }



    });
  
  }

  dirRevue() {
    this.crudservice.getLigneById("enfant", this.idRevue)
    .subscribe(data => {
      if (data.result == null) {

        this.msg = 'عليك التثبت من معرف الطفل';
        this.service.add({
          key: 'tst',
          severity: 'error',
          summary: '.   خطأ    ',
          detail: 'عليك التثبت من معرف الطفل'
        });
        
        this.isExist=true;
      } 
      else {
        window.localStorage.removeItem("idValide");

        window.localStorage.setItem("idValide",  this.idRevue.toString());
        this.router.navigate(['/mineur/Revue']);
    
      }

    });
   
  }


  dirPropagation() {
    this.crudservice.getLigneById("enfant", this.idPropagation)
    .subscribe(data => {
      if (data.result == null) {

        this.msg = 'عليك التثبت من معرف الطفل';
        this.service.add({
          key: 'tst',
          severity: 'error',
          summary: '.   خطأ    ',
          detail: 'عليك التثبت من معرف الطفل'
        });
        
        this.isExist=true;
      } 
      else {
        window.localStorage.removeItem("idValide");

        window.localStorage.setItem("idValide",  this.idPropagation.toString());
        this.router.navigate(['/mineur/Propagation']);
    
      }

    });
   
  }
  
  dirChangementLieu() {
    this.crudservice.getLigneById("enfant", this.idChangementLieu)
    .subscribe(data => {
      if (data.result == null) {

        this.msg = 'عليك التثبت من معرف الطفل';
        this.service.add({
          key: 'tst',
          severity: 'error',
          summary: '.   خطأ    ',
          detail: 'عليك التثبت من معرف الطفل'
        });
        
        this.isExist=true;
      } 
      else {
        window.localStorage.removeItem("idValide");

        window.localStorage.setItem("idValide",  this.idChangementLieu.toString());
        this.router.navigate(['/mineur/ChangementLieu']);
    
      }

    });
   
  }



  // search(id: number) {
    
	// 	this.crudservice.getLigneById("enfant", id)
	// 		.subscribe(data => {
	// 			if (data.result == null) {


	// 				this.service.add({
	// 					key: 'tst',
	// 					severity: 'error',
	// 					summary: '.   خطأ    ',
	// 					detail: 'عليك التثبت من معرف الطفل'
	// 				});
	// 				this.msg = 'عليك التثبت من معرف الطفل';
			 
	// 			} else {
	// 				this.enfantLocal = data.result;
				 
 // 			}
	// 		});
	// }
}
