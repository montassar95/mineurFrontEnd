import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
 
 
import { MessageService } from 'primeng';
import { CrudEnfantService } from 'src/app/demo/service/crud-enfant.service';
import { EventService } from 'src/app/demo/service/eventservice';
import { NodeService } from 'src/app/demo/service/nodeservice';
import { Arrestation } from 'src/app/domain/arrestation';
import { ArrestationId } from 'src/app/domain/arrestationId';
import { CauseDeces } from 'src/app/domain/causeDeces';
import { Deces } from 'src/app/domain/deces';
 
import { Enfant } from 'src/app/domain/enfant';
import { LieuDeces } from 'src/app/domain/lieuDeces';
 
import { Residence } from 'src/app/domain/residence';
import { BreadcrumbService } from 'src/app/shared/breadcrumb/breadcrumb.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-add-deces',
  templateUrl: './add-deces.component.html',
  styleUrls: ['./add-deces.component.css'],
  providers: [MessageService]
})
export class AddDecesComponent  implements OnInit, OnDestroy {
  centre = "";
  numOrdinale = "";
  numArrestation = "";
  cause = "";
  lieuDeces = "";
  remarqueDeces= ""
  enfantLocal: Enfant;
  roles: string[] = [];
  currentUser: any;
  arrestation: Arrestation;
  arrestationId: ArrestationId;
  residence: Residence;
  
  displayImg: boolean;
  isEncourMutation= false;
  isDeces = false;
  isMutation=false;
  isLiberation= false;
  msg= "";
  
  dateDeces:any;
   
  entitesCauseDeces: CauseDeces[];
  displayEtablissement = false;
  displayCauseDeces= false;
   
  causeDecesLocal:  CauseDeces;


  entitesLieuDeces: CauseDeces[];
  
  displayLieuDeces= false;
 
  lieuDecesLocal:  LieuDeces;

  deces:Deces;

  idEnfant:any;
  isEchappes= false;
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
		console.log(idValide)
		if (idValide) {

			this.search(idValide);
		}
    else{

      this.router.navigate(['/mineur/Changement']);
		}

    this.currentUser = this.token.getUser();
    console.log(this.currentUser);


   

  

    this.crudservice.getlistEntity("causeDeces" )
    .subscribe(data => {
      console.log(data);
       this.entitesCauseDeces = data.result;
        
    });

    this.crudservice.getlistEntity("lieuDeces" )
    .subscribe(data => {
      console.log(data);
       this.entitesLieuDeces = data.result;
        
    });
  }
 
   
  showListEtablissement(){
this.displayEtablissement=true;

  }
  showListCauseDeces(){
    this.displayCauseDeces=true;
    
      }
 

      saveCauseDeces(causeDeces:CauseDeces){
        console.log(causeDeces);
        this.causeDecesLocal = causeDeces;
        this.cause  =  this.causeDecesLocal.libelle_causeDeces;
        this.displayCauseDeces=false;
        
          }

 
  showListLieuDeces(){
    this.displayLieuDeces=true;
    
      }
 

      saveLieuDeces(lieuDeces:LieuDeces){
        console.log(lieuDeces);
        this.lieuDecesLocal = lieuDeces;
        this.lieuDeces  =  this.lieuDecesLocal.libellelieuDeces;
        this.displayLieuDeces=false;
        
          }         
   








          
  search(id: String) {
    this.crudservice.getLigneById("enfant", id)
      .subscribe(data => {
     
          this.enfantLocal = data.result;
    
          this.crudservice.findByIdEnfantAndStatut0("arrestation", id)
          .subscribe(data => {
            this.arrestation = data.result;

            
            this.crudservice.getLiberationById("liberation", this.arrestation.arrestationId.idEnfant,this.arrestation.arrestationId.numOrdinale)
            .subscribe(data => {
                        if ( data.result  == null) {


               
              this.crudservice.getLigneById("deces",this.arrestation.arrestationId.idEnfant)
              .subscribe(data => {
                this.deces = data.result ;
                
                 if ( this.deces== null) {
                   
                  this.crudservice.findResidenceByIdEnfantAndStatut0("residence",this.arrestation.arrestationId.idEnfant,this.arrestation.arrestationId.numOrdinale)
                  .subscribe(data => {
               
                     this.residence = data.result ;
                     
                 
                   
                     
                       
                        
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
                             
                                  

                                  if(this.residence .etablissement.id != this.token.getUser().personelle.etablissement.id){
                                  
                     
                                    this.isMutation = true;
                                    this.msg ="      نقلـــة جـــارية إلـــى مركــز    "+ data.result.etablissement.libelle_etablissement;
                                   
                 
                                  }
                                  else{

                                    this.isEchappes=true;
                                    this.isMutation = false;
                                    this.msg ="      نقلـــة جـــارية إلـــى مركــز    "+ data.result.etablissement.libelle_etablissement
                                  }
                                }
                                });
                            }
                              else { 
                                this.msg = "طفل في حالــــــة فـــرار";
                              
                               // this.isEchapper =true;
                               this.isEchappes=true;
                               if(this.residence .etablissement.id != this.token.getUser().personelle.etablissement.id){
                                  
                     
                                this.isMutation = true;
                                this.isEchappes=false;
                               
             
                              }
                              }
                  
                               
                            });
                     
                  });
                

                 
                 }
                 else{
                





                

                  this.crudservice.findResidenceByIdEnfantAndStatut0("residence",this.arrestation.arrestationId.idEnfant,this.arrestation.arrestationId.numOrdinale)
                  .subscribe(data => {
               
                     this.residence = data.result ;
                     
                  
                         
                           
                            this.isDeces=true;
                            
                            this.msg = "طفل فــي ذمــــــة اللـــه";
                          
           
                     
                  });

    
                 }
    
              });




      //         else{
      //           this.msg = "في حالـــة ســراح";

      //          this.isLiberation=true;
      //  }


            } else {
             
            
             

              this.crudservice.findResidenceByIdEnfantAndStatut0("residence",this.arrestation.arrestationId.idEnfant,this.arrestation.arrestationId.numOrdinale)
              .subscribe(data => {
           
                 this.residence = data.result ;
                 
             
               
                 this.crudservice.getLigneById("deces",this.arrestation.arrestationId.idEnfant)
                 .subscribe(data => {
              
                  this.deces = data.result ;
                    if (this.deces == null) {
                      
                      if(this.residence .etablissement.id != this.token.getUser().personelle.etablissement.id){
                              
                 
                        this.isMutation = true;
                      
                        this.msg ="      طفــل مقيــم بمركــز     "+ this.residence .etablissement.libelle_etablissement ;
     
                      }
                                  else{
                                                  this.msg = "في حالـــة ســراح";

                                                 this.isLiberation=true;
                                       }
                    } else {
                    
                      this.isDeces=true;
                      
                      this.msg = "طفل فــي ذمــــــة اللـــه";
                    }
       
                 });
              });
              

          
            }



          });

        });



      });
  }
  

  
  save() {

 
 let deces = new Deces();
 this.dateDeces = this.datepipe.transform(this.dateDeces, 'yyyy-MM-dd');
 deces.enfantIdDeces  =  this.enfantLocal.id;   
    deces.dateDeces  =  this.dateDeces;     
      deces.causeDeces  =  this.causeDecesLocal;
      deces.remarqueDeces  = this.remarqueDeces;
     deces.residenceDeces =   this.residence;
     deces.lieuDeces =   this.lieuDecesLocal;
     deces.enfant = this.enfantLocal;
    console.log( deces);
   this.crudservice.createLigne("deces",  deces)
                       .subscribe(data => {

                          console.log(data.result);
          
     });
  }
  showImg() {
    this.displayImg = true;

  }
}
