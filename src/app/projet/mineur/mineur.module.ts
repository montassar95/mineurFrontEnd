import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AccordionModule } from "primeng/accordion";
import { AutoCompleteModule } from "primeng/autocomplete";
import { BreadcrumbModule } from "primeng/breadcrumb";
import { ButtonModule } from "primeng/button";
import { CalendarModule } from "primeng/calendar";
import { CardModule } from "primeng/card";
import { CarouselModule } from "primeng/carousel";
import { ChartModule } from "primeng/chart";
import { CheckboxModule } from "primeng/checkbox";
import { ChipsModule } from "primeng/chips";
import { CodeHighlighterModule } from "primeng/codehighlighter";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ColorPickerModule } from "primeng/colorpicker";
import { ContextMenuModule } from "primeng/contextmenu";
import { DataViewModule } from "primeng/dataview";
import { DialogModule } from "primeng/dialog";
import { DropdownModule } from "primeng/dropdown";
import { EditorModule } from "primeng/editor";
import { FieldsetModule } from "primeng/fieldset";
import { FileUploadModule } from "primeng/fileupload";
import { FullCalendarModule } from "primeng/fullcalendar";
import { GalleriaModule } from "primeng/galleria";
import { InplaceModule } from "primeng/inplace";
import { InputMaskModule } from "primeng/inputmask";
import { InputSwitchModule } from "primeng/inputswitch";
import { InputTextModule } from "primeng/inputtext";
import { InputTextareaModule } from "primeng/inputtextarea";
import { LightboxModule } from "primeng/lightbox";
import { ListboxModule } from "primeng/listbox";
import { MegaMenuModule } from "primeng/megamenu";
import { MenuModule } from "primeng/menu";
import { MenubarModule } from "primeng/menubar";
import { MessagesModule } from "primeng/messages";
import { MessageModule } from "primeng/message";
import { MultiSelectModule } from "primeng/multiselect";
import { OrderListModule } from "primeng/orderlist";
import { OrganizationChartModule } from "primeng/organizationchart";
import { OverlayPanelModule } from "primeng/overlaypanel";
import { PaginatorModule } from "primeng/paginator";
import { PanelModule } from "primeng/panel";
import { PanelMenuModule } from "primeng/panelmenu";
import { PasswordModule } from "primeng/password";
import { PickListModule } from "primeng/picklist";
import { ProgressBarModule } from "primeng/progressbar";
import { RadioButtonModule } from "primeng/radiobutton";
import { RatingModule } from "primeng/rating";
import { ScrollPanelModule } from "primeng/scrollpanel";
import { SelectButtonModule } from "primeng/selectbutton";
import { SlideMenuModule } from "primeng/slidemenu";
import { SliderModule } from "primeng/slider";
import { SpinnerModule } from "primeng/spinner";
import { SplitButtonModule } from "primeng/splitbutton";
import { StepsModule } from "primeng/steps";
import { TabMenuModule } from "primeng/tabmenu";
import { TableModule } from "primeng/table";
import { TabViewModule } from "primeng/tabview";
import { TerminalModule } from "primeng/terminal";
import { TieredMenuModule } from "primeng/tieredmenu";
import { ToastModule } from "primeng/toast";
import { ToggleButtonModule } from "primeng/togglebutton";
import { ToolbarModule } from "primeng/toolbar";
import { TooltipModule } from "primeng/tooltip";
import { TreeModule } from "primeng/tree";
import { TreeTableModule } from "primeng/treetable";
import { VirtualScrollerModule } from "primeng/virtualscroller";
import { FormsModule } from "@angular/forms";

import { NgxSpinnerModule } from "ngx-spinner";

import { MatStepperModule } from "@angular/material/stepper";

import { MatButtonModule } from "@angular/material/button";
import { MatTableModule } from "@angular/material/table";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatTabsModule } from "@angular/material/tabs";
import { MatInputModule } from "@angular/material/input";

import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { MatRadioModule } from "@angular/material/radio";
import { MatIconModule } from "@angular/material/icon";

import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";

import { ReactiveFormsModule } from "@angular/forms";

import { MineurRoutingModule } from "./mineur-routing.module";
import { Test1Component } from "./test1/test1.component";
import { AccueilComponent } from "./accueil/accueil.component";

import { AddNumArretComponent } from "./add-num-arret/add-num-arret.component";
import { AffaireComponent } from "./affaire/affaire.component";
import { AllEnfantComponent } from "./all-enfant/all-enfant.component";

import { AttrapeComponent } from "./attrape/attrape.component";
import { CarteDepotComponent } from "./carte-depot/carte-depot.component";
import { CarteRecupComponent } from "./carte-recup/carte-recup.component";
import { CodeComponent } from "./code/code.component";
import { DecesComponent } from "./deces/deces.component";
import { DocDepotComponent } from "./doc-depot/doc-depot.component";
import { DocRecupComponent } from "./doc-recup/doc-recup.component";
import { DocumentComponent } from "./document/document.component";
import { EchappesComponent } from "./echappes/echappes.component";
import { IdentiteComponent } from "./identite/identite.component";
import { LiberationComponent } from "./liberation/liberation.component";
import { ModifierMutaionComponent } from "./modifier-mutaion/modifier-mutaion.component";
import { MutationComponent } from "./mutation/mutation.component";
import { ProcedureAppelComponent } from "./procedure-appel/procedure-appel.component";
import { RechEnfantComponent } from "./rech-enfant/rech-enfant.component";
import { TestComponent } from "./test/test.component";
import { UneAnnonceComponent } from "./une-annonce/une-annonce.component";
import { HttpClientModule } from "@angular/common/http";
import { BreadcrumbService } from "src/app/shared/breadcrumb/breadcrumb.service";
import { MoreInformatonComponent } from "./more-informaton/more-informaton.component";
import { AppelParquetComponent } from "./appel-parquet/appel-parquet.component";
import { AppelEnfantComponent } from "./appel-enfant/appel-enfant.component";
import { RevueComponent } from "./revue/revue.component";
import { TransfertComponent } from "./transfert/transfert.component";
import { AddTransfertComponent } from "./add-transfert/add-transfert.component";
import { AddAppelEnfantComponent } from "./add-appel-enfant/add-appel-enfant.component";
import { AddAppelParquetComponent } from "./add-appel-parquet/add-appel-parquet.component";
import { AddRevueComponent } from "./add-revue/add-revue.component";
import { AddMutationComponent } from "./add-mutation/add-mutation.component";

import { MatButtonToggleModule } from "@angular/material/button-toggle";

import { StatiqueComponent } from "./statique/statique.component";
import { GuideComponent } from "./guide/guide.component";
import { ChangementComponent } from "./changement/changement.component";
import { AddEchappesComponent } from "./add-echappes/add-echappes.component";
import { AddDecesComponent } from "./add-deces/add-deces.component";
import { AddLiberationComponent } from "./add-liberation/add-liberation.component";

import { MatMenuModule } from "@angular/material/menu";
import { ShowCarteRecupComponent } from "./show/show-carte-recup/show-carte-recup.component";
import { ShowCarteDepotComponent } from "./show/show-carte-depot/show-carte-depot.component";
import { ShowTransfertComponent } from "./show/show-transfert/show-transfert.component";
import { ShowAppelParquetComponent } from "./show/show-appel-parquet/show-appel-parquet.component";
import { ShowRevueComponent } from "./show/show-revue/show-revue.component";
import { ShowAppelEnfantComponent } from "./show/show-appel-enfant/show-appel-enfant.component";
import { ShowEchappesComponent } from "./show/show-echappes/show-echappes.component";
import { ShowMutationComponent } from "./show/show-mutation/show-mutation.component";
import { ShowLiberationComponent } from "./show/show-liberation/show-liberation.component";
import { ShowDecesComponent } from "./show/show-deces/show-deces.component";
import { ArreterLexecutionComponent } from "./arreter-lexecution/arreter-lexecution.component";
import { AddArreterLexecutionComponent } from "./add-arreter-lexecution/add-arreter-lexecution.component";
import { ShowArreterLexecutionComponent } from "./show/show-arreter-lexecution/show-arreter-lexecution.component";

import { EditDocumentComponent } from "./edit-document/edit-document.component";
import { AllUsersComponent } from "./admin/all-users/all-users.component";
import { AddUserComponent } from "./admin/add-user/add-user.component";
import { NationaliteComponent } from "./code_libelle/nationalite/nationalite.component";
import { NiveauEducatifComponent } from "./code_libelle/niveau-educatif/niveau-educatif.component";
import { SituationFamilialeComponent } from "./code_libelle/situation-familiale/situation-familiale.component";
import { ClassePenaleComponent } from "./code_libelle/classe-penale/classe-penale.component";
import { GouvernoratComponent } from "./code_libelle/gouvernorat/gouvernorat.component";
import { DelegationComponent } from "./code_libelle/delegation/delegation.component";
import { TypeAffaireComponent } from "./code_libelle/type-affaire/type-affaire.component";
import { TitreAccusationComponent } from "./code_libelle/titre-accusation/titre-accusation.component";
import { TypeJugeComponent } from "./code_libelle/type-juge/type-juge.component";
import { TribunalComponent } from "./code_libelle/tribunal/tribunal.component";
import { CommentEchapperComponent } from "./code_libelle/comment-echapper/comment-echapper.component";
import { CommentTrouverComponent } from "./code_libelle/comment-trouver/comment-trouver.component";
import { CauseMutationComponent } from "./code_libelle/cause-mutation/cause-mutation.component";
import { CauseLiberationComponent } from "./code_libelle/cause-liberation/cause-liberation.component";
import { MotifArreterlexecutionComponent } from "./code_libelle/motif-arreterlexecution/motif-arreterlexecution.component";
import { LieuDecesComponent } from "./code_libelle/lieu-deces/lieu-deces.component";
import { CauseDecesComponent } from "./code_libelle/cause-deces/cause-deces.component";
import { TypeTribunalComponent } from "./code_libelle/type-tribunal/type-tribunal.component";
import { EtablissementComponent } from "./admin/etablissement/etablissement.component";
import { ResultatTransfertComponent } from "./code_libelle/resultat-transfert/resultat-transfert.component";
import { MetierComponent } from "./code_libelle/metier/metier.component";
import { SituationSocialComponent } from "./code_libelle/situation-social/situation-social.component";
import { JugeComponent } from "./code_libelle/juge/juge.component";
import { CarteHebergementComponent } from "./carte-hebergement/carte-hebergement.component";
import { DocHebergementComponent } from "./doc-hebergement/doc-hebergement.component";
import { ShowCarteHebergementComponent } from "./show/show-carte-hebergement/show-carte-hebergement.component";
import { EditCarteRecupComponent } from "./edit/edit-carte-recup/edit-carte-recup.component";
import { ListPenaleComponent } from "./listing/list-penale/list-penale.component";
import { DetailleEnfantComponent } from "./detaille-enfant/detaille-enfant.component";

import { EtabChangeManiereComponent } from "./admin/etab-change-maniere/etab-change-maniere.component";

import { ChangementLieuComponent } from "./changement-lieu/changement-lieu.component";
import { ShowRefuseRevueComponent } from "./show/show-refuse-revue/show-refuse-revue.component";
import { PropagationComponent } from "./propagation/propagation.component";
import { AddPropagationComponent } from "./add-propagation/add-propagation.component";
import { ShowCartePropagationComponent } from "./show/show-carte-propagation/show-carte-propagation.component";
import { AddChangementLieuComponent } from "./add-changement-lieu/add-changement-lieu.component";
import { ShowChangementLieuComponent } from "./show/show-changement-lieu/show-changement-lieu.component";
import { HighchartsChartComponent } from "highcharts-angular";
import { StatistiqueSpecComponent } from "./statistique-spec/statistique-spec.component";
import { AddVisiteComponent } from "./add-visite/add-visite.component";
import { AddEnfantComponent } from "./add-enfant/add-enfant.component";
import { MensuelComponent } from "./mensuel/mensuel.component";
import { NextDocumentComponent } from "./next-document/next-document.component";
import { DetailsEnfantComponent } from "./details-enfant/details-enfant.component";
import { ModifyPasswordComponent } from './modify-password/modify-password.component';
import { OppositionComponent } from './opposition/opposition.component';
import { AddOppositionComponent } from './add-opposition/add-opposition.component';
import { ObservationComponent } from './observation/observation.component';
import { AddObservationComponent } from './add-observation/add-observation.component';
import { ShowObservationComponent } from './show/show-observation/show-observation.component';
import { ShowOppositionComponent } from './show/show-opposition/show-opposition.component';
import { ShowPenaleComponent } from './show-penale/show-penale.component';
import { DetailleAffaireComponent } from './detaille-affaire/detaille-affaire.component';
import { SocialGlobalComponent } from './social-global/social-global.component';
import { VisitFamilyComponent } from './visit-family/visit-family.component';
import { FormationComponent } from './formation/formation.component';
import { SupportServicesComponent } from './support-services/support-services.component';
import { JudicialDisciplinaryComponent } from './judicial-disciplinary/judicial-disciplinary.component';
<<<<<<< HEAD
import { ChatModule } from "src/chat/chat.module";
=======
 
>>>>>>> b6c996e8a0b6692ef323c3a6b17fc61e143ec728

@NgModule({
  declarations: [
    Test1Component,
    AccueilComponent,

    UneAnnonceComponent,
    AddEnfantComponent,
    TestComponent,
    RechEnfantComponent,
    AllEnfantComponent,
    CarteDepotComponent,
    CarteRecupComponent,
    IdentiteComponent,
    DocumentComponent,
    DocDepotComponent,
    DocRecupComponent,
    AddNumArretComponent,
    CodeComponent,
    MutationComponent,
    ModifierMutaionComponent,
    AttrapeComponent,
    EchappesComponent,
    DecesComponent,
    LiberationComponent,
    ProcedureAppelComponent,
    AffaireComponent,
    MoreInformatonComponent,
    AppelParquetComponent,
    AppelEnfantComponent,
    RevueComponent,
    TransfertComponent,
    AddTransfertComponent,
    AddAppelEnfantComponent,
    AddAppelParquetComponent,
    AddRevueComponent,
    AddMutationComponent,

    StatiqueComponent,
    GuideComponent,
    ChangementComponent,
    AddEchappesComponent,
    AddDecesComponent,
    AddLiberationComponent,
    ShowCarteRecupComponent,
    ShowCarteDepotComponent,
    ShowTransfertComponent,
    ShowAppelParquetComponent,
    ShowRevueComponent,
    ShowAppelEnfantComponent,
    ShowEchappesComponent,
    ShowMutationComponent,
    ShowLiberationComponent,
    ShowDecesComponent,
    ArreterLexecutionComponent,
    AddArreterLexecutionComponent,
    ShowArreterLexecutionComponent,

    EditDocumentComponent,
    AllUsersComponent,
    AddUserComponent,
    NationaliteComponent,
    NiveauEducatifComponent,
    SituationFamilialeComponent,
    ClassePenaleComponent,
    GouvernoratComponent,
    DelegationComponent,
    TypeAffaireComponent,
    TitreAccusationComponent,
    TypeJugeComponent,
    TribunalComponent,
    CommentEchapperComponent,
    CommentTrouverComponent,
    CauseMutationComponent,
    CauseLiberationComponent,
    MotifArreterlexecutionComponent,
    LieuDecesComponent,
    CauseDecesComponent,
    TypeTribunalComponent,
    EtablissementComponent,
    ResultatTransfertComponent,
    MetierComponent,
    SituationSocialComponent,
    JugeComponent,
    CarteHebergementComponent,
    DocHebergementComponent,
    ShowCarteHebergementComponent,
    EditCarteRecupComponent,
    ListPenaleComponent,
    DetailleEnfantComponent,
    EtabChangeManiereComponent,
    PropagationComponent,
    ChangementLieuComponent,
    ShowRefuseRevueComponent,
    AddPropagationComponent,
    ShowCartePropagationComponent,
    AddChangementLieuComponent,
    ShowChangementLieuComponent,
    HighchartsChartComponent,
    StatistiqueSpecComponent,
    AddVisiteComponent,
    MensuelComponent,
    NextDocumentComponent,
    DetailsEnfantComponent,
    ModifyPasswordComponent,
    OppositionComponent,
    AddOppositionComponent,
    ObservationComponent,
    AddObservationComponent,
    ShowObservationComponent,
    ShowOppositionComponent,
    ShowPenaleComponent,
    DetailleAffaireComponent,
    SocialGlobalComponent,
    VisitFamilyComponent,
    FormationComponent,
    SupportServicesComponent,
    JudicialDisciplinaryComponent,
  ],
  imports: [
    CommonModule,
    MineurRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    AccordionModule,
    AutoCompleteModule,
    BreadcrumbModule,
    ButtonModule,
    CalendarModule,
    CardModule,
    CarouselModule,
    ChartModule,
    CheckboxModule,
    ChipsModule,
    CodeHighlighterModule,
    ConfirmDialogModule,
    ColorPickerModule,
    ContextMenuModule,
    DataViewModule,
    DialogModule,
    DropdownModule,
    EditorModule,
    FieldsetModule,
    FileUploadModule,
    FullCalendarModule,
    GalleriaModule,
    InplaceModule,
    InputMaskModule,
    InputSwitchModule,
    InputTextModule,
    InputTextareaModule,
    LightboxModule,
    ListboxModule,
    MegaMenuModule,
    MenuModule,
    MenubarModule,
    MessageModule,
    MessagesModule,
    MultiSelectModule,
    OrderListModule,
    OrganizationChartModule,
    OverlayPanelModule,
    PaginatorModule,
    PanelModule,
    PanelMenuModule,
    PasswordModule,
    PickListModule,
    ProgressBarModule,
    RadioButtonModule,
    RatingModule,
    ScrollPanelModule,
    SelectButtonModule,
    SlideMenuModule,
    SliderModule,
    SpinnerModule,
    SplitButtonModule,
    StepsModule,
    TableModule,
    TabMenuModule,
    TabViewModule,
    TerminalModule,
    TieredMenuModule,
    ToastModule,
    ToggleButtonModule,
    ToolbarModule,
    TooltipModule,
    TreeModule,
    TreeTableModule,
    VirtualScrollerModule,
    NgxSpinnerModule,
    MatStepperModule,
    MatButtonModule,
    MatTableModule,
    MatTooltipModule,
    MatTabsModule,
    MatInputModule,

    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatMenuModule,
<<<<<<< HEAD
     ChatModule,
=======
   
>>>>>>> b6c996e8a0b6692ef323c3a6b17fc61e143ec728
  ],
  exports: [
    AddUserComponent, // Exportez le composant pour qu'il soit accessible dans d'autres modules
  ],
  //    providers: [   BreadcrumbService
  // ],
})
export class MineurModule {}
