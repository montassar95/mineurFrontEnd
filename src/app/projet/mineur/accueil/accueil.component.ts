import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TokenStorageService } from "src/app/_services/token-storage.service";
import { Product } from "src/app/demo/domain/product";
import { CrudEnfantService } from "src/app/demo/service/crud-enfant.service";
import { AppMainComponent } from "src/app/layouts/full/app.main.component";
import { BreadcrumbService } from "src/app/shared/breadcrumb/breadcrumb.service";

@Component({
  selector: "app-accueil",
  templateUrl: "./accueil.component.html",
  styleUrls: ["./accueil.component.scss"],
})
export class AccueilComponent implements OnInit {
  products: Product[];

  responsiveOptions;
  currentUser: any;

  constructor(
    public app: AppMainComponent,
    private crudservice: CrudEnfantService,
    private breadcrumbService: BreadcrumbService,
    private router: Router,
    private token: TokenStorageService
  ) {
    this.breadcrumbService.setItems([{ label: "الإستقبال" }]);
    this.responsiveOptions = [
      {
        breakpoint: "1024px",
        numVisible: 3,
        numScroll: 3,
      },
      {
        breakpoint: "768px",
        numVisible: 2,
        numScroll: 2,
      },
      {
        breakpoint: "560px",
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }
  indices = 75; // Exemple de valeur
  alertesGraves = 5; // Exemple de valeur
  ageMoyen = 34; // Exemple de valeur
  affairesDangereuses = 3; // Exemple de valeur
  ngOnInit() {
    this.currentUser = this.token.getUserFromTokenFromToken();

    if (!this.currentUser) {
      this.router.navigate(["/logoutpage"]);
    }

    // this.enfantList();
    this.products = this.products = [
      {
        id: "1000",
        code: "f230fh0g3",
        name: "مركز إصلاح مروج 2",
        description: "voiture",
        image: "bamboo-watch.jpg",
        price: 6500,
        category: "Ben arous",
        quantity: 24,
        inventoryStatus: "28/10/2020",
        rating: 5,
      },
      {
        id: "1000",
        code: "f230fh0g3",
        name: "مركز إصلاح مروج 2",
        description: "voiture",
        image: "bamboo-watch.jpg",
        price: 6500,
        category: "Ben arous",
        quantity: 24,
        inventoryStatus: "28/10/2020",
        rating: 5,
      },
      {
        id: "1000",
        code: "f230fh0g3",
        name: "مركز إصلاح مروج 2",
        description: "voiture",
        image: "bamboo-watch.jpg",
        price: 6500,
        category: "Ben arous",
        quantity: 24,
        inventoryStatus: "28/10/2020",
        rating: 5,
      },
    ];
  }
  question: string = "";
  answer: string = "";
  loading: boolean = false;
  error: string | null = null;

  ask() {
    this.loading = true;
    this.error = null;
    this.answer = "";

    this.crudservice.askQuestion(this.question).subscribe({
      next: (res) => {
        this.answer = res;
        this.loading = false;
      },
      error: (err) => {
        this.error = "Erreur lors de la requête";
        this.loading = false;
      },
    });
  }
  // enfantList() {
  //   this.crudEnfantService.getlistEntity("enfant").subscribe((data) => {
  //     console.log(data.result);
  //   });
  // }
}
