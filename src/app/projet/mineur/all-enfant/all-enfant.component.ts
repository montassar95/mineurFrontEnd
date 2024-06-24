import { Component, OnInit } from "@angular/core";
import { Car } from "src/app/demo/domain/car";

import {
  TreeNode,
  SelectItem,
  LazyLoadEvent,
  MessageService,
} from "primeng/api";

import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { EventService } from "src/app/demo/service/eventservice";
import { CarService } from "src/app/demo/service/carservice";
import { NodeService } from "src/app/demo/service/nodeservice";
import { BreadcrumbService } from "src/app/shared/breadcrumb/breadcrumb.service";
import { Enfant } from "src/app/domain/enfant";
import { CrudEnfantService } from "src/app/demo/service/crud-enfant.service";
import { OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { HttpParams } from "@angular/common/http";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DatePipe, ViewportScroller } from "@angular/common";
import { Residence } from "src/app/domain/residence";
import { TokenStorageService } from "src/app/_services/token-storage.service";
import { Visite } from "src/app/domain/visite";
@Component({
  selector: "app-all-enfant",
  templateUrl: "./all-enfant.component.html",
  styleUrls: ["./all-enfant.component.scss"],
  providers: [MessageService],
})
//,OnDestroy
export class AllEnfantComponent implements OnInit {
  selectedIndex;
  displayEdit: boolean;
  displayMoreInfo: boolean;
  enfantLocal: Enfant;
  enfants: Residence[] = [];
  path: string;
  centre = "";
  numArrestation = "";
  dateEntreLocal = "";
  numOrdinale = "";
  msg: number;
  isReadOnly = true;
  searchBoolean: boolean;
  addBoolean: boolean;
  existBoolean: boolean;
  addForm1: FormGroup;
  id: number;
  numArr: number;

  nomEnfant: any;

  prenom: any;

  nomPere: any;

  nomGrandPere: any;

  nomMere: any;

  prenomMere: any;

  dateNaissance: any;

  sexe: any;
  selectedValue: string = "val1";

  residenceEdit: Residence;

  update = true;
  currentUser: any;
  displayVisite: boolean;

  residenceVisite: Residence;

  constructor(
    private crudservice: CrudEnfantService,
    private router: Router,
    private service: MessageService,
    private viewportscroller: ViewportScroller,
    private eventService: EventService,
    private nodeService: NodeService,
    private formBuilder: FormBuilder,
    private token: TokenStorageService,
    private breadcrumbService: BreadcrumbService,
    public datepipe: DatePipe
  ) {
    this.breadcrumbService.setItems([
      { label: "الإستقبال", routerLink: ["/"] },

      { label: "ملف الطفل" },
      { label: "الهوية" },
    ]);
  }

  // ngOnDestroy(){
  //   window.localStorage.removeItem("enfant");
  //   window.localStorage.removeItem("id");
  // }

  ngOnInit() {
    this.currentUser = this.token.getUser();
    console.log(this.currentUser);
    this.addForm1 = this.formBuilder.group({
      nom: [""],
      prenom: [""],
      nomPere: [""],
      nomGrandPere: [""],
      nomMere: [""],
      prenomMere: [""],
      dateNaissance: ["", Validators.required],

      sexe: [""],
    });
    //  this.searchBoolean=true;
    this.enfants = [];
  }

  showVisite(residence) {
    this.residenceVisite = residence;
    this.displayVisite = true;
  }
  handleFormData(formData: { year: number; month: number; value: number }) {
    let visit = new Visite();
    visit.enfant = this.residenceVisite.arrestation.enfant;
    visit.residenceVisite = this.residenceVisite;
    visit.anneeVisite = formData.year;
    visit.moisVisite = formData.month;
    visit.nbrVisite = formData.value;
    console.log(visit);
    this.crudservice.createLigne("visite", visit).subscribe((data) => {
      console.log(data.result);
    });
    this.displayVisite = false;
  }




  goPath(event) {
    this.addBoolean = false;

    this.path = event;
  }

  direction() {
    if (this.addBoolean == false) {
      this.router.navigate([this.path]);
    }
  }
  show() {
    // this.addForm1.reset();
    if (this.selectedValue == "val1") {
      this.numArr = null;
    } else {
      this.id = null;
    }
  }
  onSubmitAddForm1() {
    this.numArr = null;
    this.id = null;
    //Object.keys(this.addForm1.controls).forEach((key) => this.addForm1.get(key).setValue(this.addForm1.get(key).value.trim()));

    this.nomEnfant = this.addForm1.get("nom").value;

    this.prenom = this.addForm1.get("prenom").value;

    this.nomPere = this.addForm1.get("nomPere").value;

    this.nomGrandPere = this.addForm1.get("nomGrandPere").value;

    this.nomMere = this.addForm1.get("nomMere").value;

    this.prenomMere = this.addForm1.get("prenomMere").value;

    this.dateNaissance = this.addForm1.get("dateNaissance").value;

    this.addForm1
      .get("dateNaissance")
      .setValue(
        this.datepipe.transform(
          this.addForm1.get("dateNaissance").value,
          "yyyy-MM-dd"
        )
      );
    this.sexe = this.addForm1.get("sexe").value;

    this.crudservice
      .getEnfants(this.addForm1.value)

      .subscribe((data) => {
        this.enfants = [];
        if (data.result.length) {
          this.enfants = data.result;
          this.existBoolean = false;
        } else {
          console.log("data.result");
          //  this.service.add({ key: 'tst', severity: 'error', summary: '.   لا يوجد أطفال    ', detail: ' قم بإدراج هوية جديدة   '  });
          this.existBoolean = true;
        }
        this.searchBoolean = false;
      });

    // this.viewportscroller.scrollToAnchor("dt" );
    // this.selectedIndex=0;
  }
  // scrollToElement(element): void { console.log(element);
  //    element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  //   }
  refreshTable(id: string) {
    if (id) {
      this.crudservice.getoneInResidence(id).subscribe((data) => {
        if (data.result) {
          this.enfants = [];
          console.log(data.result);
          this.enfants.push(data.result);
          this.displayEdit = false;
        } else {
          this.enfants = [];
          this.displayEdit = false;
        }
      });
    }
  }
  onSubmitId() {
    //  this.addForm1.reset();
    console.log(this.selectedValue);

    if (this.selectedValue == "val1") {
      if (this.id) {
        this.crudservice.getoneInResidence(this.id).subscribe((data) => {
          console.log(data);
          if (data.result) {
            this.enfants = [];
            console.log(data.result);
            this.enfants.push(data.result);
            this.searchBoolean = false;
          } else {
            this.enfants = [];

            this.searchBoolean = false;
          }
        });
      }
    } else {
      if (this.numArr) {
        this.crudservice.getResidenceByNum(this.numArr).subscribe((data) => {
          if (data.result) {
            this.enfants = [];

            this.enfants = data.result;
            this.searchBoolean = false;
          } else {
            this.enfants = [];

            this.searchBoolean = false;
          }
        });
      }
    }

    //  this.viewportscroller.scrollToAnchor("dt" );
  }

  showSearch() {
    this.searchBoolean = true;
  }

  showAdd() {
    this.addBoolean = true;
  }

  showEdit(residence: Residence) {
    this.residenceEdit = residence;
    this.displayEdit = true;
  }

  showEnfant(enfant) {
    this.crudservice.getLigneById("enfant", enfant.id).subscribe((data) => {
      if (data.result == null) {
      } else {
        this.enfantLocal = data.result;
        this.search(this.enfantLocal);
        this.displayMoreInfo = true;
      }
    });
  }

  showFolderEnfant(enfant) {
    window.localStorage.removeItem("idEnfantValide");

    window.localStorage.setItem("idEnfantValide", enfant.id.toString());
    this.router.navigate(["mineur/MoreInformaton"]);
  }
  valide() {
    this.displayMoreInfo = false;
  }

  search(enfant) {
    this.crudservice
      .findByIdEnfantAndStatut0("arrestation", enfant.id)
      .subscribe((data) => {
        if (data.result) {
          // this.service.add({ key: 'tst', severity: 'error', summary: '.   خطأ    ', detail: id+' إقامة مفتوحة  '  });
          this.msg = 0;

          this.dateEntreLocal = data.result.date;
          this.numOrdinale = data.result.arrestationId.numOrdinale;
          this.crudservice
            .findResidenceByIdEnfantAndStatut0(
              "residence",
              data.result.arrestationId.idEnfant,
              data.result.arrestationId.numOrdinale
            )
            .subscribe((data) => {
              this.centre = data.result.etablissement.libelle_etablissement;
              this.numArrestation = data.result.numArrestation;
              this.isReadOnly = true;
            });
        } else {
          this.msg = 1;
          this.centre = "";
          this.numArrestation = "";
          this.dateEntreLocal = "";
          this.numOrdinale = "";
          this.isReadOnly = false;
        }
      });
  }
}
