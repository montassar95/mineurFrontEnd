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
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from "@angular/forms";
import { DatePipe, ViewportScroller } from "@angular/common";
import { Residence } from "src/app/domain/residence";
import { TokenStorageService } from "src/app/_services/token-storage.service";
import { Visite } from "src/app/domain/visite";
import { DetentionService } from "src/app/demo/service/detention.service";
import { DocumentService } from "src/app/demo/service/document.service";
import { SearchDetenuDto } from "src/app/domain/searchDetenuDto ";
import { PDFPenaleDTO } from "src/app/domain/pDFPenaleDTO";
import { RapportService } from "src/app/demo/service/rapport.service";
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
  pDFPenaleDTO: PDFPenaleDTO;
  enfantLocal: Enfant;
  detenus: SearchDetenuDto[] = [];
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
  searchForm: FormGroup;
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
  idDetenu;
  numArrDetenu;
  residenceEdit: Residence;
  click = false;
  update = true;
  currentUser: any;
  displayVisite: boolean;

  residenceVisite: Residence;
  selectedTab: string; // Définit l'onglet par défaut

  source: string;
  errorMessage: null;

  selectTab(tab: string) {
    this.selectedTab = tab; // Met à jour l'onglet sélectionné
  }
  constructor(
    private crudservice: CrudEnfantService,
    private detentionService: DetentionService,
    private documentService: DocumentService,
    private router: Router,
    private service: MessageService,
    private viewportscroller: ViewportScroller,
    private eventService: EventService,
    private nodeService: NodeService,
    private formBuilder: FormBuilder,
    private token: TokenStorageService,
    private breadcrumbService: BreadcrumbService,
    public datepipe: DatePipe,
    private routerSec: Router,
    private rapportService: RapportService
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
  acceeSoujoun = false;
  ngOnInit() {
    this.currentUser = this.token.getUserFromTokenFromToken();
    console.log("this.currentUser");
    console.log(this.currentUser);
    if (!this.currentUser) {
      this.router.navigate(["/logoutpage"]);
    }
    this.currentUser = this.token.getUserFromTokenFromToken();

    if (!this.currentUser) {
      this.routerSec.navigate(["/logoutpage"]);
    }
    this.currentUser = this.token.getUserFromTokenFromToken();

    if (
      this.currentUser.username == "test" ||
      this.currentUser.username == "ibtissem" ||
      this.currentUser.username == "zied" ||
      this.currentUser.username == "montassar" ||
      this.currentUser.username == "mouhamed"
    ) {
      this.acceeSoujoun = true;
    }

    this.searchForm = this.formBuilder.group({
      nom: ["", Validators.required],
      prenom: ["", Validators.required],
      nomPere: [""],
      nomGrandPere: [""],
      nomMere: [""],
      prenomMere: [""],
      dateNaissance: [""],
      sexe: [""],
    });

    this.detenus = [];
  }

  // optionalPatternValidator(pattern: RegExp): ValidatorFn {
  //   return (control: AbstractControl): ValidationErrors | null => {
  //     if (!control.value) {
  //       // Si le champ est vide, aucune erreur
  //       return null;
  //     }
  //     // Vérifier si la valeur respecte le pattern
  //     return pattern.test(control.value) ? null : { pattern: true };
  //   };
  // }

  showVisite(searchDetenuDto) {
    this.detentionService
      .trouverDerniereResidenceParNumDetentionEtIdDetenu(
        "residence",
        searchDetenuDto.detenuId,
        searchDetenuDto.numOrdinaleArrestation
      )
      .subscribe((data) => {
        this.residenceVisite = data.result;
      });

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
    // this.searchForm.reset();
    if (this.selectedValue == "val1") {
      this.numArr = null;
      this.idDetenu = null;
      this.numArrDetenu = null;
    } else {
      this.id = null;
      this.idDetenu = null;
      this.numArrDetenu = null;
    }
  }

  onSubmitSearchForm2() {
    this.source = "Penale";
    console.log("Formulaire départ :", this.searchForm.value);

    if (this.searchForm.invalid) {
      console.log("Formulaire invalide");
      Object.keys(this.searchForm.controls).forEach((key) => {
        const controlErrors = this.searchForm.get(key)?.errors;
        if (controlErrors) {
          console.log(`Champ ${key} - Erreurs :`, controlErrors);
        }
      });
      this.searchForm.markAllAsTouched();
      return;
    }

    console.log("Formulaire valide :", this.searchForm.value);
    // Logique après validation
    this.click = true;
    this.numArr = null;
    this.id = null;
    //Object.keys(this.searchForm.controls).forEach((key) => this.searchForm.get(key).setValue(this.searchForm.get(key).value.trim()));

    this.nomEnfant = this.searchForm.get("nom").value;

    this.prenom = this.searchForm.get("prenom").value;

    this.nomPere = this.searchForm.get("nomPere").value;

    this.nomGrandPere = this.searchForm.get("nomGrandPere").value;

    this.nomMere = this.searchForm.get("nomMere").value;

    this.prenomMere = this.searchForm.get("prenomMere").value;

    // this.dateNaissance = this.searchForm?.get("dateNaissance")?.value;

    // this.searchForm
    //   .get("dateNaissance")
    //   .setValue(
    //     this.datepipe.transform(
    //       this.searchForm.get("dateNaissance").value,
    //       "yyyy-MM-dd"
    //     )
    //   );

    const rawDate = this.searchForm.get("dateNaissance").value;

    if (rawDate) {
      const parsedDate = new Date(rawDate);

      if (!isNaN(parsedDate.getTime())) {
        this.searchForm
          .get("dateNaissance")
          .setValue(this.datepipe.transform(parsedDate, "yyyy-MM-dd"));
      } else {
        this.searchForm.get("dateNaissance").setValue(null);
      }
    } else {
      this.searchForm.get("dateNaissance").setValue(null);
    }

    this.sexe = this.searchForm.get("sexe").value;

    this.detentionService
      .trouverDetenusParCriteresDansPrisons(this.searchForm.value)

      .subscribe(
        (data) => {
          this.click = false;
          this.detenus = [];
          if (data.result.length) {
            this.detenus = data.result;
            this.existBoolean = false;
          } else {
            console.log("data.result");
            //  this.service.add({ key: 'tst', severity: 'error', summary: '.   لا يوجد أطفال    ', detail: ' قم بإدراج هوية جديدة   '  });
            this.existBoolean = true;
          }
          this.searchBoolean = false;
        },
        (error) => {
          // Handle error here
          console.error(
            "An error occurred while generating the report PDF:",
            error
          );
          this.click = false;
          // You can show an alert or display a user-friendly message if needed
          alert("فشل إنشاء التقرير. يرجى المحاولة مرة أخرى.");
        }
      );

    // this.viewportscroller.scrollToAnchor("dt" );
    // this.selectedIndex=0;

    console.log(this.source);
  }
  onSubmitSearchForm() {
    this.source = "Mineur";
    console.log("Formulaire départ :", this.searchForm.value);

    if (this.searchForm.invalid) {
      console.log("Formulaire invalide");
      Object.keys(this.searchForm.controls).forEach((key) => {
        const controlErrors = this.searchForm.get(key)?.errors;
        if (controlErrors) {
          console.log(`Champ ${key} - Erreurs :`, controlErrors);
        }
      });
      this.searchForm.markAllAsTouched();
      return;
    }

    console.log("Formulaire valide :", this.searchForm.value);
    // Logique après validation
    this.click = true;
    this.numArr = null;
    this.id = null;
    //Object.keys(this.searchForm.controls).forEach((key) => this.searchForm.get(key).setValue(this.searchForm.get(key).value.trim()));

    this.nomEnfant = this.searchForm.get("nom").value;

    this.prenom = this.searchForm.get("prenom").value;

    this.nomPere = this.searchForm.get("nomPere").value;

    this.nomGrandPere = this.searchForm.get("nomGrandPere").value;

    this.nomMere = this.searchForm.get("nomMere").value;

    this.prenomMere = this.searchForm.get("prenomMere").value;

    this.dateNaissance = this.searchForm?.get("dateNaissance")?.value;

    this.searchForm
      .get("dateNaissance")
      .setValue(
        this.datepipe.transform(
          this.searchForm.get("dateNaissance").value,
          "yyyy-MM-dd"
        )
      );
    this.sexe = this.searchForm.get("sexe").value;

    this.detentionService
      .trouverResidencesParCriteresDetenu(this.searchForm.value)

      .subscribe(
        (data) => {
          this.click = false;
          this.detenus = [];
          if (data.result.length) {
            console.log("yessss " + data.result.length);
            this.detenus = data.result;
            this.existBoolean = false;
          } else {
            console.log("data.result");
            //  this.service.add({ key: 'tst', severity: 'error', summary: '.   لا يوجد أطفال    ', detail: ' قم بإدراج هوية جديدة   '  });
            this.existBoolean = true;
          }
          this.searchBoolean = false;
        },
        (error) => {
          // Handle error here
          console.error(
            "An error occurred while generating the report PDF:",
            error
          );
          this.click = false;
          // You can show an alert or display a user-friendly message if needed
          alert("فشل إنشاء التقرير. يرجى المحاولة مرة أخرى.");
        }
      );

    // this.viewportscroller.scrollToAnchor("dt" );
    // this.selectedIndex=0;
  }

  // scrollToElement(element): void { console.log(element);
  //    element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  //   }
  refreshTable(id: string) {
    if (id) {
      this.detentionService
        .trouverDerniereResidenceParIdDetenu(id)
        .subscribe((data) => {
          if (data.result) {
            this.detenus = [];
            console.log(data.result);
            this.detenus.push(data.result);
            this.displayEdit = false;
          } else {
            this.detenus = [];
            this.displayEdit = false;
          }
        });
    }
  }
  onSubmitId() {
    //  this.searchForm.reset();
    console.log(this.selectedValue);

    if (this.selectedValue == "val1") {
      this.source = "Mineur";
      if (this.id) {
        this.detentionService
          .trouverDerniereResidenceParIdDetenu(this.id)
          .subscribe(
            (data) => {
              console.log(data.result);
              if (data.result) {
                this.detenus = [];

                this.detenus.push(data.result);
                this.searchBoolean = false;
              } else {
                this.detenus = [];

                this.searchBoolean = false;
              }
            },
            (error) => {
              // Handle error here
              console.error(
                "An error occurred while generating the report PDF:",
                error
              );
              this.click = false;
              // You can show an alert or display a user-friendly message if needed
              alert("فشل إنشاء التقرير. يرجى المحاولة مرة أخرى.");
            }
          );
      }
    } else if (this.selectedValue == "val2") {
      this.source = "Mineur";
      if (this.numArr) {
        this.detentionService
          .trouverResidencesParNumeroEcrou(this.numArr)
          .subscribe(
            (data) => {
              if (data.result) {
                this.detenus = [];

                this.detenus = data.result;
                this.searchBoolean = false;
              } else {
                this.detenus = [];

                this.searchBoolean = false;
              }
            },
            (error) => {
              // Handle error here
              console.error(
                "An error occurred while generating the report PDF:",
                error
              );
              this.click = false;
              // You can show an alert or display a user-friendly message if needed
              alert("فشل إنشاء التقرير. يرجى المحاولة مرة أخرى.");
            }
          );
      }
    } else if (this.selectedValue == "val3") {
      this.source = "Penale";
      if (this.idDetenu) {
        this.detentionService
          .trouverDetenusParPrisonerIdDansPrisons(this.idDetenu)
          .subscribe(
            (data) => {
              console.log(data);
              if (data.result) {
                this.detenus = [];
                console.log(data.result);
                this.detenus.push(data.result);
                console.log(this.detenus);
                this.searchBoolean = false;
              } else {
                this.detenus = [];

                this.searchBoolean = false;
              }
            },
            (error) => {
              // Handle error here
              console.error(
                "An error occurred while generating the report PDF:",
                error
              );
              this.click = false;
              // You can show an alert or display a user-friendly message if needed
              alert("فشل إنشاء التقرير. يرجى المحاولة مرة أخرى.");
            }
          );
      }
    } else if (this.selectedValue == "val4") {
      this.source = "Penale";
      if (this.numArrDetenu) {
        this.detentionService
          .trouverDetenusParNumeroEcrouDansPrisons(this.numArrDetenu)
          .subscribe(
            (data) => {
              if (data.result) {
                this.detenus = [];

                this.detenus = data.result;
                this.searchBoolean = false;
              } else {
                this.detenus = [];

                this.searchBoolean = false;
              }
            },
            (error) => {
              // Handle error here
              console.error(
                "An error occurred while generating the report PDF:",
                error
              );
              this.click = false;
              // You can show an alert or display a user-friendly message if needed
              alert("فشل إنشاء التقرير. يرجى المحاولة مرة أخرى.");
            }
          );
      }
    }

    //  this.viewportscroller.scrollToAnchor("dt" );
  }

  onSubmitIdDansPrision() {
    //  this.searchForm.reset();
    console.log(this.selectedValue);

    if (this.selectedValue == "val1") {
      this.source = "Penale";
      if (this.id) {
        this.detentionService
          .trouverDetenusParDetenuIdMineurDansPrisons(this.id)
          .subscribe(
            (data) => {
              console.log(data);
              if (data.result) {
                this.detenus = [];
                console.log(data.result);
                this.detenus = data.result;
                this.searchBoolean = false;
              } else {
                this.detenus = [];

                this.searchBoolean = false;
              }
            },
            (error) => {
              // Handle error here
              console.error(
                "An error occurred while generating the report PDF:",
                error
              );
              this.click = false;
              // You can show an alert or display a user-friendly message if needed
              alert("فشل إنشاء التقرير. يرجى المحاولة مرة أخرى.");
            }
          );
      }
    } else if (this.selectedValue == "val2") {
      this.detenus = [];

      this.searchBoolean = false;
      alert("لا يمكنك البحث بعدد إيقاف خاص بالمراكز داخل السجن");
    } else if (this.selectedValue == "val3") {
      this.source = "Penale";
      if (this.idDetenu) {
        this.detentionService
          .trouverDetenusParPrisonerIdDansPrisons(this.idDetenu)
          .subscribe(
            (data) => {
              console.log(data);
              if (data.result) {
                this.detenus = [];

                this.detenus.push(data.result);
                console.log(this.detenus);
                this.searchBoolean = false;
              } else {
                this.detenus = [];

                this.searchBoolean = false;
              }
            },
            (error) => {
              // Handle error here
              console.error(
                "An error occurred while generating the report PDF:",
                error
              );
              this.click = false;
              // You can show an alert or display a user-friendly message if needed
              alert("فشل إنشاء التقرير. يرجى المحاولة مرة أخرى.");
            }
          );
      }
    } else if (this.selectedValue == "val4") {
      this.source = "Penale";
      if (this.numArrDetenu) {
        this.detentionService
          .trouverDetenusParNumeroEcrouDansPrisons(this.numArrDetenu)
          .subscribe(
            (data) => {
              if (data.result) {
                this.detenus = [];

                this.detenus = data.result;
                this.searchBoolean = false;
              } else {
                this.detenus = [];

                this.searchBoolean = false;
              }
            },
            (error) => {
              // Handle error here
              console.error(
                "An error occurred while generating the report PDF:",
                error
              );
              this.click = false;
              // You can show an alert or display a user-friendly message if needed
              alert("فشل إنشاء التقرير. يرجى المحاولة مرة أخرى.");
            }
          );
      }
    }
  }

  onSubmitIdDansCentre() {
    if (this.selectedValue == "val1") {
      this.source = "Mineur";
      if (this.id) {
        this.detentionService
          .trouverDerniereResidenceParIdDetenu(this.id)
          .subscribe(
            (data) => {
              console.log(data);
              if (data.result) {
                this.detenus = [];
                console.log(data.result);
                this.detenus.push(data.result);
                this.searchBoolean = false;
              } else {
                this.detenus = [];

                this.searchBoolean = false;
              }
            },
            (error) => {
              // Handle error here
              console.error(
                "An error occurred while generating the report PDF:",
                error
              );
              this.click = false;
              // You can show an alert or display a user-friendly message if needed
              alert("فشل إنشاء التقرير. يرجى المحاولة مرة أخرى.");
            }
          );
      }
    } else if (this.selectedValue == "val2") {
      this.source = "Mineur";
      if (this.numArr) {
        this.detentionService
          .trouverResidencesParNumeroEcrou(this.numArr)
          .subscribe(
            (data) => {
              if (data.result) {
                this.detenus = [];

                this.detenus = data.result;
                this.searchBoolean = false;
              } else {
                this.detenus = [];

                this.searchBoolean = false;
              }
            },
            (error) => {
              // Handle error here
              console.error(
                "An error occurred while generating the report PDF:",
                error
              );
              this.click = false;
              // You can show an alert or display a user-friendly message if needed
              alert("فشل إنشاء التقرير. يرجى المحاولة مرة أخرى.");
            }
          );
      }
    }
    //  this.searchForm.reset();
    /// console.log(this.selectedValue);
    else if (this.selectedValue == "val3") {
      this.source = "Mineur";
      if (this.idDetenu) {
        this.detentionService
          .trouverDetenusParDetenuIdMajeurDansCentres(this.idDetenu)
          .subscribe(
            (data) => {
              console.log(data);
              if (data.result) {
                this.detenus = [];
                console.log(data.result);
                this.detenus = data.result;
                this.searchBoolean = false;
              } else {
                this.detenus = [];

                this.searchBoolean = false;
              }
            },
            (error) => {
              // Handle error here
              console.error(
                "An error occurred while generating the report PDF:",
                error
              );
              this.click = false;
              // You can show an alert or display a user-friendly message if needed
              alert("فشل إنشاء التقرير. يرجى المحاولة مرة أخرى.");
            }
          );
      }
    } else if (this.selectedValue == "val4") {
      this.detenus = [];

      this.searchBoolean = false;
      alert("لا يمكنك البحث بعدد إيقاف خاص بالسجون داخل مركز ");
    }
  }

  showSearch() {
    this.searchBoolean = true;
  }

  showAdd() {
    this.addBoolean = true;
  }

  showEdit(searchDetenuDto) {
    this.detentionService
      .trouverDerniereResidenceParNumDetentionEtIdDetenu(
        "residence",
        searchDetenuDto.detenuId,
        searchDetenuDto.numOrdinaleArrestation
      )
      .subscribe((data) => {
        this.residenceEdit = data.result;
      });

    this.displayEdit = true;
  }

  showFolderEnfant(detenuId: string, numOrdinaleArrestation: string) {
    console.log(this.source);
    // Logique de navigation
    if (this.source == "Mineur") {
      this.router.navigate(["/mineur/MoreInformation", detenuId, this.source]);
    } else if (this.source == "Penale") {
      this.router.navigate([
        "/mineur/showPenale",
        detenuId,
        numOrdinaleArrestation,

        this.source,
      ]);
    } else {
      alert("erreur");
    }
  }

  search(enfant) {
    this.detentionService
      .trouverDerniereDetentionParIdDetenu("arrestation", enfant.id)
      .subscribe((data) => {
        if (data.result) {
          // this.service.add({ key: 'tst', severity: 'error', summary: '.   خطأ    ', detail: id+' إقامة مفتوحة  '  });
          this.msg = 0;

          this.dateEntreLocal = data.result.date;
          this.numOrdinale = data.result.arrestationId.numOrdinale;
          this.detentionService
            .trouverDerniereResidenceParNumDetentionEtIdDetenu(
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

  print(detenu) {
    this.click = true; // Activer le loading
    this.errorMessage = null;

    this.pDFPenaleDTO = new PDFPenaleDTO();
    this.pDFPenaleDTO.sansDetail = true;
    this.pDFPenaleDTO.sansImage = true;
    this.pDFPenaleDTO.idEnfant = detenu.detenuId;
    this.pDFPenaleDTO.numOrdinale = detenu.numOrdinaleArrestation;

    this.rapportService
      .genererFicheDeDetentionPdf(this.pDFPenaleDTO)
      .subscribe({
        next: (x) => {
          const blob = new Blob([x], { type: "application/pdf" });
          const data = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = data;
          link.download = "enfant.pdf";

          window.open(
            data,
            "_blank",
            "top=0,left=0,bottom=0,right=0,height=100%,width=auto"
          );
          this.click = false; // Désactiver le loading après succès
        },
        error: (err) => {
          this.click = false; // Désactiver le loading même en cas d'erreur
          console.error("Erreur de génération du PDF :", err);
          this.service.add({
            key: "tst",
            severity: "error",
            summary: "⚠ Échec",
            detail: "Échec de la génération du PDF, veuillez réessayer.",
          });
        },
      });
  }
/////////////////////////////////////////////////////////////////////////

}
