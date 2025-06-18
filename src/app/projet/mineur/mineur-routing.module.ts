import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AccueilComponent } from "./accueil/accueil.component";

import { AddMutationComponent } from "./add-mutation/add-mutation.component";
import { AddNumArretComponent } from "./add-num-arret/add-num-arret.component";
import { AddUserComponent } from "./admin/add-user/add-user.component";
import { AllUsersComponent } from "./admin/all-users/all-users.component";
import { EtabChangeManiereComponent } from "./admin/etab-change-maniere/etab-change-maniere.component";
import { EtablissementComponent } from "./admin/etablissement/etablissement.component";
import { AffaireComponent } from "./affaire/affaire.component";
import { AllEnfantComponent } from "./all-enfant/all-enfant.component";

import { AppelEnfantComponent } from "./appel-enfant/appel-enfant.component";
import { AppelParquetComponent } from "./appel-parquet/appel-parquet.component";
import { ArreterLexecutionComponent } from "./arreter-lexecution/arreter-lexecution.component";
import { AttrapeComponent } from "./attrape/attrape.component";
import { CarteDepotComponent } from "./carte-depot/carte-depot.component";
import { CarteHebergementComponent } from "./carte-hebergement/carte-hebergement.component";

import { CarteRecupComponent } from "./carte-recup/carte-recup.component";
import { ChangementLieuComponent } from "./changement-lieu/changement-lieu.component";
import { ChangementComponent } from "./changement/changement.component";
import { CodeComponent } from "./code/code.component";
import { CauseDecesComponent } from "./code_libelle/cause-deces/cause-deces.component";
import { CauseLiberationComponent } from "./code_libelle/cause-liberation/cause-liberation.component";
import { CauseMutationComponent } from "./code_libelle/cause-mutation/cause-mutation.component";
import { ClassePenaleComponent } from "./code_libelle/classe-penale/classe-penale.component";
import { CommentEchapperComponent } from "./code_libelle/comment-echapper/comment-echapper.component";
import { CommentTrouverComponent } from "./code_libelle/comment-trouver/comment-trouver.component";
import { DelegationComponent } from "./code_libelle/delegation/delegation.component";
import { GouvernoratComponent } from "./code_libelle/gouvernorat/gouvernorat.component";
import { JugeComponent } from "./code_libelle/juge/juge.component";
import { LieuDecesComponent } from "./code_libelle/lieu-deces/lieu-deces.component";
import { MetierComponent } from "./code_libelle/metier/metier.component";
import { MotifArreterlexecutionComponent } from "./code_libelle/motif-arreterlexecution/motif-arreterlexecution.component";
import { NationaliteComponent } from "./code_libelle/nationalite/nationalite.component";
import { NiveauEducatifComponent } from "./code_libelle/niveau-educatif/niveau-educatif.component";
import { ResultatTransfertComponent } from "./code_libelle/resultat-transfert/resultat-transfert.component";
import { SituationFamilialeComponent } from "./code_libelle/situation-familiale/situation-familiale.component";
import { SituationSocialComponent } from "./code_libelle/situation-social/situation-social.component";
import { TitreAccusationComponent } from "./code_libelle/titre-accusation/titre-accusation.component";
import { TribunalComponent } from "./code_libelle/tribunal/tribunal.component";
import { TypeAffaireComponent } from "./code_libelle/type-affaire/type-affaire.component";
import { TypeJugeComponent } from "./code_libelle/type-juge/type-juge.component";
import { TypeTribunalComponent } from "./code_libelle/type-tribunal/type-tribunal.component";
import { DecesComponent } from "./deces/deces.component";
import { DetailleEnfantComponent } from "./detaille-enfant/detaille-enfant.component";
import { DocDepotComponent } from "./doc-depot/doc-depot.component";
import { DocHebergementComponent } from "./doc-hebergement/doc-hebergement.component";

import { DocRecupComponent } from "./doc-recup/doc-recup.component";
import { DocumentComponent } from "./document/document.component";
import { EchappesComponent } from "./echappes/echappes.component";
import { IdentiteComponent } from "./identite/identite.component";
import { LiberationComponent } from "./liberation/liberation.component";
import { ListPenaleComponent } from "./listing/list-penale/list-penale.component";
import { ModifierMutaionComponent } from "./modifier-mutaion/modifier-mutaion.component";
import { MoreInformatonComponent } from "./more-informaton/more-informaton.component";
import { MutationComponent } from "./mutation/mutation.component";
import { ProcedureAppelComponent } from "./procedure-appel/procedure-appel.component";
import { PropagationComponent } from "./propagation/propagation.component";
import { RechEnfantComponent } from "./rech-enfant/rech-enfant.component";
import { RevueComponent } from "./revue/revue.component";
import { StatiqueComponent } from "./statique/statique.component";
import { TestComponent } from "./test/test.component";
import { Test1Component } from "./test1/test1.component";
import { TransfertComponent } from "./transfert/transfert.component";

import { StatistiqueSpecComponent } from "./statistique-spec/statistique-spec.component";
import { AddEnfantComponent } from "./add-enfant/add-enfant.component";
import { MensuelComponent } from "./mensuel/mensuel.component";
import { ModifyPasswordComponent } from "./modify-password/modify-password.component";
import { OppositionComponent } from "./opposition/opposition.component";
import { ObservationComponent } from "./observation/observation.component";
import { ShowPenaleComponent } from "./show-penale/show-penale.component";
import { DetailleAffaireComponent } from "./detaille-affaire/detaille-affaire.component";
import { SocialGlobalComponent } from "./social-global/social-global.component";
import { FormationComponent } from "./formation/formation.component";
import { SupportServicesComponent } from "./support-services/support-services.component";
import { VisitFamilyComponent } from "./visit-family/visit-family.component";
import { JudicialDisciplinaryComponent } from "./judicial-disciplinary/judicial-disciplinary.component";
 
const routes: Routes = [
  {
    path: "",
    data: { title: "mineur" },
    children: [
      //  { path: 'recup/:id', component: CarteRecupComponent },
      { path: "test1", component: Test1Component },
      { path: "", component: AccueilComponent },

      {
        path: "MoreInformation/:id/:source",
        component: MoreInformatonComponent,
      },

      {
        path: "showPenale/:id/:tcoddet/:source",
        component: ShowPenaleComponent,
      },

      {
        path: "ModifyPassword",
        component: ModifyPasswordComponent,
      },

      { path: "StatistiqueSpec", component: StatistiqueSpecComponent },

      { path: "test", component: TestComponent },
      { path: "recup", component: CarteRecupComponent },
      { path: "depot", component: CarteDepotComponent },
      { path: "Heber", component: CarteHebergementComponent },

      { path: "all", component: AllEnfantComponent },
      { path: "rech", component: RechEnfantComponent },
      { path: "identite", component: IdentiteComponent },
      { path: "mutation", component: MutationComponent },
      { path: "modifierMutation", component: ModifierMutaionComponent },
      { path: "attrape", component: AttrapeComponent },
      { path: "echappes", component: EchappesComponent },
      { path: "deces", component: DecesComponent },
      { path: "liberation", component: LiberationComponent },

      { path: "docRecup", component: DocRecupComponent },
      { path: "docHeber", component: DocHebergementComponent },
      { path: "docDepot", component: DocDepotComponent },
      { path: "doc", component: DocumentComponent },

      { path: "addEnfant", component: AddEnfantComponent },
      { path: "code", component: CodeComponent },
      { path: "ProcedureAppel", component: ProcedureAppelComponent },
      { path: "Affaire", component: AffaireComponent },
      { path: "detailleAffaire", component: DetailleAffaireComponent },

      { path: "Changement", component: ChangementComponent },
      { path: "AppelParquet", component: AppelParquetComponent },
      { path: "AppelEnfant", component: AppelEnfantComponent },
      { path: "Revue", component: RevueComponent },
      { path: "Transfert", component: TransfertComponent },
      { path: "AddMutation", component: AddMutationComponent },
      { path: "AddNumArret", component: AddNumArretComponent },
      { path: "DetailleEnfant", component: DetailleEnfantComponent },
      { path: "Statique", component: StatiqueComponent },
      { path: "ArreterLexecution", component: ArreterLexecutionComponent },
      { path: "AllUsers", component: AllUsersComponent },
      { path: "AddUser", component: AddUserComponent },

      { path: "Nationalite", component: NationaliteComponent },
      { path: "NiveauEducatif", component: NiveauEducatifComponent },
      { path: "SituationFamiliale", component: SituationFamilialeComponent },
      { path: "ClassePenale", component: ClassePenaleComponent },
      { path: "Gouvernorat", component: GouvernoratComponent },
      { path: "Delegation", component: DelegationComponent },
      { path: "TypeAffaire", component: TypeAffaireComponent },
      { path: "TitreAccusation", component: TitreAccusationComponent },
      { path: "TypeJuge", component: TypeJugeComponent },
      { path: "Tribunal", component: TribunalComponent },
      { path: "CommentEchapper", component: CommentEchapperComponent },
      { path: "CommentTrouver", component: CommentTrouverComponent },
      { path: "CauseMutation", component: CauseMutationComponent },
      { path: "CauseLiberation", component: CauseLiberationComponent },

      { path: "Opposition", component: OppositionComponent },
      { path: "Observation", component: ObservationComponent },

      {
        path: "MotifArreterlexecution",
        component: MotifArreterlexecutionComponent,
      },
      { path: "LieuDeces", component: LieuDecesComponent },
      { path: "CauseDeces", component: CauseDecesComponent },

      { path: "TypeTribunal", component: TypeTribunalComponent },

      { path: "Etablissement", component: EtablissementComponent },

      { path: "EtabChangeManiere", component: EtabChangeManiereComponent },

      { path: "ResultatTransfert", component: ResultatTransfertComponent },

      { path: "Metier", component: MetierComponent },

      { path: "SituationSocial", component: SituationSocialComponent },

      { path: "Juge", component: JugeComponent },

      { path: "mensuel", component: MensuelComponent },

      { path: "ListPenale", component: ListPenaleComponent },

      { path: "Propagation", component: PropagationComponent },

      { path: "ChangementLieu", component: ChangementLieuComponent },
      { path: "socialGlobal", component: SocialGlobalComponent },
      { path: "visitFamily", component: VisitFamilyComponent },
      { path: "formation", component: FormationComponent },
      { path: "supportServices", component: SupportServicesComponent },
      {
        path: "judicialDisciplinary",
        component: JudicialDisciplinaryComponent,
      },
      
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MineurRoutingModule {}
