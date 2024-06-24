import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService, TreeNode } from 'primeng/api';
import { CrudEnfantService } from 'src/app/demo/service/crud-enfant.service';
import { EventService } from 'src/app/demo/service/eventservice';
import { NodeService } from 'src/app/demo/service/nodeservice';
import { Enfant } from 'src/app/domain/enfant';
import { Arrestation } from 'src/app/domain/arrestation';

import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { ArrestationId } from 'src/app/domain/arrestationId';
import { Residence } from 'src/app/domain/residence';
import { ResidenceId } from 'src/app/domain/residanceId';
import { BreadcrumbService } from 'src/app/shared/breadcrumb/breadcrumb.service';


@Component({
  selector: 'app-add-num-arret',
  templateUrl: './add-num-arret.component.html',
  styleUrls: ['./add-num-arret.component.css'],
  providers: [MessageService]
})
export class AddNumArretComponent implements OnInit {
  centre = "";
  numOrdinale = "";
  numArrestation = "";
  dateEntreLocal;
 
  enfantLocal: Enfant;
  currentUser: any;
  arrestation: Arrestation;
  arrestationId: ArrestationId;
  residence: Residence;
  displayImg: boolean;
  isReadOnly = true;
  msg: number;
  residenceId :   ResidenceId ;
  idEnfant:any;
  constructor(private crudservice: CrudEnfantService, private formBuilder: FormBuilder,
    private eventService: EventService, private token: TokenStorageService, public datepipe: DatePipe,
    private nodeService: NodeService, private service: MessageService, private breadcrumbService: BreadcrumbService) {
      this.breadcrumbService.setItems([
        {label: 'الإستقبال', routerLink: ['/']},
        
        {label: 'ملف الطفل' },
        {label: 'الإيقافات' },
    ]);
  }
  ngOnInit() {
   

    this.currentUser = this.token.getUser();
    console.log(this.currentUser);

  }

  reload() {
    this.enfantLocal = null;
    this.isReadOnly = true;
    this.msg = 2;

    
    //window.location.reload();
  }

  changerEnfnt() {
    console.log("aaaaaaa")
    console.log(this.idEnfant)
    if (this.idEnfant) { this.search(this.idEnfant); }
    else {
      
      this.centre = "";
      this.numArrestation = "";
      this.dateEntreLocal = "";
      this.numOrdinale = "";
      this.isReadOnly = true;
      this.enfantLocal = null;

    }

  }
  search(id: number) {
    this.crudservice.getLigneById("enfant", id)
      .subscribe(data => {
        if (data.result == null) {


          this.service.add({ key: 'tst', severity: 'error', summary: '.   خطأ    ', detail: 'عليك التثبت من معرف الطفل' });
          this.msg = 1;
          
          this.centre = "";
          this.dateEntreLocal = "";
          this.numOrdinale = "";
          this.numArrestation = "";
          this.isReadOnly = true;
          this.enfantLocal = null;
        }
        else 
        {
          this.enfantLocal = data.result;
       

          this.crudservice.findByIdEnfantAndStatut0("arrestation", id)
            .subscribe(data => {
              this.arrestation=data.result;
              this.crudservice.getLiberationById("liberation", this.arrestation.arrestationId.idEnfant,this.arrestation.arrestationId.numOrdinale)
              .subscribe(data => {
              if (data.result != null) {
                this.isReadOnly = false;
                this.centre = this.currentUser.personelle.etablissement.libelle_etablissement;
                this.dateEntreLocal = "";
                this.crudservice.countByEnfant("arrestation", id)
                  .subscribe(data => { this.numOrdinale = data.result + 1 });

                 
              }
              else {
              
               
                this.dateEntreLocal = this.arrestation.date;
                this.numOrdinale = this.arrestation.arrestationId.numOrdinale;
                this.isReadOnly = true;
                this.msg = 0;
                 
              

                this.crudservice.findResidenceByIdEnfantAndStatut0("residence",this.arrestation.arrestationId.idEnfant,this.arrestation.arrestationId.numOrdinale)
                  .subscribe(data => {

                    if (data.result) {
                      console.log( data.result);
                      // this.service.add({ key: 'tst', severity: 'error', summary: '.   خطأ    ', detail: id+' إقامة مفتوحة  '  });
                    

                    

                      
                      this.numArrestation  =data.result.numArrestation;
                          this.centre = data.result.etablissement.libelle_etablissement;

                          

 






                    }

                  });





              }



            });
          });
        }



      });
  }
 


  showImg() {
    this.displayImg = true;

  }
}




           
