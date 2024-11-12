import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-next-document",
  templateUrl: "./next-document.component.html",
  styleUrls: ["./next-document.component.css"],
})
export class NextDocumentComponent implements OnInit {
  constructor(private router: Router) {}

  @Input() childId: string;

  ngOnInit(): void {}
  directions = [
    { label: "  بطاقات الإيواء    ", value: "/mineur/docHeber" },
    { label: "    بطاقات الإيداع ", value: "/mineur/docHeber" },

    { label: "     مضامين الأحكام    ", value: "/mineur/docRecup" },
    { label: "     إحالة قضية    ", value: "/mineur/Transfert" },
    { label: "       إيقاف تنفيذ  ", value: "/mineur/ArreterLexecution" },

    {
      label: "      طعن النيابة بالاستئناف       ",
      value: "/mineur/AppelParquet",
    },
    { label: "         مراجعة     ", value: "/mineur/Revue" },
    {
      label: "          طعن الطفل بالاستئناف      ",
      value: "/mineur/AppelEnfant",
    },
    { label: "   الفرارات   ", value: "/mineur/echappes" },
    { label: "  النقل  ", value: "/mineur/mutation" },
    { label: "   إجراءات السراح  ", value: "/mineur/liberation" },

    { label: "  الوفاة  ", value: "/mineur/deces" },
  ];
  nav;
  onChangeDir(event) {
    this.nav = event.value;
  }
  goTO() {
    if (!this.nav) {
      console.error("La direction de navigation n'est pas définie");
      return;
    }
    window.localStorage.removeItem("idValideNav");

    window.localStorage.setItem("idValideNav", this.childId);
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = "reload";
    this.router.navigate([this.nav]);
  }
}
