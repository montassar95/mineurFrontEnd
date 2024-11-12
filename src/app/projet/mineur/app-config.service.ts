import { Injectable } from "@angular/core";
import { forkJoin, Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { CrudEnfantService } from "src/app/demo/service/crud-enfant.service";

@Injectable({
  providedIn: "root",
})
export class AppConfigService {
  private readonly entityTypes = [
    "nationalite",
    "niveauEducatif",
    "situationFamiliale",
    "gouvernorat",
    "classePenale",
    "situationSocial",
    "metier",
  ];

  constructor(private crudService: CrudEnfantService) {}

  getAllEntities(): Observable<any> {
    const requests = this.entityTypes.map((entity) =>
      this.crudService.getlistEntity(entity).pipe(
        catchError((error) => {
          console.error(`Erreur lors de la récupération de ${entity}:`, error);
          return of({ result: [] }); // Retourne un tableau vide en cas d'erreur
        })
      )
    );

    return forkJoin(requests).pipe(
      map((results) => this.mapResultsToEntities(results))
    );
  }

  private mapResultsToEntities(results: any[]): any {
    return this.entityTypes.reduce((acc, entity, index) => {
      acc[entity] = results[index].result;
      return acc;
    }, {});
  }
  calendarConfig = {
    closeText: "Fermer",
    prevText: "Précédent",
    nextText: "Suivant",
    currentText: "Aujourd'hui",
    monthNames: [
      " جانفــــي  ",
      " فيفـــري   ",
      " مــــارس  ",
      " أفريــــل  ",
      " مــــاي  ",
      " جــــوان  ",
      " جويليــــة  ",
      " أوت  ",
      " سبتمبــــر  ",
      " أكتوبــــر  ",
      " نوفمبــــر  ",
      " ديسمبــــر  ",
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
}
