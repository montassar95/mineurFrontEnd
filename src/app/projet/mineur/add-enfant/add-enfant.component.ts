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
import { AppConfigService } from "../app-config.service";
import { DetentionService } from "src/app/demo/service/detention.service";
import { Etablissement } from "src/app/domain/etablissement";
import { EtabChangeManiere } from "src/app/domain/etabChangeManiere";

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
  entitiesEtablissementPassage: Etablissement[];
  etablissementPassageLocal: Etablissement;
  entitiesEtabChangeManiereEntree: EtabChangeManiere[];
  etabChangeManiereEntreeLocal: EtabChangeManiere;
  entitiesSituationSocial: SituationSocial[];
  entitiesMetier: Metier[];
  currentUser: any;
  arrestationValide: Arrestation;

  path: string;
  centre = "";
  numOrdinale = "";
  numArrestation = "";
  dateEntreLocal;
  datePassage;
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

  displayEtablissementPassage = false;
  displayEtabChangeManiereEntree = false;
  etablissementLocal: Etablissement;

  constructor(
    private formBuilder: FormBuilder,
    private service: MessageService,
    private token: TokenStorageService,
    private router: Router,
    private crudservice: CrudEnfantService,
    private detentionService: DetentionService,
    public datepipe: DatePipe,
    private imageCompress: NgxImageCompressService,
    private appConfigService: AppConfigService
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

  @Input()
  enfantOld: any;

  errorMessage: string | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.enfantOld) {
      console.log("ngOnChanges - enfantOld:", this.enfantOld);
      this.patchForm1WithEnfantData(this.enfantOld);
    }
  }

  ngOnInit(): void {
    this.currentUser = this.token.getUserFromTokenFromToken();

    if (!this.currentUser) {
      this.router.navigate(["/logoutpage"]);
    }
    this.currentUser = this.token.getUserFromTokenFromToken();
    this.loadEntities();

    this.setupCalendarConfig();

    this.setupYearRange();
    this.createForms();
    console.log(this.update);
    if (this.update) {
      this.patchFormsWithExistingData(this.residenceEdit.arrestation.enfant);
      this.fetchChildPhoto();
      this.updateLocalChildData();
      this.setStepperIndex();
    }
  }

  private setupYearRange(): void {
    const currentYear = new Date().getFullYear();
    this.years = `${currentYear - 1}:${currentYear}`;
  }
  private setupCalendarConfig(): void {
    this.calendar_ar = this.appConfigService.calendarConfig;
  }

  private createForms(): void {
    this.addForm1 = this.formBuilder.group(this.getForm1Controls());
    this.addForm2 = this.formBuilder.group(this.getForm2Controls());
    this.addForm3 = this.formBuilder.group(this.getForm3Controls());
  }

  private getForm1Controls() {
    return {
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
    };
  }

  private getForm2Controls() {
    return {
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
    };
  }

  private getForm3Controls() {
    return {
      classePenaleCode: ["", Validators.required],
      classePenaleLibelle: ["", Validators.required],
      surnom: [""],
      alias: [""],
      numArrestation: ["", Validators.required],
      dateEntreLocal: ["", Validators.required],
      datePassage: [""],
      etablissementPassageCode: [""],
      etablissementPassageLibelle: [""],
      etabChangeManiereEntreeCode: [""],
      etabChangeManiereEntreeLibelle: [""],
    };
  }
  private patchFormsWithExistingData(enfant: Enfant): void {
    this.patchForm1WithEnfantData(enfant);
    this.patchForm2WithEnfantData(enfant);
    this.patchForm3WithEnfantData(enfant);
  }

  private patchForm1WithEnfantData(enfant: Enfant): void {
    this.addForm1.patchValue({
      nom: enfant.nom,
      prenom: enfant.prenom,
      nomPere: enfant.nomPere,
      nomGrandPere: enfant.nomGrandPere,
      nomMere: enfant.nomMere,
      prenomMere: enfant.prenomMere,
      dateNaissance: this.reglerDateSql(enfant.dateNaissance),
      lieuNaissance: enfant.lieuNaissance,
      nationaliteCode: enfant.nationalite.id,
      nationaliteLibelle: enfant.nationalite.libelle_nationalite,
      sexe: enfant.sexe,
    });
  }

  private patchForm2WithEnfantData(enfant: Enfant): void {
    this.addForm2.patchValue({
      niveauEducatifCode: enfant.niveauEducatif.id,
      niveauEducatifLibelle: enfant.niveauEducatif.libelle_niveau_educatif,
      situationFamilialeCode: enfant.situationFamiliale.id,
      situationFamilialeLibelle:
        enfant.situationFamiliale.libelle_situation_familiale,
      nombreFreres: enfant.nombreFreres,
      gouvernoratCode: enfant.gouvernorat.id,
      gouvernoratLibelle: enfant.gouvernorat.libelle_gouvernorat,
      metierCode: enfant.metier.id,
      metierLibelle: enfant.metier.libelle_metier,
      delegationCode: enfant.delegation.id,
      delegationLibelle: enfant.delegation.libelle_delegation,
      adresse: enfant.adresse,
      nbrEnfant: enfant.nbrEnfant,
      situationSocialCode: enfant.situationSocial?.id,
      situationSocialLibelle: enfant.situationSocial?.libelle_situation_social,
    });
  }

  private patchForm3WithEnfantData(enfant: Enfant): void {
    this.addForm3.patchValue({
      classePenaleCode: enfant.classePenale.id,
      classePenaleLibelle: enfant.classePenale.libelle_classe_penale,
      surnom: enfant.surnom,
      alias: enfant.alias,
      numArrestation: this.residenceEdit.numArrestation,
      dateEntreLocal: new Date(this.residenceEdit.dateEntree),
      datePassage: this.residenceEdit.datePassage
        ? new Date(this.residenceEdit.datePassage)
        : null,

      etablissementPassageCode: this.residenceEdit.etablissementPassage
        ? this.residenceEdit.etablissementPassage.id
        : null,
      etablissementPassageLibelle: this.residenceEdit.etablissementPassage
        ? this.residenceEdit.etablissementPassage.libelle_etablissement
        : null,

      etabChangeManiereEntreeCode: this.residenceEdit.etabChangeManiereEntree
        ? this.residenceEdit.etabChangeManiereEntree.id
        : null,
      etabChangeManiereEntreeLibelle: this.residenceEdit.etabChangeManiereEntree
        ? this.residenceEdit.etabChangeManiereEntree.libelle_etabChangeManiere
        : null,
    });
  }

  private fetchChildPhoto(): void {
    this.getPhotoById(
      this.residenceEdit.arrestation.arrestationId.idEnfant,
      this.residenceEdit.arrestation.arrestationId.numOrdinale
    );
  }
  private setStepperIndex(): void {
    if (this.myStepper) {
      this.myStepper.selectedIndex = 0;
    }
  }
  private updateLocalChildData(): void {
    const enfant = this.residenceEdit.arrestation.enfant;

    // Mettez à jour les propriétés de l'instance existante d'enfantLocal
    this.enfantLocal.delegation = enfant.delegation;
    this.enfantLocal.gouvernorat = enfant.gouvernorat;
    this.enfantLocal.nationalite = enfant.nationalite;
    this.enfantLocal.niveauEducatif = enfant.niveauEducatif;
    this.enfantLocal.situationFamiliale = enfant.situationFamiliale;
    this.enfantLocal.classePenale = enfant.classePenale;
    this.enfantLocal.situationSocial = enfant.situationSocial;
    this.enfantLocal.metier = enfant.metier;
  }

  cancel() {
    this.display = false;
  }

  validerNumeroEcrou() {
    const numeroEcrou = this.addForm3.get("numArrestation")?.value;
    const etablissementId =
      this.token?.getUserFromTokenFromToken()?.etablissement?.id;
    if (this.update || !numeroEcrou || !etablissementId) {
      return; // Sortir de la méthode
    }

    this.detentionService
      .validerNumeroEcrou(numeroEcrou, etablissementId)
      .subscribe(
        (data) => {
          if (data.result) {
            this.addForm3.get("numArrestation")?.setErrors({ existing: true });
            this.errorMessage = "هذا العدد موجود حاليا ."; // Message d'erreur
          } else {
            this.addForm3.get("numArrestation")?.setErrors(null); // Réinitialiser les erreurs
            this.errorMessage = null; // Aucun message d'erreur
          }
        },
        (error) => {
          console.error("Erreur lors de la validation:", error);
          this.errorMessage =
            "Une erreur s'est produite lors de la validation.";
        }
      );
  }

  async creerEnfantAssDTO(): Promise<EnfantAddDTO> {
    this.showBeforSave = true;
    let enfantAddDTO = new EnfantAddDTO();

    // Informations sur l'enfant
    // let enfant = new Enfant();
    this.enfantSubmit.dateNaissance = this.datepipe.transform(
      this.reglerDate(this.addForm1.get("dateNaissance").value),
      "yyyy-MM-dd"
    );

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

    // arrestation.numAffairePricipale = "0";
    enfantAddDTO.arrestation = arrestation;

    // Information sur la résidence
    let residence = new Residence();
    residence.numArrestation = this.addForm3.get("numArrestation").value;
    residence.dateEntree = arrestation.date;
    residence.etablissementPassage = this.etablissementPassageLocal;

    residence.etabChangeManiereEntree = this.etabChangeManiereEntreeLocal;

    residence.datePassage = this.datepipe.transform(
      this.addForm3.get("datePassage").value,
      "yyyy-MM-dd"
    );
    residence.etablissement = this.currentUser.etablissement;
    enfantAddDTO.residence = residence;

    enfantAddDTO.etablissement = this.currentUser.etablissement;
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
      const data = await this.detentionService
        .creerAdmissionDetenu(enfantAddDTO)
        .toPromise();

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
          "erreur lors de la sauvegarde de la résidence dans Spring 1 "
        );
      }
    } catch (error) {
      // Gérer les erreurs de sauvegarde
      console.error(
        "Une erreur s'est produite lors de la sauvegarde de l'enfant : 2",
        error
      );
      // Afficher un message d'erreur à l'utilisateur si nécessaire
    }
  }
  async modifierEnfant(enfantAddDTO: EnfantAddDTO): Promise<void> {
    try {
      const data = await this.detentionService
        .mettreAJourAdmissionDetenu(enfantAddDTO)
        .toPromise();

      if (data.result != null) {
        this.refresh(data.result.residenceId.idEnfant);
      } else {
        console.log(data);
        console.error(
          "erreur lors de la sauvegarde de la résidence dans Spring 3"
        );
      }
    } catch (error) {
      // Gérer les erreurs de sauvegarde
      console.error(
        "Une erreur s'est produite lors de la sauvegarde de l'enfant : 4",
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
          this.addForm1.get("nationaliteLibelle").setValue("");
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
      .trouverDelegationsParGouvernorat(
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
      .trouverDelegationParIdDelegationEtIdGouvernorat(
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
          this.addForm3.get("classePenaleLibelle").setValue("");
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
    this.detentionService
      .trouverPhotoByIdDetenuEtNumDetention(idEnfant, numArr)
      .subscribe((data) => {
        if (data.result == null) {
        } else {
          this.url = data.result.img;
        }
      });
  }

  private loadEntities() {
    this.appConfigService.getAllEntities().subscribe(
      (entities) => {
        this.entitiesNationalite = entities.nationalite;
        this.entitiesNiveauEducatif = entities.niveauEducatif;
        this.entitiesSituationFamiliale = entities.situationFamiliale;
        this.entitiesGouvernorat = entities.gouvernorat;
        this.entitiesClassePenale = entities.classePenale;
        this.entitiesSituationSocial = entities.situationSocial;
        this.entitiesMetier = entities.metier;
        this.entitiesEtablissementPassage = entities.etablissement;
        this.entitiesEtabChangeManiereEntree = entities.etabChangeManiere;
      },
      (error) => {
        console.error("Erreur lors du chargement des entités:", error);
      }
    );
  }
  //----------------------------------------------------------etabChangeManiere   ----------------------------------------------------
  saveEtabChangeManiereEntree(etabChangeManiereEntree) {
    this.addForm3
      .get("etabChangeManiereEntreeCode")
      .setValue(etabChangeManiereEntree.id);
    this.etabChangeManiereEntreeLocal = etabChangeManiereEntree;
    this.addForm3
      .get("etabChangeManiereEntreeLibelle")
      .setValue(etabChangeManiereEntree.libelle_etabChangeManiere);
    this.displayEtabChangeManiereEntree = false;
  }

  showListEtabChangeManiereEntree() {
    this.displayEtabChangeManiereEntree = true;
  }
  getEtabChangeManiereEntree() {
    this.crudservice
      .getLigneById(
        "etabChangeManiere",
        this.addForm3.get("etabChangeManiereEntreeCode").value
      )
      .subscribe((data) => {
        if (data.result != null) {
          this.etabChangeManiereEntreeLocal = data.result;
          this.addForm3
            .get("etabChangeManiereEntreeLibelle")
            .setValue(data.result.libelle_etabChangeManiere);
        } else {
          this.service.add({
            key: "tst",
            severity: "error",
            summary: ".   خطأ    ",
            detail: "تثبت من رمز المركز     ",
          });
          this.addForm3.get("etabChangeManiereEntreeLibelle").setValue("");
        }
      });
  }

  //----------------------------------------------------------etablissement passage ----------------------------------------------------
  saveEtablissementPassage(etablissementPassage) {
    this.addForm3
      .get("etablissementPassageCode")
      .setValue(etablissementPassage.id);
    this.etablissementPassageLocal = etablissementPassage;
    this.addForm3
      .get("etablissementPassageLibelle")
      .setValue(etablissementPassage.libelle_etablissement);
    this.displayEtablissementPassage = false;
  }

  showListEtablissementPassage() {
    this.displayEtablissementPassage = true;
  }
  getEtablissementPassage() {
    this.crudservice
      .getLigneById(
        "etablissement",
        this.addForm3.get("etablissementPassageCode").value
      )
      .subscribe((data) => {
        if (data.result != null) {
          this.etablissementPassageLocal = data.result;
          this.addForm3
            .get("etablissementPassageLibelle")
            .setValue(data.result.libelle_etablissement);
        } else {
          this.service.add({
            key: "tst",
            severity: "error",
            summary: ".   خطأ    ",
            detail: "تثبت من رمز المركز     ",
          });
          this.addForm3.get("etablissementPassageLibelle").setValue("");
        }
      });
  }
}
