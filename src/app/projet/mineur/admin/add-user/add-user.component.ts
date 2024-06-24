import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng';
import { CrudEnfantService } from 'src/app/demo/service/crud-enfant.service';
import { Etablissement } from 'src/app/domain/etablissement';
import { Personelle } from 'src/app/domain/personelle';
import { User } from 'src/app/domain/user';
import { BreadcrumbService } from 'src/app/shared/breadcrumb/breadcrumb.service';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  personelle:Personelle ;
  etablissements: SelectItem[];
  id;
  nom;
  prenom;
  login;
  pwd;

  etablissementLocal:Etablissement;
  @Output() closeEvent = new EventEmitter<boolean>();
  roles =[
    {label:'المكتب الجزائي ', value:'user'},
    {label:'   مركز الإعلامية', value:'mod'},
  
    ];
   
    role = null;
    user:User;
    form: any = { };
  constructor( private authService: AuthService, private crudservice: CrudEnfantService, private breadcrumbService: BreadcrumbService,private router: Router) { 
   }

  ngOnInit(): void {
    this.listEtab();
  }
  close() {
    this.closeEvent.emit(false);
  }
  addUser(){
    this.personelle= new Personelle();
    this.personelle.id=this.id;
    this.personelle.nom=this.nom;
    this.personelle.prenom=this.prenom;
    this.personelle.etablissement=this.etablissementLocal;

    this.crudservice.createLigne("personelle",   this.personelle)
    .subscribe(data => {
      if(data.result){
        console.log( data.result );
        this. onSubmit();
      
       
      }
    
      
    });
     
  }
   onChangeEta( event) {
    this.etablissementLocal=event.value;
   }
  listEtab(){
    this.crudservice.getlistEntity("etablissement").subscribe(data => {
      
      this.etablissements = [];
      data.result.forEach((etablissement: Etablissement, value: any) => {

        this.etablissements.push({ label: etablissement.libelle_etablissement, value: etablissement });
      });

    });
 
  }

  onChange(event) {
    
    this.role=event.value;
  }
  onSubmit(): void {
    this.form = {username: this.login, personelle :this.personelle,  role:   this.role ,
      password: this.pwd  };
    this.user  =this.form;
  
    this.user.role=[this.role];
    console.log("-------------");
    console.log(this.user);
    console.log("-------------");
     this.authService.register(this.user).subscribe(

     data => {
         console.log(data);
         this.closeEvent.emit(false);
      },
       err => {
        
       }
     );
  }
}
