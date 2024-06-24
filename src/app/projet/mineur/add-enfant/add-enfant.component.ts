import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { Router } from "@angular/router";
import { Enfant } from "src/app/domain/enfant";
import { CrudEnfantService } from "src/app/demo/service/crud-enfant.service";

import { DatePipe } from "@angular/common";
import { Nationalite } from "src/app/domain/nationalite";
import { MessageService } from "primeng/api";
import { NiveauEducatif } from "src/app/domain/niveauEducatif";
import { SituationFamiliale } from "src/app/domain/situationFamiliale";
import { Gouvernorat } from "src/app/domain/gouvernorat";
import { Delegation } from "src/app/domain/delegation";
import { ClassePenale } from "src/app/domain/classePenale";
import { Arrestation } from "src/app/domain/arrestation";
import { ArrestationId } from "src/app/domain/arrestationId";
import { Residence } from "src/app/domain/residence";
import { TokenStorageService } from "src/app/_services/token-storage.service";
import { ResidenceId } from "src/app/domain/residanceId";
import { Input } from "@angular/core";
import { MatStepper } from "@angular/material/stepper";
import { AllEnfantComponent } from "../all-enfant/all-enfant.component";
import { NgxImageCompressService } from "ngx-image-compress";
import { MAT_STEPPER_GLOBAL_OPTIONS } from "@angular/cdk/stepper";
import { Metier } from "src/app/domain/metier";
import { SituationSocial } from "src/app/domain/situationSocial";
import { EnfantAddDTO } from "src/app/domain/enfantAddDTO";

@Component({
  selector: "app-add-enfant",
  templateUrl: "./add-enfant.component.html",
  styleUrls: ["./add-enfant.component.scss"],
  providers: [
    MessageService,
    {
      provide: MAT_STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    },
  ],
})
export class AddEnfantComponent implements OnInit {
  @ViewChild("stepper") private myStepper: MatStepper;

  message: string;
  imagePath: any;
  url: string | ArrayBuffer;
  files: any;
  addForm1: FormGroup;
  addForm2: FormGroup;
  addForm3: FormGroup;
  enfantLocal = new Enfant();
  enfantSubmit = new Enfant();
  arrestation = new Arrestation();
  arrestationId = new ArrestationId();
  residenceId = new ResidenceId();
  residence = new Residence();

  display: boolean;
  faux = false;
  displayNationalite: boolean;
  displayNiveauEducatif: boolean;
  displaySituationFamiliale: boolean;
  displaySituationSocial: boolean;
  displayGouvernorat: boolean;
  displayMetier: boolean;
  displayDelegation: boolean;
  displayClassePenale: boolean;

  entitiesNationalite: Nationalite[];
  entitiesNiveauEducatif: NiveauEducatif[];
  entitiesSituationFamiliale: SituationFamiliale[];
  entitiesGouvernorat: Gouvernorat[];
  entitiesDelegation: Delegation[];
  entitiesClassePenale: ClassePenale[];
  entitiesSituationSocial: SituationSocial[];
  entitiesMetier: Metier[];
  currentUser: any;
  arrestationValide: Arrestation;

  path: string;
  centre = "";
  numOrdinale = "";
  numArrestation = "";
  dateEntreLocal;

  @Input()
  residenceEdit: Residence;
  @Input()
  update = false;
  booleanAge = true;
  alertAge = "";
  ageEnfant = "";
  showBeforSave = false;
  years = "";
  calendar_ar: any;
  @Output() refreshEvent = new EventEmitter<string>();

  @Output() pathEvent = new EventEmitter<string>();

  constructor(
    private formBuilder: FormBuilder,
    private service: MessageService,
    private token: TokenStorageService,
    private router: Router,
    private crudservice: CrudEnfantService,
    public datepipe: DatePipe,
    private imageCompress: NgxImageCompressService
  ) {}

  refresh(value: string) {
    this.refreshEvent.emit(value);
  }

  @Input()
  nom: any;
  @Input()
  prenom: any;
  @Input()
  nomPere: any;
  @Input()
  nomGrandPere: any;
  @Input()
  nomMere: any;
  @Input()
  prenomMere: any;

  initialized = false;

  ngOnInit(): void {
    this.initialized = true;
    this.currentUser = this.token.getUser();

    this.crudservice.getlistEntity("nationalite").subscribe((data) => {
      this.entitiesNationalite = data.result;
    });

    this.crudservice.getlistEntity("niveauEducatif").subscribe((data) => {
      this.entitiesNiveauEducatif = data.result;
    });

    this.crudservice.getlistEntity("situationFamiliale").subscribe((data) => {
      this.entitiesSituationFamiliale = data.result;
    });

    this.crudservice.getlistEntity("gouvernorat").subscribe((data) => {
      this.entitiesGouvernorat = data.result;
    });

    this.crudservice.getlistEntity("classePenale").subscribe((data) => {
      this.entitiesClassePenale = data.result;
    });

    this.crudservice.getlistEntity("situationSocial").subscribe((data) => {
      this.entitiesSituationSocial = data.result;
    });
    this.crudservice.getlistEntity("metier").subscribe((data) => {
      this.entitiesMetier = data.result;
    });

    this.calendar_ar = {
      closeText: "Fermer",
      prevText: "Précédent",
      nextText: "Suivant",
      currentText: "Aujourd'hui",
      monthNames: [
        "  جانفــــي  ",

        "   فيفـــري   ",
        "  مــــارس  ",
        "  أفريــــل  ",
        "  مــــاي  ",
        "  جــــوان  ",
        "  جويليــــة  ",
        "  أوت  ",
        "  سبتمبــــر  ",
        "  أكتوبــــر  ",
        "  نوفمبــــر  ",
        "  ديسمبــــر  ",
      ],
      monthNamesShort: [
        "janv.",
        "févr.",
        "mars",
        "avr.",
        "mai",
        "juin",
        "juil.",
        "août",
        "sept.",
        "oct.",
        "nov.",
        "déc.",
      ],
      dayNames: [
        "dimanche",
        "lundi",
        "mardi",
        "mercredi",
        "jeudi",
        "vendredi",
        "samedi",
      ],
      dayNamesShort: ["dim.", "lun.", "mar.", "mer.", "jeu.", "ven.", "sam."],
      dayNamesMin: ["D", "L", "M", "M", "J", "V", "S"],
      weekHeader: "Sem.",
      dateFormat: "dd/mm/yy",
      firstDay: 1,
      isRTL: false,
      showMonthAfterYear: true,
      yearSuffix: "",
    };

    this.years =
      this.years +
      (new Date().getFullYear() - 5) +
      ":" +
      new Date().getFullYear();

    this.addForm1 = this.formBuilder.group({
      nom: ["", Validators.required],
      prenom: ["", Validators.required],
      nomPere: ["", Validators.required],
      nomGrandPere: ["", Validators.required],
      nomMere: ["", Validators.required],
      prenomMere: ["", Validators.required],
      dateNaissance: ["", Validators.required],
      lieuNaissance: ["", Validators.required],
      nationaliteCode: ["", Validators.required],
      nationaliteLibelle: ["", Validators.required],
      sexe: ["", Validators.required],
    });
    this.addForm2 = this.formBuilder.group({
      niveauEducatifCode: ["", Validators.required],
      niveauEducatifLibelle: ["", Validators.required],

      situationFamilialeCode: ["", Validators.required],
      situationFamilialeLibelle: ["", Validators.required],

      nombreFreres: ["", Validators.required],

      gouvernoratCode: ["", Validators.required],
      gouvernoratLibelle: ["", Validators.required],

      metierCode: ["", Validators.required],
      metierLibelle: ["", Validators.required],

      delegationCode: ["", Validators.required],
      delegationLibelle: ["", Validators.required],
      adresse: ["", Validators.required],
      nbrEnfant: ["", Validators.required],
      situationSocialCode: ["", Validators.required],
      situationSocialLibelle: ["", Validators.required],
    });
    this.addForm3 = this.formBuilder.group({
      classePenaleCode: ["", Validators.required],
      classePenaleLibelle: ["", Validators.required],

      surnom: [""],
      alias: [""],

      numArrestation: ["", Validators.required],
      dateEntreLocal: ["", Validators.required],
    });

    if (this.update) {
      this.addForm1.patchValue({
        nom: this.residenceEdit.arrestation.enfant.nom,
        prenom: this.residenceEdit.arrestation.enfant.prenom,

        nomPere: this.residenceEdit.arrestation.enfant.nomPere,
        nomGrandPere: this.residenceEdit.arrestation.enfant.nomGrandPere,
        nomMere: this.residenceEdit.arrestation.enfant.nomMere,
        prenomMere: this.residenceEdit.arrestation.enfant.prenomMere,
        dateNaissance: this.reglerDateSql(
          this.residenceEdit.arrestation.enfant.dateNaissance
        ),
        lieuNaissance: this.residenceEdit.arrestation.enfant.lieuNaissance,
        nationaliteCode: this.residenceEdit.arrestation.enfant.nationalite.id,
        nationaliteLibelle:
          this.residenceEdit.arrestation.enfant.nationalite.libelle_nationalite,
        sexe: this.residenceEdit.arrestation.enfant.sexe,
      });

      this.addForm2.patchValue({
        niveauEducatifCode:
          this.residenceEdit.arrestation.enfant.niveauEducatif.id,
        niveauEducatifLibelle:
          this.residenceEdit.arrestation.enfant.niveauEducatif
            .libelle_niveau_educatif,

        situationFamilialeCode:
          this.residenceEdit.arrestation.enfant.situationFamiliale.id,
        situationFamilialeLibelle:
          this.residenceEdit.arrestation.enfant.situationFamiliale
            .libelle_situation_familiale,

        nombreFreres: this.residenceEdit.arrestation.enfant.nombreFreres,

        metierCode: this.residenceEdit.arrestation.enfant?.metier?.id,
        metierLibelle:
          this.residenceEdit.arrestation.enfant?.metier?.libelle_metier,

        gouvernoratCode: this.residenceEdit.arrestation.enfant.gouvernorat.id,
        gouvernoratLibelle:
          this.residenceEdit.arrestation.enfant.gouvernorat.libelle_gouvernorat,

        delegationCode: this.residenceEdit.arrestation.enfant.delegation.id,
        delegationLibelle:
          this.residenceEdit.arrestation.enfant.delegation.libelle_delegation,
        adresse: this.residenceEdit.arrestation.enfant.adresse,
        nbrEnfant: this.residenceEdit.arrestation.enfant.nbrEnfant,
        situationSocialCode:
          this.residenceEdit.arrestation.enfant?.situationSocial?.id,
        situationSocialLibelle:
          this.residenceEdit.arrestation.enfant?.situationSocial
            ?.libelle_situation_social,
      });

      this.addForm3.patchValue({
        classePenaleCode: this.residenceEdit.arrestation.enfant.classePenale.id,
        classePenaleLibelle:
          this.residenceEdit.arrestation.enfant.classePenale
            .libelle_classe_penale,

        surnom: this.residenceEdit.arrestation.enfant.surnom,
        alias: this.residenceEdit.arrestation.enfant.alias,

        numArrestation: this.residenceEdit.numArrestation,
        dateEntreLocal: new Date(this.residenceEdit.dateEntree),
      });
      //   this.url = this.residenceEdit.arrestation.enfant.img;
      this.getPhotoById(
        this.residenceEdit.arrestation.arrestationId.idEnfant,
        this.residenceEdit.arrestation.arrestationId.numOrdinale
      );
      if (this.myStepper) {
        this.myStepper.selectedIndex = 0;
      }
      this.enfantLocal.delegation =
        this.residenceEdit.arrestation.enfant.delegation;
      this.enfantLocal.gouvernorat =
        this.residenceEdit.arrestation.enfant.gouvernorat;
      this.enfantLocal.nationalite =
        this.residenceEdit.arrestation.enfant.nationalite;
      this.enfantLocal.niveauEducatif =
        this.residenceEdit.arrestation.enfant.niveauEducatif;
      this.enfantLocal.situationFamiliale =
        this.residenceEdit.arrestation.enfant.situationFamiliale;
      this.enfantLocal.classePenale =
        this.residenceEdit.arrestation.enfant.classePenale;
      this.enfantLocal.situationSocial =
        this.residenceEdit.arrestation.enfant.situationSocial;
      this.enfantLocal.metier = this.residenceEdit.arrestation.enfant.metier;
    }
  }

  cancel() {
    this.display = false;
  }

  // ok(){

  //   console.log(this.nom)
  //       console.log(this.prenom)
  //       console.log(this.nomPere)
  //       console.log(this.nomGrandPere)
  //       console.log(this.nomMere)
  //       console.log(this.prenomMere)
  //        this.addForm1.get('nom').setValue(this.nom);
  //        this.addForm1.get('prenom').setValue(this.prenom);
  //        this.addForm1.get('nomPere').setValue(this.nomPere);
  //        this.addForm1.get('nomGrandPere').setValue(this.nomGrandPere);
  //        this.addForm1.get('nomMere').setValue(this.nomMere);
  //        this.addForm1.get('prenomMere').setValue(this.prenomMere);
  // }

  charger() {
    let arrestation = new Arrestation();
    let arrestationId = new ArrestationId();
    let residenceId = new ResidenceId();
    let residence = new Residence();
    let enfantAddDTO = new EnfantAddDTO();

    this.enfantSubmit = this.addForm1.value;
    this.enfantSubmit.id = this.residenceEdit.arrestation.enfant.id;
    console.log(
      this.addForm1.get("dateNaissance").value +
        " " +
        "aaaazzzzzzzzzzzzzzzzzzzz"
    );
    this.enfantSubmit.dateNaissance = this.datepipe.transform(
      this.reglerDate(this.addForm1.get("dateNaissance").value),
      "yyyy-MM-dd"
    );

    this.enfantSubmit.nombreFreres = this.addForm2.get("nombreFreres").value;
    this.enfantSubmit.adresse = this.addForm2.get("adresse").value;
    this.enfantSubmit.surnom = this.addForm3.get("surnom").value;
    this.enfantSubmit.alias = this.addForm3.get("alias").value;
    this.enfantSubmit.delegation = this.enfantLocal.delegation;
    this.enfantSubmit.gouvernorat = this.enfantLocal.gouvernorat;
    this.enfantSubmit.nationalite = this.enfantLocal.nationalite;
    this.enfantSubmit.niveauEducatif = this.enfantLocal.niveauEducatif;
    this.enfantSubmit.situationFamiliale = this.enfantLocal.situationFamiliale;
    this.enfantSubmit.classePenale = this.enfantLocal.classePenale;
    this.enfantSubmit.situationSocial = this.enfantLocal.situationSocial;
    this.enfantSubmit.metier = this.enfantLocal.metier;

    enfantAddDTO.enfant = this.enfantSubmit;
    if (this.url) {
      this.enfantSubmit.img = this.url;
    } else {
      this.enfantSubmit.img = this.residenceEdit.arrestation.enfant.img;
    }
    console.log(this.enfantSubmit);
    // this.currentUser.personelle.etablissement.id

    if (this.enfantSubmit.img) {
      this.crudservice.updateEnfantDTO(this.enfantSubmit).subscribe((data) => {
        // this.enfantSubmit.img = this.imgResultAfterCompress;
        console.log(data.message);

        arrestationId = this.residenceEdit.arrestation.arrestationId;
        arrestation.arrestationId = arrestationId;
        console.log(this.addForm3.get("dateEntreLocal").value);
        arrestation.date = this.datepipe.transform(
          new Date(this.addForm3.get("dateEntreLocal").value),
          "yyyy-MM-dd"
        );

        arrestation.enfant = data.result;

        arrestation.numAffairePricipale =
          this.residenceEdit.arrestation.numAffairePricipale;

        residenceId = this.residenceEdit.residenceId;
        residence.etablissement = this.residenceEdit.etablissement;
        this.crudservice
          .updateLigne("arrestation", arrestation)
          .subscribe((data) => {
            residence.residenceId = residenceId;
            residence.arrestation = data.result;
            residence.numArrestation =
              this.addForm3.get("numArrestation").value;
            residence.dateEntree = data.result.date;

            this.dateEntreLocal = data.result.date;
            this.numOrdinale = data.result.arrestationId.numOrdinale;

            this.crudservice
              .updateLigne("residence", residence)
              .subscribe((data) => {
                this.refresh(this.enfantSubmit.id);
              });
          });
      });
    } else {
      alert("الرجاء إضافة صورة");
    }
  }

  // onSubmit(path) {
  //   this.showBeforSave = true;

  //   this.enfantSubmit = this.addForm1.value;
  //   this.enfantSubmit.dateNaissance = this.datepipe.transform(
  //     this.reglerDate(this.addForm1.get("dateNaissance").value),
  //     "yyyy-MM-dd"
  //   );
  //   this.enfantSubmit.nombreFreres = this.addForm2.get("nombreFreres").value;
  //   this.enfantSubmit.adresse = this.addForm2.get("adresse").value;
  //   this.enfantSubmit.surnom = this.addForm3.get("surnom").value;
  //   this.enfantSubmit.alias = this.addForm3.get("alias").value;
  //   this.enfantSubmit.delegation = this.enfantLocal.delegation;
  //   this.enfantSubmit.gouvernorat = this.enfantLocal.gouvernorat;
  //   this.enfantSubmit.nationalite = this.enfantLocal.nationalite;
  //   this.enfantSubmit.niveauEducatif = this.enfantLocal.niveauEducatif;
  //   this.enfantSubmit.situationFamiliale = this.enfantLocal.situationFamiliale;
  //   this.enfantSubmit.classePenale = this.enfantLocal.classePenale;
  //   this.enfantSubmit.situationSocial = this.enfantLocal.situationSocial;
  //   this.enfantSubmit.metier = this.enfantLocal.metier;
  //   this.enfantSubmit.img = this.imgResultAfterCompress;

  //   this.crudservice
  //     .addEnfant(
  //       this.currentUser.personelle.etablissement.id,
  //       this.enfantSubmit
  //     )
  //     .subscribe((data) => {
  //       if (data.result != null) {
  //         this.enfantSubmit = data.result;
  //         this.arrestationId.idEnfant = this.enfantSubmit.id;
  //         this.arrestationId.numOrdinale = 1;

  //         this.arrestation.arrestationId = this.arrestationId;
  //         this.arrestation.date = this.datepipe.transform(
  //           this.addForm3.get("dateEntreLocal").value,
  //           "yyyy-MM-dd"
  //         );
  //         this.arrestation.enfant = this.enfantSubmit;
  //         this.arrestation.numAffairePricipale = "0";

  //         this.crudservice
  //           .createLigne("arrestation", this.arrestation)
  //           .subscribe((data) => {
  //             if (data.result != null) {
  //               this.arrestation = data.result;
  //               this.residenceId.idEnfant = this.enfantSubmit.id;
  //               this.residenceId.numOrdinaleArrestation =
  //                 this.arrestation.arrestationId.numOrdinale;
  //               this.residenceId.numOrdinaleResidence = 1;

  //               this.residence.residenceId = this.residenceId;
  //               this.residence.arrestation = this.arrestation;
  //               this.residence.numArrestation =
  //                 this.addForm3.get("numArrestation").value;
  //               this.residence.dateEntree = this.arrestation.date;
  //               this.residence.etablissement =
  //                 this.currentUser.personelle.etablissement;
  //               // this.residence.numArrestation = this.numArrestation;

  //               this.dateEntreLocal = this.arrestation.date;
  //               this.numOrdinale = this.arrestation.arrestationId.numOrdinale;
  //               this.arrestationValide = this.arrestation;

  //               this.crudservice
  //                 .createLigne("residence", this.residence)
  //                 .subscribe((data) => {
  //                   if (data.result != null) {
  //                     this.residence = data.result;
  //                     this.centre =
  //                       data.result.etablissement.libelle_etablissement;
  //                     this.numArrestation = data.result.numArrestation;
  //                     this.path = path;
  //                     setTimeout(() => {
  //                       if (
  //                         data.result != null &&
  //                         this.arrestationValide != null
  //                       ) {
  //                         this.display = true;
  //                       } else {
  //                         alert("Montassar");
  //                       }
  //                     }, 500);
  //                   } else {
  //                     console.error("errer save in spring residance");
  //                   }
  //                 });
  //             } else {
  //               console.error("errer save in spring arrestation");
  //             }
  //           });
  //       } else {
  //         console.error("errer save in spring enfant");
  //       }
  //     });
  // }

  // async onSubmit(path) {
  //   let enfantAddDTO = new EnfantAddDTO();
  //   // information pour l'enfant
  //   this.enfantSubmit = this.addForm1.value;
  //   this.enfantSubmit.dateNaissance = this.datepipe.transform(
  //     this.reglerDate(this.addForm1.get("dateNaissance").value),
  //     "yyyy-MM-dd"
  //   );
  //   this.enfantSubmit.nombreFreres = this.addForm2.get("nombreFreres").value;
  //   this.enfantSubmit.adresse = this.addForm2.get("adresse").value;
  //   this.enfantSubmit.surnom = this.addForm3.get("surnom").value;
  //   this.enfantSubmit.alias = this.addForm3.get("alias").value;
  //   this.enfantSubmit.delegation = this.enfantLocal.delegation;
  //   this.enfantSubmit.gouvernorat = this.enfantLocal.gouvernorat;
  //   this.enfantSubmit.nationalite = this.enfantLocal.nationalite;
  //   this.enfantSubmit.niveauEducatif = this.enfantLocal.niveauEducatif;
  //   this.enfantSubmit.situationFamiliale = this.enfantLocal.situationFamiliale;
  //   this.enfantSubmit.classePenale = this.enfantLocal.classePenale;
  //   this.enfantSubmit.situationSocial = this.enfantLocal.situationSocial;
  //   this.enfantSubmit.metier = this.enfantLocal.metier;

  //   enfantAddDTO.enfant = this.enfantSubmit;

  //   // information pour l'image

  //   enfantAddDTO.img = this.url;

  //   // information pour l'arrestation

  //   this.arrestation.arrestationId = this.arrestationId;
  //   this.arrestation.date = this.datepipe.transform(
  //     this.addForm3.get("dateEntreLocal").value,
  //     "yyyy-MM-dd"
  //   );
  //   this.arrestation.numAffairePricipale = "0";

  //   enfantAddDTO.arrestation = this.arrestation;
  //   // information pour la residence
  //   this.residence.numArrestation = this.addForm3.get("numArrestation").value;
  //   this.residence.dateEntree = this.arrestation.date;
  //   this.residence.etablissement = this.currentUser.personelle.etablissement;

  //   enfantAddDTO.residence = this.residence;
  //   enfantAddDTO.etablissement = this.currentUser.personelle.etablissement;

  //   // console.log(this.residenceEdit);
  //   //    enfantAddDTO.enfant.id =
  //   //     this.residenceEdit.arrestation.enfant.id;
  //   // enfantAddDTO.arrestation.arrestationId =
  //   //   this.residenceEdit.arrestation.arrestationId;
  //   // enfantAddDTO.arrestation.enfant = this.residenceEdit.arrestation.enfant;
  //   // enfantAddDTO.residence.residenceId = this.residenceEdit.residenceId;

  // //  this.crudservice.addEnfantDTO(enfantAddDTO).subscribe((data) => {
  //     // if (data.result != null) {
  //     //   console.log(data.result);
  //     // } else {
  //     //   this.service.add({
  //     //     key: "tst",
  //     //     severity: "error",
  //     //     summary: ".   خطأ    ",
  //     //     detail: "تثبت   رمز    ",
  //     //   });
  //     // }
  //  // });
  // }
  async creerEnfantAssDTO(): Promise<EnfantAddDTO> {
    let enfantAddDTO = new EnfantAddDTO();

    // Informations sur l'enfant
    // let enfant = new Enfant();
    this.enfantSubmit.dateNaissance = this.datepipe.transform(
      this.reglerDate(this.addForm1.get("dateNaissance").value),
      "yyyy-MM-dd"
    );

    this.showBeforSave = true;

    this.enfantSubmit = this.addForm1.value;
    this.enfantSubmit.dateNaissance = this.datepipe.transform(
      this.reglerDate(this.addForm1.get("dateNaissance").value),
      "yyyy-MM-dd"
    );
    this.enfantSubmit.nombreFreres = this.addForm2.get("nombreFreres").value;
    this.enfantSubmit.adresse = this.addForm2.get("adresse").value;
    this.enfantSubmit.surnom = this.addForm3.get("surnom").value;
    this.enfantSubmit.alias = this.addForm3.get("alias").value;
    this.enfantSubmit.delegation = this.enfantLocal.delegation;
    this.enfantSubmit.gouvernorat = this.enfantLocal.gouvernorat;
    this.enfantSubmit.nationalite = this.enfantLocal.nationalite;
    this.enfantSubmit.niveauEducatif = this.enfantLocal.niveauEducatif;
    this.enfantSubmit.situationFamiliale = this.enfantLocal.situationFamiliale;
    this.enfantSubmit.classePenale = this.enfantLocal.classePenale;
    this.enfantSubmit.situationSocial = this.enfantLocal.situationSocial;
    this.enfantSubmit.metier = this.enfantLocal.metier;
    enfantAddDTO.enfant = this.enfantSubmit;

    // Information sur l'image
    enfantAddDTO.img = this.url;

    // Information sur l'arrestation
    let arrestation = new Arrestation();
    arrestation.arrestationId = this.arrestationId;
    arrestation.date = this.datepipe.transform(
      this.addForm3.get("dateEntreLocal").value,
      "yyyy-MM-dd"
    );
    arrestation.numAffairePricipale = "0";
    enfantAddDTO.arrestation = arrestation;

    // Information sur la résidence
    let residence = new Residence();
    residence.numArrestation = this.addForm3.get("numArrestation").value;
    residence.dateEntree = arrestation.date;
    residence.etablissement = this.currentUser.personelle.etablissement;
    enfantAddDTO.residence = residence;

    enfantAddDTO.etablissement = this.currentUser.personelle.etablissement;
    if (this.residenceEdit) {
      console.error(this.residenceEdit);
      enfantAddDTO.enfant.id = this.residenceEdit.arrestation.enfant.id;
      let arrestationId = new ArrestationId();

      arrestationId.idEnfant =
        this.residenceEdit.arrestation.arrestationId.idEnfant;

      arrestationId.numOrdinale =
        this.residenceEdit.arrestation.arrestationId.numOrdinale;

      enfantAddDTO.arrestation.arrestationId = arrestationId;

      let residenceId = new ResidenceId();
      residenceId.idEnfant = this.residenceEdit.residenceId.idEnfant;
      residenceId.numOrdinaleArrestation =
        this.residenceEdit.residenceId.numOrdinaleArrestation;
      residenceId.numOrdinaleResidence =
        this.residenceEdit.residenceId.numOrdinaleResidence;

      enfantAddDTO.residence.residenceId = residenceId;
    }
    return enfantAddDTO;
  }
  async sauvegarderEnfant(enfantAddDTO: EnfantAddDTO): Promise<void> {
    try {
      const data = await this.crudservice
        .addEnfantDTO(enfantAddDTO)
        .toPromise();
      // if (data.result != null) {
      //   console.log(data.result);
      // } else {
      //   this.service.add({
      //     key: "tst",
      //     severity: "error",
      //     summary: ".   خطأ    ",
      //     detail: "تثبت   رمز    ",
      //   });
      // }

      if (data.result != null) {
        this.residence = data.result;
        this.centre = data.result.etablissement.libelle_etablissement;
        this.numArrestation = data.result.numArrestation;
        this.arrestationValide = this.residence.arrestation;
        // this.path = path;
        //   setTimeout(() => {
        if (data.result != null && this.arrestationValide != null) {
          this.display = true;
        } else {
          alert("Montassar");
        }
        //    }, 500);
      } else {
        console.log(data);
        console.error(
          "erreur lors de la sauvegarde de la résidence dans Spring"
        );
      }
    } catch (error) {
      // Gérer les erreurs de sauvegarde
      console.error(
        "Une erreur s'est produite lors de la sauvegarde de l'enfant :",
        error
      );
      // Afficher un message d'erreur à l'utilisateur si nécessaire
    }
  }
  async modifierEnfant(enfantAddDTO: EnfantAddDTO): Promise<void> {
    try {
      const data = await this.crudservice
        .updateEnfantDTO(enfantAddDTO)
        .toPromise();

      if (data.result != null) {
        this.refresh(data.result.residenceId.idEnfant);
      } else {
        console.log(data);
        console.error(
          "erreur lors de la sauvegarde de la résidence dans Spring"
        );
      }
    } catch (error) {
      // Gérer les erreurs de sauvegarde
      console.error(
        "Une erreur s'est produite lors de la sauvegarde de l'enfant :",
        error
      );
      // Afficher un message d'erreur à l'utilisateur si nécessaire
    }
  }
  async onSubmit(path): Promise<void> {
    try {
      this.path = path;
      let enfantAddDTO = await this.creerEnfantAssDTO();
      await this.sauvegarderEnfant(enfantAddDTO);
    } catch (error) {
      // Gérer les erreurs de soumission
      console.error("Une erreur s'est produite lors de la soumission :", error);
      // Afficher un message d'erreur à l'utilisateur si nécessaire
    }
  }
  async onUpdate(): Promise<void> {
    try {
      console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
      let enfantAddDTO = await this.creerEnfantAssDTO();
      await this.modifierEnfant(enfantAddDTO);
    } catch (error) {
      // Gérer les erreurs de soumission
      console.error("Une erreur s'est produite lors de la soumission :", error);
      // Afficher un message d'erreur à l'utilisateur si nécessaire
    }
  }

  //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  //------------------------------------------------------------nationalite--------------------------------------------------------------------------------------------------

  saveNationalite(nationalite) {
    this.addForm1.get("nationaliteCode").setValue(nationalite.id);
    this.enfantLocal.nationalite = nationalite;
    this.addForm1
      .get("nationaliteLibelle")
      .setValue(nationalite.libelle_nationalite);
    this.displayNationalite = false;
  }
  showListNationalite() {
    this.displayNationalite = true;
  }
  getNationalite() {
    this.crudservice
      .getLigneById("nationalite", this.addForm1.get("nationaliteCode").value)
      .subscribe((data) => {
        if (data.result != null) {
          this.enfantLocal.nationalite = data.result;
          this.addForm1
            .get("nationaliteLibelle")
            .setValue(data.result.libelle_nationalite);
        } else {
          this.service.add({
            key: "tst",
            severity: "error",
            summary: ".   خطأ    ",
            detail: "تثبت من رمز الجنسية  ",
          });
          this.addForm2.get("nationaliteLibelle").setValue("");
        }
      });
  }

  //------------------------------------------------------------------------------------------------------------------------ --------------------------------------------------------------------------------------------------

  //------------------------------------------------------------situationFamiliale--------------------------------------------------------------------------------------------------

  saveSituationFamiliale(situationFamiliale) {
    this.addForm2.get("situationFamilialeCode").setValue(situationFamiliale.id);
    this.enfantLocal.situationFamiliale = situationFamiliale;
    this.addForm2
      .get("situationFamilialeLibelle")
      .setValue(situationFamiliale.libelle_situation_familiale);
    this.displaySituationFamiliale = false;
  }
  showListSituationFamiliale() {
    this.displaySituationFamiliale = true;
  }
  getSituationFamiliale() {
    this.crudservice
      .getLigneById(
        "situationFamiliale",
        this.addForm2.get("situationFamilialeCode").value
      )
      .subscribe((data) => {
        if (data.result != null) {
          this.enfantLocal.situationFamiliale = data.result;
          this.addForm2
            .get("situationFamilialeLibelle")
            .setValue(data.result.libelle_situation_familiale);
        } else {
          this.service.add({
            key: "tst",
            severity: "error",
            summary: ".   خطأ    ",
            detail: "تثبت من رمز الحالة العائلية  ",
          });
          this.addForm2.get("situationFamilialeLibelle").setValue("");
        }
      });
  }
  //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  //------------------------------------------------------------situationSocial--------------------------------------------------------------------------------------------------

  saveSituationSocial(situationSocial) {
    this.addForm2.get("situationSocialCode").setValue(situationSocial.id);
    this.enfantLocal.situationSocial = situationSocial;
    this.addForm2
      .get("situationSocialLibelle")
      .setValue(situationSocial.libelle_situation_social);
    this.displaySituationSocial = false;
  }
  showListSituationSocial() {
    this.displaySituationSocial = true;
  }
  getSituationSocial() {
    this.crudservice
      .getLigneById(
        "situationSocial",
        this.addForm2.get("situationSocialCode").value
      )
      .subscribe((data) => {
        if (data.result != null) {
          this.enfantLocal.situationSocial = data.result;
          this.addForm2
            .get("situationSocialLibelle")
            .setValue(data.result.libelle_situation_social);
        } else {
          this.service.add({
            key: "tst",
            severity: "error",
            summary: ".   خطأ    ",
            detail: "تثبت من رمز الحالة الإجتمـاعيـــة  ",
          });
          this.addForm1.get("situationSocialLibelle").setValue("");
        }
      });
  }
  //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  //------------------------------------------------------------gouvernerat--------------------------------------------------------------------------------------------------

  saveMetier(metier) {
    this.addForm2.get("metierCode").setValue(metier.id);
    this.enfantLocal.metier = metier;
    this.addForm2.get("metierLibelle").setValue(metier.libelle_metier);

    this.displayMetier = false;
  }
  showListMetier() {
    this.displayMetier = true;
  }
  getMetier() {
    this.crudservice
      .getLigneById("metier", this.addForm2.get("metierCode").value)
      .subscribe((data) => {
        if (data.result != null) {
          this.enfantLocal.metier = data.result;
          this.addForm2
            .get("metierLibelle")
            .setValue(data.result.libelle_metier);
        } else {
          this.service.add({
            key: "tst",
            severity: "error",
            summary: ".   خطأ    ",
            detail: "تثبت من رمز المهنة  ",
          });
          this.addForm2.get("metierLibelle").setValue("");
        }
      });
  }

  //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  //------------------------------------------------------------gouvernerat--------------------------------------------------------------------------------------------------

  saveGouvernorat(gouvernorat) {
    this.addForm2.get("gouvernoratCode").setValue(gouvernorat.id);
    this.enfantLocal.gouvernorat = gouvernorat;
    this.addForm2
      .get("gouvernoratLibelle")
      .setValue(gouvernorat.libelle_gouvernorat);
    this.addForm2.get("delegationCode").setValue("");
    this.addForm2.get("delegationLibelle").setValue("");
    this.displayGouvernorat = false;
  }
  showListGouvernorat() {
    this.displayGouvernorat = true;
  }
  getGouvernorat() {
    this.crudservice
      .getLigneById("gouvernorat", this.addForm2.get("gouvernoratCode").value)
      .subscribe((data) => {
        if (data.result != null) {
          this.enfantLocal.gouvernorat = data.result;
          this.addForm2
            .get("gouvernoratLibelle")
            .setValue(data.result.libelle_gouvernorat);
        } else {
          this.service.add({
            key: "tst",
            severity: "error",
            summary: ".   خطأ    ",
            detail: "تثبت من رمز الولاية  ",
          });
          this.addForm2.get("gouvernoratLibelle").setValue("");
        }
        this.addForm2.get("delegationCode").setValue("");
        this.addForm2.get("delegationLibelle").setValue("");
      });
  }

  //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  //------------------------------------------------------------niveauEducatif --------------------------------------------------------------------------------------------------
  saveNiveauEducatif(niveauEducatif) {
    this.addForm2.get("niveauEducatifCode").setValue(niveauEducatif.id);
    this.enfantLocal.niveauEducatif = niveauEducatif;
    this.addForm2
      .get("niveauEducatifLibelle")
      .setValue(niveauEducatif.libelle_niveau_educatif);
    this.displayNiveauEducatif = false;
  }
  showListNiveauEducatif() {
    this.displayNiveauEducatif = true;
  }
  getNiveauEducatif() {
    this.crudservice
      .getLigneById(
        "niveauEducatif",
        this.addForm2.get("niveauEducatifCode").value
      )
      .subscribe((data) => {
        if (data.result != null) {
          this.enfantLocal.niveauEducatif = data.result;
          this.addForm2
            .get("niveauEducatifLibelle")
            .setValue(data.result.libelle_niveau_educatif);
        } else {
          this.service.add({
            key: "tst",
            severity: "error",
            summary: ".   خطأ    ",
            detail: "تثبت من رمز الجنسية  ",
          });
          this.addForm2.get("niveauEducatifLibelle").setValue("");
        }
      });
  }

  //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  //------------------------------------------------------------delegation--------------------------------------------------------------------------------------------------

  saveDelegation(delegation) {
    this.addForm2.get("delegationCode").setValue(delegation.id);
    this.enfantLocal.delegation = delegation;
    this.addForm2
      .get("delegationLibelle")
      .setValue(delegation.libelle_delegation);
    this.displayDelegation = false;
  }
  showListDelegation() {
    this.crudservice
      .getDelegationByGouv(
        "delegation",
        this.addForm2.get("gouvernoratCode").value
      )
      .subscribe((data) => {
        this.entitiesDelegation = data.result;
      });
    this.displayDelegation = true;
  }
  getDelegation() {
    this.crudservice
      .findByGouvernorat(
        "delegation",
        this.addForm2.get("gouvernoratCode").value,
        this.addForm2.get("delegationCode").value
      )
      .subscribe((data) => {
        if (data.result != null) {
          this.enfantLocal.delegation = data.result;
          this.addForm2
            .get("delegationLibelle")
            .setValue(data.result.libelle_delegation);
        } else {
          this.service.add({
            key: "tst",
            severity: "error",
            summary: ".   خطأ    ",
            detail: "تثبت من رمز المعتمدية  ",
          });
          this.addForm2.get("delegationLibelle").setValue("");
        }
      });
  }

  //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  //-------------------------------------------------------------------classePenale----------------------------------------------------------------------------------------------------
  saveClassePenale(classePenale) {
    this.addForm3.get("classePenaleCode").setValue(classePenale.id);
    this.enfantLocal.classePenale = classePenale;
    this.addForm3
      .get("classePenaleLibelle")
      .setValue(classePenale.libelle_classe_penale);
    this.displayClassePenale = false;
  }
  showListClassePenale() {
    this.displayClassePenale = true;
  }
  getClassePenale() {
    this.crudservice
      .getLigneById("classePenale", this.addForm3.get("classePenaleCode").value)
      .subscribe((data) => {
        if (data.result != null) {
          this.enfantLocal.classePenale = data.result;
          this.addForm3
            .get("classePenaleLibelle")
            .setValue(data.result.libelle_classe_penale);
        } else {
          this.service.add({
            key: "tst",
            severity: "error",
            summary: ".   خطأ    ",
            detail: "تثبت من رمز الصنف الجزائي  ",
          });
          this.addForm2.get("classePenaleLibelle").setValue("");
        }
      });
  }

  //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  direction() {
    if (this.display == false) {
      window.localStorage.removeItem("idValide");

      window.localStorage.setItem(
        "idValide",
        this.arrestationValide.enfant.id.toString()
      );
      console.log(this.path);
      this.pathEvent.emit(this.path);
    }
  }
  valide() {
    this.display = false;
  }

  //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  formatDate(date) {
    // var dN = new Date(date),
    // monthN = '' + (dN.getMonth() + 1),
    // dayN = '' + dN.getDate(),
    // yearN = dN.getFullYear();

    var dmin = new Date(date),
      monthmin = "" + (dmin.getMonth() + 1),
      daymin = "" + dmin.getDate(),
      yearmin = dmin.getFullYear() + 18;

    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear() + 18;
    console.log(d);
    var cmin = new Date(
      dmin.getFullYear() + 13,
      dmin.getMonth(),
      dmin.getDate()
    );
    var c = new Date(d.getFullYear() + 18, d.getMonth(), d.getDate());
    var a = new Date();

    var age = a.getFullYear() - d.getFullYear();
    var m = a.getMonth() - d.getMonth();
    if (m < 0 || (m === 0 && a.getDate() < d.getDate())) {
      age = age - 1;
    }

    this.ageEnfant = "الســــن:" + " " + age + " " + "عــــام";

    console.log(this.ageEnfant);

    this.booleanAge = true;

    console.log("lyoum " + a);
    console.log("sen roched " + c);

    if (a.getTime() >= c.getTime() || a.getTime() < cmin.getTime()) {
      this.booleanAge = false;
    }

    switch (month) {
      case "1":
        month = "جانفــــي";
        break;
      case "2":
        month = "فيفــــري";
        break;
      case "3":
        month = "مــــارس";
        break;
      case "4":
        month = "أفريــــل";
        break;
      case "5":
        month = "مــــاي";
        break;
      case "6":
        month = "جــــوان";
        break;
      case "7":
        month = "جويليــــة";
        break;
      case "8":
        month = "أوت";
        break;
      case "9":
        month = "سبتمبــــر";
        break;
      case "10":
        month = "أكتوبــــر";
        break;
      case "11":
        month = "نوفمبــــر";
        break;
      case "12":
        month = "ديسمبــــر";
        break;

      default:
        console.log(`Sorry, we are out of ${month}.`);
    }

    if (day.length < 2) day = "0" + day;
    var res =
      " تـــاريخ بلـــوغ سن الرشـــد :" + " " + day + " " + month + " " + year;

    this.alertAge = res;
    return res;
  }

  viderUrl() {
    this.url = "";
    this.enfantLocal.img = "";
    this.taille = 0;
  }

  img: string;
  // onFileChanged(event) {
  //   console.log(event.target.files);
  //   this.files = event.target.files;

  //   if (this.files.length === 0) {
  //     return;
  //   }

  //   const mimeType = this.files[0].type;
  //   if (mimeType.match(/image\/*/) == null) {
  //     return;
  //   }

  //   const reader = new FileReader();
  //   this.imagePath = this.files;
  //   reader.readAsDataURL(this.files[0]);
  //   reader.onload = async (_event) => {
  //     this.url = reader.result;
  //     const compressedImage = await this.compressFile(this.url);

  //     console.log("compressedImage :", compressedImage);
  //   };
  // }
  reglerDate(date) {
    console.log(this.addForm1.get("dateNaissance").value);
    let words = date.split("/");
    let x = "/";
    if (words.length == 1) {
      words = date.split("-");
      x = "-";
    }
    date = words[2] + x + words[1] + x + words[0];
    console.log(date);
    return date;
  }

  vDate() {
    try {
      this.datepipe.transform(
        this.reglerDate(this.addForm1.get("dateNaissance").value),
        "yyyy-MM-dd"
      );
      this.faux = false;
      this.formatDate(
        this.datepipe.transform(
          this.reglerDate(this.addForm1.get("dateNaissance").value),
          "yyyy-MM-dd"
        )
      );
    } catch (error) {
      this.addForm1.get("dateNaissance").setValue("");

      this.faux = true;
    }
  }

  reglerDateSql(date) {
    const words = date.split("-");
    const x = "-";
    return (date = words[2] + x + words[1] + x + words[0]);
  }

  formatDateShow(date) {
    return this.datepipe.transform(
      this.addForm1.get("dateNaissance").value,
      "yyyy-MM-dd"
    );
  }

  onFileChanged(event) {
    console.log(event.target.files);
    this.files = event.target.files;

    if (this.files.length === 0) {
      return;
    }

    const mimeType = this.files[0].type;
    if (!mimeType.match(/image\/*/)) {
      return;
    }

    const reader = new FileReader();
    this.imagePath = this.files;
    reader.readAsDataURL(this.files[0]);
    reader.onload = async (_event) => {
      this.url = reader.result;
      await this.compressAndDisplayImage(this.url);
    };
  }
  taille: number = 0;
  async compressAndDisplayImage(image) {
    this.taille = 0;
    console.log(
      "Taille de l'image avant compression :",
      image.length,
      "octets"
    );
    const maxSizeInBytes = 100 * 1024; // 500 Ko
    const maxQuality = 1; // Qualité maximale (aucune compression)
    let quality = 100;
    let compressedImage; // Déclaration de la variable pour stocker l'image compressée
    let roti = 100;
    // Compresser l'image jusqu'à atteindre la taille maximale désirée
    do {
      // Compresser l'image avec la qualité actuelle
      compressedImage = await this.imageCompress.compressFile(
        image,
        -1,
        roti,
        quality
      );

      if (compressedImage) {
        // Vérifier si l'image compressée est définie
        // Vérifier la taille de l'image compressée
        if (compressedImage.length <= maxSizeInBytes) {
          this.taille = compressedImage.length;
          // Si la taille est inférieure ou égale à la taille maximale désirée, conserver le résultat
          break;
        } else {
          this.taille = compressedImage.length;

          // Réduire la qualité pour compresser davantage l'image
          quality -= 2; // Réduire de 0.1 à chaque itération
          roti -= 2;
        }
      } else {
        // Gérer le cas où la compression échoue
        console.error("La compression de l'image a échoué.");
        return; // Sortir de la fonction
      }
    } while (quality > 0 && roti > 0 && this.taille > maxSizeInBytes);

    // Vérifier si l'image compressée est définie
    if (compressedImage) {
      // Taille de l'image après compression
      console.log(
        "Taille de l'image après compression :",
        compressedImage.length,
        "octets"
      );
      // Afficher ou utiliser l'image compressée dans votre application
      this.url = compressedImage;
    } else {
      console.log("problem .");
      // Affichez un message d'erreur à l'utilisateur ou prenez une autre action appropriée ici
    }
    console.log("Taille max de l'image  :", maxSizeInBytes, "octets");
    console.log("qua de l'image  :", quality, " ");
    console.log("rot max de l'image  :", roti, " ");
  }
  getPhotoById(idEnfant: any, numArr: any) {
    this.url = "";
    this.crudservice.getPhotoById(idEnfant, numArr).subscribe((data) => {
      if (data.result == null) {
      } else {
        this.url = data.result.img;
      }
    });
  }
  // this.taille = image.length;
  //   while (this.taille >= maxSizeInBytes) {
  //     // Compresser l'image avec la qualité actuelle
  //     compressedImage = await this.imageCompress.compressFile(
  //       image,
  //       -1,
  //       roti,
  //       quality
  //     );

  //     if (compressedImage) {
  //       // Vérifier la taille de l'image compressée
  //       this.taille = compressedImage.length;
  //       // Réduire la qualité pour compresser davantage l'image
  //       quality -= 10; // Réduire de 0.1 à chaque itération
  //       roti -= 10;
  //     } else {
  //       // Gérer le cas où la compression échoue
  //       console.error("La compression de l'image a échoué.");
  //       return; // Sortir de la fonction ou gérer l'erreur selon le contexte de votre application
  //     }
  //   }
}
