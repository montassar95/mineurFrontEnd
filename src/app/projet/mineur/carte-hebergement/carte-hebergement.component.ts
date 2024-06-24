import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService, SelectItem } from 'primeng';
import { CrudEnfantService } from 'src/app/demo/service/crud-enfant.service';
import { EventService } from 'src/app/demo/service/eventservice';
import { NodeService } from 'src/app/demo/service/nodeservice';
import { AccusationCarteHeber } from 'src/app/domain/accusationCarteHebergement';
import { AccusationCarteHeberId } from 'src/app/domain/accusationCarteHebergementId';
import { Affaire } from 'src/app/domain/affaire';
import { AffaireId } from 'src/app/domain/affaireId';
import { Arrestation } from 'src/app/domain/arrestation';
import { ArrestationId } from 'src/app/domain/arrestationId';
import { CarteHeber } from 'src/app/domain/carteHebergement';
import { DocumentId } from 'src/app/domain/documentId';
import { Enfant } from 'src/app/domain/enfant';
import { Gouvernorat } from 'src/app/domain/gouvernorat';
import { ResidenceId } from 'src/app/domain/residanceId';
import { Residence } from 'src/app/domain/residence';
import { TitreAccusation } from 'src/app/domain/titreAccusation';
import { Tribunal } from 'src/app/domain/tribunal';
import { TypeAffaire } from 'src/app/domain/typeAffaire';
import { TypeTribunal } from 'src/app/domain/typeTribunal';
import { BreadcrumbService } from 'src/app/shared/breadcrumb/breadcrumb.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-carte-hebergement',
  templateUrl: './carte-hebergement.component.html',
  styleUrls: ['./carte-hebergement.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class CarteHebergementComponent implements OnInit {
  alertTypeAffaire="";
  refresh(){
    this.crudservice.getDocumentByArrestation(this.arrestation.arrestationId.idEnfant, this.arrestation.arrestationId.numOrdinale)
    .subscribe(data => {

      
      this.numOrdinalDoc = data.result + 1;
    
     
    });
    this.nextBoolean = false;
  }
  
  enfantLocal: Enfant; 
  nextBoolean: boolean; 

  @Input()
  carteHeber: CarteHeber; 

  entitiesTribunal: Tribunal[];
  entitiesTypeAffaire: TypeAffaire[];
  displayImg: boolean;

  @Input()
  entitiesTitreAccusation:TitreAccusation[];

  entitiesAllTitreAccusation:TitreAccusation[];
  displayAllTitreAccusation = false;

  showCarteHeber= false;

  @Input()
  update=true;
  isExist = false;
  isSaved = false;
  msg = "";
  arrestation: any;

  residence : Residence;

  numOrdinalDoc: number;

  msgAlert = "aaaa";
  displayAlertLienAutre: boolean;
  displayAlertLienMeme: boolean;
  displayAlertAffaireOrigineLier: boolean;
  displayAlertAffaireLienLier: boolean;
  displayAlertLienAutreArrestation: boolean;
  displayAlertOrigineExistAvecLien: boolean;
  displayAlertOrigineExistSansLien: boolean;
  position: string;



  faux = false;
  years= "";


  affaireOrigine: Affaire;
  affaireLien: Affaire;
  affaireJoin: Affaire;

  affaireIdOrigine: AffaireId;
  affaireIdLien: AffaireId;

  displayNext: boolean;



  dateEmission;
  dateDepotCarte;
  documentId: DocumentId;
  accusationCarteHeberId:AccusationCarteHeberId;
  accusationCarteHeber:AccusationCarteHeber;
  @Input()
  accusationCarteHeberes: AccusationCarteHeber[] ;
  textJugement;
  statEchappesOrlibre:number;
	residenceId :   ResidenceId ;
	arrestationId: ArrestationId;
	numArrestation = "";
	centre = "";
	numOrdinale = ""; 
	dateEntreLocal;
 
	displayAddArrestation: boolean;
	currentUser:any;
	nextAdd=false;

  numDocumentByAffaire:any;
  calendar_ar:any;

   showCarteRecup=false;
   typeTribunalSwich : SelectItem[];
   gouvernoratSwich : SelectItem[];
   typeAffaireSwich : SelectItem[];
   directions =[
    {label:'  بطاقات الإيواء    ', value:'/mineur/docHeber'},
    {label:'    بطاقات الإيداع ', value:'/mineur/docHeber'},

    {label:'     مضامين الأحكام    ', value:'/mineur/docRecup'},
    {label:'     إحالة قضية    ', value:'/mineur/Transfert'},
    {label:'       إيقاف تنفيذ  ', value:'/mineur/ArreterLexecution'},
  
    {label:'      طعن النيابة بالاستئناف       ', value:'/mineur/AppelParquet'},
    {label:'         مراجعة     ', value:'/mineur/Revue'},
    {label:'          طعن الطفل بالاستئناف      ', value:'/mineur/AppelEnfant'},
    {label:'   الفرارات   ', value:'/mineur/echappes'},
    {label:'  النقل  ', value:'/mineur/mutation'},
    {label:'   إجراءات السراح  ', value:'/mineur/liberation'},
    
    {label:'  الوفاة  ', value:'/mineur/deces'},
    ];
  constructor(private crudservice: CrudEnfantService, private formBuilder: FormBuilder,  private router: Router,
    private eventService: EventService, public datepipe: DatePipe,private token: TokenStorageService,
    private nodeService: NodeService, private service: MessageService,
    private breadcrumbService: BreadcrumbService) {
    this.breadcrumbService.setItems([
      { label: 'الإستقبال', routerLink: ['/'] },

      { label: 'القضايا ', routerLink: ['/mineur/Affaire'] },
      { label: '   بطاقات إيداع' },
      { label: 'إدراج' },
    ]);
  }

  ngOnChanges(changes: SimpleChanges): void {
   
    this.isExist = true;
  
    this.isSaved= false;
    
    this.showCarteRecup = false;
    this.nextBoolean = false;
   
    this.entitiesAllTitreAccusation = [];
    this.crudservice.getlistEntity("titreAccusation").subscribe((data) => {
      this.entitiesAllTitreAccusation = data.result;

      this.entitiesTitreAccusation.forEach(element => {
        this.entitiesAllTitreAccusation = this.entitiesAllTitreAccusation.filter(
          (u) => u.id !==  element.id
        );
      });
     


    });
    

    this.crudservice
    .findDocumentById(this.carteHeber.documentId)
    .subscribe((data) => {

      console.log("=======================================================================================");
      console.log(data.result);

      console.log("=======================================================================================");

      this.carteHeber=data.result;

    
      this.numOrdinalDoc=this.carteHeber.documentId.numOrdinalDoc
      this.numDocumentByAffaire = this.carteHeber.documentId.numOrdinalDocByAffaire
      this.textJugement = this.carteHeber.textJugement; 


      this.dateEmission = this.carteHeber.dateEmission;
      this.dateEmission = new Date( this.dateEmission);
      this.dateDepotCarte = this.carteHeber.dateDepotCarte;
      this.dateDepotCarte = new Date( this.dateDepotCarte);


         this.codeTypeAffaire = this.carteHeber.typeAffaire.id

      this.typeAffaire = this.carteHeber.typeAffaire.libelle_typeAffaire;

      this.typeAffaireObjet = this.carteHeber.typeAffaire


      this.tribunal1 = this.carteHeber.affaire.tribunal.nom_tribunal; 
      this.codeTribunal1 =  this.carteHeber.affaire.tribunal.id; 
      this.numAffaireT1 = this.carteHeber.affaire.affaireId.numAffaire;
   
      this.tribunal1Objet= this.carteHeber.affaire.tribunal; 
     
    });

    
   }
	ngOnDestroy() {
		window.localStorage.removeItem("idValide");
	}
	ngOnInit() {

	  let idValide = window.localStorage.getItem("idValide");
  let idValideNav = window.localStorage.getItem("idValideNav");
  console.log(idValide)
  if (idValide) {

    this.search(idValide);
  }
  else if (idValideNav) {

    this.search(idValideNav);
  }



 
    this.crudservice.getlistEntity("tribunal")
      .subscribe(data => {
        console.log(data);
        this.entitiesTribunal = data.result;

      });

    this.crudservice.getlistEntity("typeAffaire")
      .subscribe(data => {
        console.log(data);
        this.entitiesTypeAffaire = data.result;

      });
     

      this.crudservice.getlistEntity("titreAccusation")
      .subscribe(data => {
        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
        console.log(data.result);
        this. entitiesAllTitreAccusation = data.result;

      });
      this.entitiesTitreAccusation = [];
      this.entitiesAllTitreAccusation = [];
      this.currentUser = this.token.getUser();
      this.showAllGouvernorat();
      this.showAllTypeTribunal();
      this.showAllTypeAffaire();

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
  saveTitreAccusation(titreAccusation:TitreAccusation) {
    this.entitiesAllTitreAccusation = this.entitiesAllTitreAccusation.filter(u => u !== titreAccusation);
    this.entitiesTitreAccusation.push(titreAccusation);
  }
  deletTitreAccusation(titreAccusation:TitreAccusation) {
    this.entitiesTitreAccusation = this.entitiesTitreAccusation.filter(u => u !== titreAccusation);
    this.entitiesAllTitreAccusation.push(titreAccusation);
  }


  reload() {
    this.enfantLocal = null;
    this.isExist = false;
    this.msg = "";
  
    //window.location.reload();
  }
  
  search(id: String) {
    this.crudservice.getLigneById("enfant", id)
      .subscribe(data => {
        
       
          this.enfantLocal = data.result;
          this.years="";
          this.years= this.years + (new Date(this.enfantLocal?.dateNaissance).getFullYear()+13)+':'+(new Date().getFullYear());
          this.crudservice.getLigneById("deces",this.enfantLocal.id)
                 .subscribe(data => {
              
                   
                    if (data.result == null) {
                      this.crudservice.findByIdEnfantAndResidenceTrouverNull("echappes", id)
                      .subscribe(data => {
                        
                        if (data.result == null) {
            
                      this.crudservice.findByIdEnfantAndStatut0("arrestation", id)
                      .subscribe(data => {
                        this.arrestation = data.result;
                        this.crudservice.getLiberationById("liberation", this.arrestation.arrestationId.idEnfant,this.arrestation.arrestationId.numOrdinale)
                        .subscribe(data => {
                                    if (data.result != null) {
                        
            
                          this.isExist = false;
                          this.msg = ' طفل  في حالـــة ســراح ';
                          this.statEchappesOrlibre=1;
                         
                        } else {
            
                        
                          this.crudservice.findResidenceByIdEnfantAndStatut0("residence",this.arrestation.arrestationId.idEnfant,this.arrestation.arrestationId.numOrdinale)
                                        .subscribe(data => {
            
                                      
                                          
                                                this.residence = data.result ;
            
                                                this.crudservice.findByIdEnfantAndStatutEnCour("residence",this.arrestation.arrestationId.idEnfant,this.arrestation.arrestationId.numOrdinale)
                                                .subscribe(data => {
                                                
                                                              if(data.result != null){
                                                                
                                                                this.isExist = false;
                                                              this.statEchappesOrlibre=2;
                                                                this.msg ="      نقلـــة جـــارية إلـــى مركــز    "+ data.result.etablissement.libelle_etablissement ;
                                                                  
                                                                      }
                                            
                                                      });
                                                      if(data.result.etablissement.id != this.token.getUser().personelle.etablissement.id){
                                               
                                  
                                                        this.isExist = false;
                                                        this.statEchappesOrlibre=3;
                                                        this.msg ="      طفــل مقيــم بمركــز     "+ data.result.etablissement.libelle_etablissement ;
                                
                                                      }
                                        });
                          
                          this.crudservice.getDocumentByArrestation(this.arrestation.arrestationId.idEnfant, this.arrestation.arrestationId.numOrdinale)
                            .subscribe(data => {
            
                              if(this.numOrdinalDoc){
                                this.update=false;
                                this.numOrdinalDoc = this.numOrdinalDoc;
                              }
                            else{
                              this.numOrdinalDoc = data.result + 1;
                            }
                             
                            });
            
            
                          this.isExist = true;
                        }
            
            
                      });
                      });
            
            
                          } 
                          else { 
                          this.msg = "طفل في حالــــــة فـــرار";
                          this.statEchappesOrlibre=0;
                         
                        }
            
                         
                      });
                    } else {
                     
                      this.statEchappesOrlibre=4;
                      
                      this.msg = "طفل فــي ذمــــــة اللـــه";
                    }
       
                 });
      
       



      });
  }

  changeDate() {
		this.dateEntreLocal = this.datepipe.transform(this.dateEntreLocal, 'yyyy-MM-dd');
	
	  }
	  save() {
 if(this.dateEntreLocal && this.numArrestation){

		this.arrestation = new Arrestation();
		this.arrestationId = new ArrestationId();
		this.residence = new Residence();
		this.residenceId = new ResidenceId();
		
		this.arrestation.arrestationId = this.arrestationId;
	
		this.arrestationId.numOrdinale = this.numOrdinale;
		this.arrestationId.idEnfant = this.enfantLocal.id;
	
		this.arrestation.date = this.dateEntreLocal;
		this.arrestation.enfant = this.enfantLocal;
		
		this.residence.etablissement = this.currentUser.personelle.etablissement;
		this.residence.numArrestation = this.numArrestation;
		this.residenceId.idEnfant = this.enfantLocal.id;
	   
		this.crudservice.createLigne("arrestation", this.arrestation)
		.subscribe(data => {
		  this.residenceId.numOrdinaleArrestation = data.result.arrestationId.numOrdinale; 
		  this.residenceId.numOrdinaleResidence=1;
		  this.residence.residenceId =  this.residenceId;
		  this.residence.arrestation = data.result;
		  this.residence.dateEntree = this.dateEntreLocal;
		  this.dateEntreLocal=data.result.date;
		  this.numOrdinale=data.result.arrestationId.numOrdinale;
		  this.crudservice.createLigne("residence", this.residence)
		  .subscribe(data => {
			
			this.residence=data.result;
			this.centre=data.result.etablissement.libelle_etablissement;
			this.numArrestation=data.result.numArrestation;
	   this.nextAdd=true;
	   this.service.add({
		key: 'tst',
		severity: 'success',
		summary: 'تم إدراج إيقاف جديد بنجاح    ',
		detail: '1'
	  });
	 
		  });
	
		})
	
		  
  } else {
    this.service.add({
      key: 'tst',
      severity: 'error',
      summary: '.   خطأ    ',
      detail: 'تثبت من إدراج المعطيات '
    });
    
  }
	
	  }
	
	
	  addArrestatione() {
		
		this.centre = this.currentUser.personelle.etablissement.libelle_etablissement;
	
		this.crudservice.countByEnfant("arrestation", this.enfantLocal.id)
		.subscribe(data => { this.numOrdinale = data.result + 1 });
	
		this.displayAddArrestation = true;
		 
	  }
	
	  nextAddOk(){
		this.search( this.residence.residenceId.idEnfant)
		this.displayAddArrestation=false;
	  }





  //------------------------------------------------------------type affaire-----------------------------------------------------------------------------------------------

  displayTypeAffaire: boolean;
  codeTypeAffaire = "";
  typeAffaire = "";
  typeAffaireObjet: TypeAffaire;

  showListTypeAffaire() {
    this.displayTypeAffaire = true;
  }
  saveTypeAffaire(typeAffaire) {

    this.typeAffaire = typeAffaire.libelle_typeAffaire;
    this.codeTypeAffaire = typeAffaire.id;
    this.typeAffaireObjet = typeAffaire;
    this.displayTypeAffaire = false;
  }
  getTypeAffaire() {
    this.crudservice.getLigneById("typeAffaire", this.codeTypeAffaire)
      .subscribe(data => {
        if (data.result != null) {

          console.log("****************************************************************");
          console.log(data.result);
          this.typeAffaireObjet = data.result;
          console.log("****************************************************************");
          console.log(this.typeAffaireObjet);
          this.typeAffaire = data.result.libelle_typeAffaire;
         
        } else {
          this.service.add({
            key: 'tst',
            severity: 'error',
            summary: '.   خطأ    ',
            detail: 'تثبت من رمز نوع القضية'
          });
          this.typeAffaire = ""
        }

      });
  }



  //--------------------------------------------------------------------------------------------------------------------------
  //------------------------------------------------------------tribunal 1-----------------------------------------------------------------------------------------------

  displayTribunal1: boolean;
  @Input()
  tribunal1 = "";
  @Input()
  codeTribunal1 = "";
  @Input()
  numAffaireT1: number;
  @Input()
  tribunal1Objet: Tribunal;

  showListTribunal1() {
    this.displayTribunal1 = true;
  }
  saveTribunal1(tribunal) {
    this.tribunal1 = tribunal.nom_tribunal;
    this.codeTribunal1 = tribunal.id;
    this.tribunal1Objet = tribunal;
    this.displayTribunal1 = false;
  }
  getTribunal1() {
    this.crudservice.getLigneById("tribunal", this.codeTribunal1)
      .subscribe(data => {
        if (data.result != null) {

          this.tribunal1Objet = data.result;
          console.log(data.result);
          this.tribunal1 = data.result.nom_tribunal;

        } else {
          this.service.add({
            key: 'tst',
            severity: 'error',
            summary: '.   خطأ    ',
            detail: 'تثبت من رمز المحكمة  '
          });
          this.tribunal1 = "";
          this.tribunal1Objet =null;
        }

      });
  }

  //--------------------------------------------------------------------------------------------------------------------------













  //------------------------------------------------------------tribunal 2-----------------------------------------------------------------------------------------------

  displayTribunal2: boolean;
  tribunal2 = "";
  codeTribunal2 = "";

  numAffaireT2: number;
  tribunal2Objet: Tribunal;

  showListTribunal2() {
    this.displayTribunal2 = true;
  }
  saveTribunal2(tribunal) {
    this.tribunal2 = tribunal.nom_tribunal;
    this.codeTribunal2 = tribunal.id;
    this.tribunal2Objet = tribunal;
    this.displayTribunal2 = false;
  }

  getTribunal2() {
    this.crudservice.getLigneById("tribunal", this.codeTribunal2)
      .subscribe(data => {
        if (data.result != null) {

          this.tribunal2Objet = data.result;

          this.tribunal2 = data.result.nom_tribunal;

        } else {
          this.service.add({
            key: 'tst',
            severity: 'error',
            summary: '.   خطأ    ',
            detail: 'تثبت من رمز المحكمة  '
          });
          this.tribunal2 = "";
          this.tribunal2Objet = undefined;
        }

      });
  }

  //--------------------------------------------------------------------------------------------------------------------------
  next() {

if(!this.tribunal1Objet || !this.numAffaireT1 ||
    (!this.tribunal2Objet && this.numAffaireT2) || 
    (this.tribunal2Objet && !this.numAffaireT2))  
{
  this.service.add({ key: 'tst', severity: 'error', summary: '.   خطأ    ', detail: ' عليك تثبت     '  });
}
else{
    // this.carteRecup = new CarteRecup();



    this.affaireIdOrigine = new AffaireId();
    this.affaireIdOrigine.idEnfant = this.enfantLocal.id;
    this.affaireIdOrigine.idTribunal = this.tribunal1Objet.id;
    this.affaireIdOrigine.numAffaire = this.numAffaireT1;

    this.affaireOrigine = new Affaire();
    this.affaireOrigine.arrestation = this.arrestation;
    this.affaireOrigine.tribunal = this.tribunal1Objet;
    this.affaireOrigine.affaireId = this.affaireIdOrigine;
    //---------------------------Chercher l'affaire origine existe  ou n'exist pas-------------------------------------------------------------------------------------
    this.crudservice.getLigneByAffaireId("affaire", this.affaireIdOrigine.idEnfant,
      this.affaireIdOrigine.numAffaire,
      this.affaireIdOrigine.idTribunal, this.arrestation.arrestationId.numOrdinale)
      .subscribe(data => {
        if (data.result) {
          console.log(data.result);
          //------------------- l'affaire origine existe ----------------------------------------------------------------------------------------- 
          this.affaireOrigine = new Affaire();
          this.affaireOrigine = data.result;
          console.log("-----------------------------------------");
          console.log(this.affaireOrigine);

          //--------------------deja update -------------------------------------------------------------------------------------
        
          if(this.update==false){
            this.nextBoolean = true;

          }
          else{ 
          //--------------------Chercher si l'affaire origine est un lien d'autre affaire ou n'est pas un lien d'une aucune affaire -------------------------------------------------------------------------------------                 
          this.crudservice.findAffaireByAffaireLien("affaire", this.affaireIdOrigine.idEnfant,
            this.affaireIdOrigine.numAffaire,
            this.affaireIdOrigine.idTribunal)
            .subscribe(data => {


              //-------------------- l'affaire origine est un lien d'autre affaire ------------------------ -------------------------------------------------------------------------------------                 
              if (data.result) {


                this.displayAlertAffaireOrigineLier = true;
              }
              //-------------------- l'affaire origine n'est pas un lien d'une aucune affaire ------------------------ --------------------------------------------------------------------------------------------                 
              else {



                //-------------------- Tester si l'affaire d'origine avoir un lien avec un autre affaire ou n'avoir pas un lien avec un  affaire  ------------------------ --------------------------------------------------------------------------------------------                 


                //-------------------- l'affaire d'origine avoir un lien avec un autre affaire  ------------------------ --------------------------------------------------------------------------------------------                 								
                if (this.affaireOrigine.affaireLien) {


                  //-------------------- Tester si les champs d'affaire de lien sont  remplis ou ne sont pas remplis  ------------------------ --------------------------------------------------------------------------------------------                 

                  if (this.tribunal2Objet && this.numAffaireT2) {
                    //--------------------  les champs d'affaire de lien sont  remplis  et l'affaire d'origine avoir un lien avec un autre affaire------------------- ------------------------ --------------------------------------------------------------------------------------------                 


                    //-------------------- Tester si les champs d'affaire de lien à saisir sont les memes que l'affaire  de lien reel ou nn ------------------------ --------------------------------------------------------------------------------------------                 

                    if ((this.affaireOrigine.affaireLien.affaireId.idTribunal != this.tribunal2Objet.id) ||
                      (this.affaireOrigine.affaireLien.affaireId.numAffaire != this.numAffaireT2)) {
                      //--------------------   les champs d'affaire de lien à saisir sont les memes que l'affaire  de lien reel  ------------------------ --------------------------------------------------------------------------------------------                 

                      this.displayAlertLienAutre = true;

                    } else {
                      //--------------------   les champs d'affaire de lien à saisir ne sont pas les memes que l'affaire  de lien reel  ------------------------ --------------------------------------------------------------------------------------------                 

                      this.displayAlertLienMeme = true;
                    }
                  } else {
                    //--------------------  les champs d'affaire de lien ne sont pas  remplis et l'affaire d'origine avoir un lien avec un autre affaire------------------- ------------------------ --------------------------------------------------------------------------------------------                 

                    this.displayAlertOrigineExistAvecLien = true;
                    //this.lien(); en view

                  }

                }

                //-------------------- l'affaire d'origine n'avoir pas un lien avec un  affaire   ------------------------ --------------------------------------------------------------------------------------------                 								
                else {
                  this.displayAlertOrigineExistSansLien = true;

                  if (this.tribunal2Objet && this.numAffaireT2) {
                    this.lienException();
                  }

                  else {
                    this.nextBoolean = true;
                  }
                  //this.lien(); en view


                }
              }
            });

          }
        } else {
          console.log(data.message);
          //------------------- l'affaire origine n'exist pas-------------------------------------------------------------------------
          this.lien();
        }
      });








    }
  }







  lienException() {
    this.tribunal2Objet = null;
    this.numAffaireT2 = null;
    this.tribunal2 = "";
    this.codeTribunal2 = "";
  }










  lien() {
    //-------------------- assuerer que l'affaire d'origine avoir l'arrestation actuel ------------------------ --------------------------------------------------------------------------------------------                 										
    //this.affaireOrigine.arrestation = this.arrestation;

    //-------------------- Tester si les champs d'affaire de lien sont  remplis ou ne sont pas remplis  ------------------------ --------------------------------------------------------------------------------------------                 

    //-------------------- --les champs d'affaire de lien sont  remplis   ------------------------ --------------------------------------------------------------------------------------------                 

    if (this.tribunal2Objet && this.numAffaireT2) {

      this.affaireIdLien = new AffaireId();
      this.affaireIdLien.idEnfant = this.enfantLocal.id;
      this.affaireIdLien.idTribunal = this.tribunal2Objet.id;
      this.affaireIdLien.numAffaire = this.numAffaireT2;


      //-------------------- --Chercher l'affaire de lien exisit ou n'existe pas   ------------------------ --------------------------------------------------------------------------------------------                 
      this.crudservice.getLigneByAffaireId("affaire", this.affaireIdLien.idEnfant,
        this.affaireIdLien.numAffaire, this.affaireIdLien.idTribunal, this.arrestation.arrestationId.numOrdinale)
        .subscribe(data => {


          //	this.affaireLien   = data.result[0]; 

          //-------------------- -l'affaire de lien exisit ------------------------ --------------------------------------------------------------------------------------------                 
          if (data.result) {


            this.affaireOrigine.affaireLien = data.result;;


            //--------------------Chercher si l'affaire de lien est un lien d'autre affaire ou n'est pas un lien d'une aucune affaire -------------------------------------------------------------------------------------                 
            this.crudservice.findAffaireByAffaireLien("affaire", this.affaireIdLien.idEnfant,
              this.affaireIdLien.numAffaire,
              this.affaireIdLien.idTribunal)
              .subscribe(data => {
                //-------------------- l'affaire de lien est un lien d'autre affaire ------------------------ -------------------------------------------------------------------------------------                 

                if (data.result) {

                  this.displayAlertAffaireLienLier = true;
                }

                //-------------------- l'affaire de lien n'est pas un lien d'autre affaire ------------------------ -------------------------------------------------------------------------------------                 
                else {

                  this.crudservice.verifierNumOrdinalAffaire("affaire", this.affaireOrigine, this.arrestation.arrestationId.numOrdinale)
                    .subscribe(data => {

                      this.affaireOrigine = data.result;

                      console.log(this.arrestation.arrestationId.numOrdinale);
                      // if (this.affaireLien.arrestation.arrestationId.numOrdinale != this.arrestation.arrestationId.numOrdinale) {
                      // 	this.displayAlertLienAutreArrestation = true;
                      // }

                      this.nextBoolean = true
                    });



                }
              });


          }
          //-------------------- --  l'affaire de lien  n'existe pas  ----------------------------------------------------------------------------------------------------------------------                 
          else {



            if (data.message == 1) {
              this.displayAlertLienAutreArrestation = true;
            }
            else {
              this.displayNext = true;
            }
            //this.accepter()  en view
          }

        });


    }


    //--------------------  les champs d'affaire de lien   ne sont pas remplis  ------------------------ --------------------------------------------------------------------------------------------                 
    else {

      this.affaireOrigine.affaireLien = null;



      this.crudservice.verifierNumOrdinalAffaire("affaire", this.affaireOrigine, this.arrestation.arrestationId.numOrdinale)
        .subscribe(data => {
          this.affaireOrigine = data.result;

        });
      this.nextBoolean = true
    }
  }





  accepter() {
    this.affaireLien = new Affaire();

    this.affaireLien.tribunal = this.tribunal2Objet;
    this.affaireLien.affaireId = this.affaireIdLien;
    this.affaireLien.affaireId.numOrdinaleArrestation = this.arrestation.arrestationId.numOrdinale;

    this.affaireLien.arrestation = this.arrestation;
    this.affaireOrigine.affaireLien = this.affaireLien;



    this.crudservice.verifierNumOrdinalAffaire("affaire", this.affaireOrigine, this.arrestation.arrestationId.numOrdinale)
      .subscribe(data => {

        this.affaireOrigine = data.result;

      });
    this.displayNext = false;
    this.nextBoolean = true;
  }


  return() {
    this.nextBoolean = false
  }
  showImg() {
    this.displayImg = true;

  }

  closeTitreAccusation() {
    this.displayAllTitreAccusation = false;

  } 
  onSubmit() {
    this.alertTypeAffaire="";
    
if(!this.dateEmission || !this.dateDepotCarte || !this.typeAffaireObjet || this.entitiesTitreAccusation.length==0)  
{
  this.service.add({ key: 'tst', severity: 'error', summary: '.   خطأ    ', detail: ' عليك تثبت     '  });
}
else{


 
  var found = false;
      for(var i = 0; i < this.entitiesTitreAccusation.length; i++) {
          if (this.entitiesTitreAccusation[i].typeAffaire.id == this.typeAffaireObjet.id) {
              found = true;
              break;
          }
      }


      if(found) {

        let maxObj = this.entitiesTitreAccusation.reduce((max, obj) => (max.typeAffaire.statutException > obj.typeAffaire.statutException) ? max : obj);
        
 


      if(maxObj.typeAffaire.id != this.typeAffaireObjet.id){
        this.alertTypeAffaire= ' ربما نوع القضية'+' '+maxObj.typeAffaire.libelle_typeAffaire+'!!';  
      }




    this.documentId = new DocumentId();
    this.documentId.idEnfant = this.enfantLocal.id;
    this.documentId.numOrdinalArrestation = this.arrestation.arrestationId.numOrdinale;
    this.documentId.numOrdinalAffaire = this.affaireOrigine.numOrdinalAffaire;
    this.documentId.numOrdinalDoc = this.numOrdinalDoc;

   


    this.crudservice.countDocumentByAffaire(this.arrestation.arrestationId.idEnfant, this.arrestation.arrestationId.numOrdinale, this.affaireOrigine.numOrdinalAffaire)
      .subscribe(data => {
        if(this.numDocumentByAffaire){
        
          this.documentId.numOrdinalDocByAffaire=this.numDocumentByAffaire;
        }
      else{
        this.numDocumentByAffaire=data.result + 1;

        this.documentId.numOrdinalDocByAffaire = data.result + 1;
      }
        

        this.carteHeber = new CarteHeber();
        this.carteHeber.documentId = this.documentId;
        this.carteHeber.typeDocument = "CH";

        this.carteHeber.affaire = this.affaireOrigine;

    

        this.carteHeber.dateEmission  = this.datepipe.transform( this.dateEmission , 'yyyy-MM-dd');
        this.carteHeber.dateDepotCarte = this.datepipe.transform( this.dateDepotCarte , 'yyyy-MM-dd');

        // this.carteHeber.dateDepotCarte = this.dateDepotCarte;
        // this.carteHeber.dateEmission = this.dateEmission;
        this.carteHeber.textJugement = this.textJugement;


        this.carteHeber.typeAffaire = this.typeAffaireObjet;

 
       
 
        

    
         

        this.carteHeber.numArrestation= this.residence.numArrestation;
        this.carteHeber.etablissement=this.residence.etablissement;
        this.carteHeber.personelle= this.token.getUser().personelle;
      

        this.carteHeber.dateInsertion=   this.datepipe.transform(
          new Date(),
           "yyyy-MM-dd"
         );
         this.carteHeber.entitiesTitreAccusation=this.entitiesTitreAccusation;


         this.showCarteHeber=true;

      

    
      });


     



    }
    else{
      this.service.add({ key: 'tst', severity: 'error', summary: '.   خطأ    ', detail: '      نوع القضية مختلف عن التهم   '  });
    }
    }

  }
  confirmer(){
         this.crudservice.createLigne("carteHeber", this.carteHeber)
          .subscribe(data => {
            this.accusationCarteHeberId = new AccusationCarteHeberId();
            this.accusationCarteHeberId.idEnfant = this.documentId.idEnfant;
            this.accusationCarteHeberId.numOrdinalArrestation = this.documentId.numOrdinalAffaire;
            this.accusationCarteHeberId.numOrdinalAffaire = this.documentId.numOrdinalAffaire;
            this.accusationCarteHeberId.numOrdinalDoc = this.documentId.numOrdinalDoc;
            this.accusationCarteHeberId.numOrdinalDocByAffaire=this.documentId.numOrdinalDocByAffaire
            


            for (var i = 0; i < this.entitiesTitreAccusation.length; i++) {
              this.accusationCarteHeberId.idTitreAccusation=this.entitiesTitreAccusation[i].id;
              this.accusationCarteHeber = new AccusationCarteHeber();
              this.accusationCarteHeber.accusationCarteHeberId = this.accusationCarteHeberId;
              console.log("okkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk");
              console.log(data.result);
              this.accusationCarteHeber.carteHeber=data.result;
              this.accusationCarteHeber.titreAccusation=this.entitiesTitreAccusation[i];
              console.log(this.accusationCarteHeberId);
              console.log(this.accusationCarteHeber);
              this.crudservice.createLigne("accusationCarteHeber", this.accusationCarteHeber)
               .subscribe(data => {
              
    console.log(data);
              })
            }
            
           

           

          });  
          
          
          this.showCarteHeber=false;
          this.isSaved=true;
          this.isExist=false;
          
          
  }
  showAllGouvernorat() {
      
        
    this.crudservice.getlistEntity("gouvernorat")
    .subscribe( data => {
      if(data.result){
     
        console.log(data.result)
    
        this.gouvernoratSwich= [];
        data.result.forEach((gouvernorat: Gouvernorat, value: any) => {
          this.gouvernoratSwich.push({ label: gouvernorat.libelle_gouvernorat, value: gouvernorat.libelle_gouvernorat });
  
         
        });
       
      }
      else{
        
        this.gouvernoratSwich= [];
        
     
      }
    
    });
  
  
  }
  showAllTypeTribunal() {
      
        
    this.crudservice.getlistEntity("typeTribunal")
    .subscribe( data => {
      if(data.result){
     
        console.log(data.result)
       
        this.typeTribunalSwich= [];
        data.result.forEach((typeTribunal: TypeTribunal, value: any) => {
          this.typeTribunalSwich.push({ label: typeTribunal.libelleTypeTribunal, value: typeTribunal.libelleTypeTribunal });
  
          
        });
       
      }
      else{
        
        this.typeTribunalSwich= [];
        
     
      }
    
    });
  
  
  }

  nav;
  onChangeDir( event) {

this.nav= event.value 

 }
 goTO() {

  window.localStorage.removeItem("idValideNav");

window.localStorage.setItem("idValideNav",  this.enfantLocal.id.toString());
this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([this.nav]);

}
// reglerDate(date){
//   const words =  date.split('/');
//   const x =  "/";
//   return  date =words[2]+x+words[1]+x+words[0];
// }
// reglerDateSql(date){
//   const words =  date.split('-');
//   const x =  "-";
//   return  date =words[2]+x+words[1]+x+words[0];
// }

showAllTypeAffaire() {
      
        
  this.crudservice.getlistEntity("typeAffaire")
  .subscribe( data => {
    if(data.result){
   
      console.log(data.result)
     
      this.typeAffaireSwich= [];
      
      data.result.forEach((typeAffaire: TypeAffaire, value: any) => {
        this.typeAffaireSwich.push({ label: typeAffaire.libelle_typeAffaire, value: typeAffaire.libelle_typeAffaire });
     
        
      });
     
    }
    else{
      
      this.typeAffaireSwich= [];
      
   
    }
  
  });


}
 
}
