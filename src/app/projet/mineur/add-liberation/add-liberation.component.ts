import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng';
import { CrudEnfantService } from 'src/app/demo/service/crud-enfant.service';
import { EventService } from 'src/app/demo/service/eventservice';
import { NodeService } from 'src/app/demo/service/nodeservice';
import { Affaire } from 'src/app/domain/affaire';
import { Arrestation } from 'src/app/domain/arrestation';
import { ArrestationId } from 'src/app/domain/arrestationId';
 
import { CauseLiberation } from 'src/app/domain/causeLiberation';
 
import { Enfant } from 'src/app/domain/enfant';
import { EtabChangeManiere } from 'src/app/domain/etabChangeManiere';
 
import { Liberation } from 'src/app/domain/liberation';
import { LiberationId } from 'src/app/domain/liberationId';
import { ResidenceId } from 'src/app/domain/residanceId';
 
 
import { Residence } from 'src/app/domain/residence';
import { BreadcrumbService } from 'src/app/shared/breadcrumb/breadcrumb.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-add-liberation',
  templateUrl: './add-liberation.component.html',
  styleUrls: ['./add-liberation.component.css'],
  
  providers: [MessageService]
})
export class AddLiberationComponent  implements OnInit, OnDestroy {
  centre = "";
  numOrdinale = "";
  numArrestation = "";
  dateEntreLocal;
  cause = "";
  cause_etabChangeManiere = "";
  idValide:string;
  remarqueLiberation= ""
  enfantLocal: Enfant;
  roles: string[] = [];
  currentUser: any;
  arrestation: Arrestation;
  arrestationId: ArrestationId;
  residence: Residence;
  
  displayImg: boolean;
  dateFin:any;
  msg= "";
  dateLiberation:any;
  calendar_ar:any;
  entitesCauseLiberation: CauseLiberation[];
  entitesEtabChangeManiere: EtabChangeManiere[];
  liberation:Liberation;

  idEnfant:any;
  causeLiberationLocal:  CauseLiberation;
  etabChangeManiereLocal:  EtabChangeManiere;
  isLiberation = false;
  isMutation=false;
  isDeces=false;

  displayCauseLiberation= false;
  displayEtabChangeManiere= false;
 


  isEchapper= false;
   

  
  showLiberation= false;

  isSaved= false;

  affaires:Affaire[]=[];

years="";
  displayAddArrestation=false;
  residenceId: any;
  nextAdd: boolean;

  constructor(private crudservice: CrudEnfantService, private formBuilder: FormBuilder,
    private eventService: EventService, private token: TokenStorageService, public datepipe: DatePipe,
    private nodeService: NodeService, private service: MessageService,
     private breadcrumbService: BreadcrumbService, private router: Router,) {

   
     
  
  }
  ngOnDestroy() {
		window.localStorage.removeItem("idValide");
	}
	ngOnInit() {
    this.currentUser = this.token.getUser(); 
     
		let idValide = window.localStorage.getItem("idValide");
    
		if (idValide) {
     
      this.idValide = idValide;
			this.search(idValide);
    
     
		}
    else{

      this.router.navigate(['/mineur/Changement']);
		}

    this.currentUser = this.token.getUser();
    console.log(this.currentUser);


   

  

    this.crudservice.getlistEntity("causeLiberation" )
    .subscribe(data => {
      console.log(data);
       this.entitesCauseLiberation = data.result;
        
    });

    this.crudservice.getlistEntity("etabChangeManiere" )
    .subscribe(data => {
      console.log(data);
       this.entitesEtabChangeManiere = data.result;
        
    });

    
    this.calendar_ar= {
            
      closeText: "Fermer",
prevText: "Précédent",
nextText: "Suivant",
currentText: "Aujourd'hui",
monthNames: [ '  جانفــــي  ',

'   فيفـــري   ',
'  مــــارس  ',
   '  أفريــــل  ',
    '  مــــاي  ',
      '  جــــوان  ',
        '  جويليــــة  ',
            '  أوت  ',
              '  سبتمبــــر  ',
              '  أكتوبــــر  ',
                 '  نوفمبــــر  ',
                   '  ديسمبــــر  '],
monthNamesShort: [ "janv.", "févr.", "mars", "avr.", "mai", "juin",
  "juil.", "août", "sept.", "oct.", "nov.", "déc." ],
dayNames: [ "dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi" ],
dayNamesShort: [ "dim.", "lun.", "mar.", "mer.", "jeu.", "ven.", "sam." ],
dayNamesMin: [ "D","L","M","M","J","V","S" ],
weekHeader: "Sem.",
dateFormat: "dd/mm/yy",
firstDay: 1,
isRTL: false,
showMonthAfterYear: true,
yearSuffix: ""
      
    }

    
  }
  refresh() {
    this.isLiberation = false;
    this.isSaved = false;
    this.dateLiberation = new Date();
    } 
  


  
  showListCauseLiberation(){
    this.displayCauseLiberation=true;
    
      }
   showListEtabChangeManiere(){
        this.displayEtabChangeManiere=true;
      }

      saveCauseLiberation(causeLiberation:CauseLiberation){
         
        this.causeLiberationLocal = causeLiberation;
        this.cause  =  this.causeLiberationLocal.libelleCauseLiberation;
        this.displayCauseLiberation=false;

        if(causeLiberation.id!=50){
          this.etabChangeManiereLocal = null;
          this.cause_etabChangeManiere  = "";
          this.displayEtabChangeManiere=false;
        }
        
          }
          saveEtabChangeManiere(etabChangeManiere:EtabChangeManiere){
         
            this.etabChangeManiereLocal = etabChangeManiere;
            this.cause_etabChangeManiere  =  this.etabChangeManiereLocal.libelle_etabChangeManiere;
            this.displayEtabChangeManiere=false;
            
              }
 
          
   
  search(id: String) {
  
    this.crudservice.getLigneById("enfant", id)
      .subscribe(data => {
     
          this.enfantLocal = data.result;
    
          this.crudservice.findByIdEnfantAndStatut0("arrestation", id)
          .subscribe(data => {
            if(data.result==null){

            }
            else{
            this.arrestation = data.result;
            
            this.years= this.years + (new Date(this.arrestation?.date).getFullYear())+':'+(new Date().getFullYear());
  
            this.getDateFinPunition(this.arrestation.arrestationId.idEnfant,this.arrestation.arrestationId.numOrdinale);
            this.crudservice.findByArrestation("affaire", this.arrestation.arrestationId.idEnfant, this.arrestation.arrestationId.numOrdinale)
            .subscribe(data => {
              if (data.result == null) {
              }
                else {
                 
                  this.affaires = data.result ;
            
          
                 
                 }
            
            });




            this.crudservice.getLiberationById("liberation", this.arrestation.arrestationId.idEnfant,this.arrestation.arrestationId.numOrdinale)
            .subscribe(data => {
            if (data.result != null) {
              this.msg = "في حالـــة ســراح";
              this.liberation=data.result;
              this.isLiberation=true;
              this.crudservice.getLigneById("deces",this.arrestation.arrestationId.idEnfant)
              .subscribe(data => {
           
                
                 if (data.result != null) {
                  this.msg ="طفل فــي ذمــــــة اللـــه";
                 }  
    
              });
             
            } else {
             
              
             

              this.crudservice.findResidenceByIdEnfantAndStatut0("residence",this.arrestation.arrestationId.idEnfant,this.arrestation.arrestationId.numOrdinale)
              .subscribe(data => {
           
                 this.residence = data.result ;
                 
             
               
                 this.crudservice.getLigneById("deces",this.arrestation.arrestationId.idEnfant)
                 .subscribe(data => {
              
                   
                    if (data.result == null) {
                      if(this.residence .etablissement.id != this.token.getUser().personelle.etablissement.id){
                              
                 
                        this.isMutation = true;
                      
                        this.msg ="      طفــل مقيــم بمركــز     "+ this.residence .etablissement.libelle_etablissement ;
     
                      }
                      this.crudservice.findByIdEnfantAndResidenceTrouverNull("echappes", id)
                      .subscribe(data => {
                        
                        if (data.result == null) {
                          this.crudservice.findByIdEnfantAndStatutEnCour("residence",this.arrestation.arrestationId.idEnfant,this.arrestation.arrestationId.numOrdinale)
                                    .subscribe(data => {
                                     
                                         
                                      if (data.result == null) {
                                      }
                                      else  {
                                        this.isMutation=true;
                      
                                        this.msg ="      نقلـــة جـــارية إلـــى مركــز    "+ data.result.etablissement.libelle_etablissement ;
                                      }
                                      });
                                      
                        }
                          else { 
                            this.msg = "طفل في حالــــــة فـــرار";
                          
                             //this.isEchapper =true;
                             this.isMutation=true;
                          }
              
                           
                        });
                    } else {
                      this.liberation = data.result ;
                      this.isDeces=true;
                      
                      this.msg = "طفل فــي ذمــــــة اللـــه";
                      if(this.residence .etablissement.id != this.token.getUser().personelle.etablissement.id){
                              
                 
                        this.isMutation = true;
                        this.isDeces=false;
                      
     
                      }
                    }
       
                 });
              });
              

          
            }



          });

        
        }
        });

      });
  }
  

  
  save() {

    if(!this.dateLiberation || !this.causeLiberationLocal ||(this.causeLiberationLocal.id==50 && !this.etabChangeManiereLocal))  
    {
      this.service.add({ key: 'tst', severity: 'error', summary: '.   خطأ    ', detail: ' عليك تثبت     '  });
    }
    else{
      this.dateLiberation = this.datepipe.transform(this.dateLiberation, 'yyyy-MM-dd');
  
      let liberationId = new LiberationId();
  
      liberationId.idEnfant = this.arrestation.arrestationId.idEnfant;
      liberationId.numOrdinale = this.arrestation.arrestationId.numOrdinale;
      
  
     this.liberation = new Liberation();
  
     this.liberation.liberationId = liberationId;
  
     this.liberation.causeLiberation=this.causeLiberationLocal;
  
     this.liberation.remarqueLiberation=this.remarqueLiberation;
     this.liberation.etabChangeManiere=this.etabChangeManiereLocal;
     this.liberation.date=  this.dateLiberation ;
    //  liberation.arrestation= this.arrestation;
      this.arrestation.liberation=  this.liberation;
      this.showLiberation= true;

    }

   
  }

  confirmer(){
    this.crudservice.createLigne("arrestation",  this.arrestation)
    .subscribe(data => {
     this.showLiberation= false;
     this.isSaved= true;
       console.log(data);

});
  }










  showImg() {
    this.displayImg = true;

  }

  getDateFinPunition(idEn,numO){
                      
    this.crudservice.getDateFinPunition("affaire", idEn,numO )
  .subscribe(data => {
    console.log("rrrrrrrrrrrrr");
  if (data.result == null) {
    console.log("hhhhhhhhhhhhhh");
  }
  else {
    console.log("bbbbbbbbbbbbbbbbbbbbbb");
  this.dateFin=data.result;
   
    console.log(data.result);
  
  
  }
  
  
  
  });
  }


  delete( ){
    this.crudservice.deleteLiberation( this.arrestation)
    .subscribe(data => {
      if (data.status == 200) {
        // this.search( this.arrestation.enfant.id)
        this.isLiberation = false;
    }
      else {
      
      console.log(data.result);
     
       
          

      }

    });

  }


  addResidence() {
  
    this.centre =
    this.currentUser.personelle.etablissement.libelle_etablissement;

  this.crudservice
    .countByEnfant("arrestation", this.enfantLocal.id)
    .subscribe((data) => {
      this.numOrdinale = data.result ;
    });
    this.displayAddArrestation = true;
  }


  saveNewResidence() {
    console.log(this.dateEntreLocal)
    console.log(this.numArrestation)
    if(this.dateEntreLocal && this.numArrestation) {
      this.crudservice.findByIdEnfantAndMaxResidence("residence", this.arrestation.arrestationId.idEnfant,this.arrestation.arrestationId.numOrdinale)
    .subscribe(data => {

      let residence = new Residence();
    
      this.residence=data.result;
     
      this.residence.residenceId.numOrdinaleResidence=this.residence.residenceId.numOrdinaleResidence+1;
      residence.residenceId=this.residence.residenceId;
      residence.arrestation=this.residence.arrestation;
       residence.etablissement = this.currentUser.personelle.etablissement;
       residence.dateEntree = this.dateEntreLocal;
       residence.numArrestation=this.numArrestation;
      
      this.residence.statut=0;
console.log(residence)
      this.crudservice
        .createLigne("residence",  residence)
        .subscribe((data) => {
          this.residence = data.result;
          this.centre = data.result.etablissement.libelle_etablissement;
          this.numArrestation = data.result.numArrestation;
          this.nextAdd = true;
          this.delete();
          this.service.add({
            key: "tst",
            severity: "success",
            summary: "تم إدراج إيقاف جديد بنجاح    ",
            detail: "1",
          });
        });
      
    });
    
  
   
     
  
    } else {
      this.service.add({
        key: 'tst',
        severity: 'error',
        summary: '.   خطأ    ',
        detail: 'تثبت من إدراج المعطيات '
      });
      
    }
  }
}

