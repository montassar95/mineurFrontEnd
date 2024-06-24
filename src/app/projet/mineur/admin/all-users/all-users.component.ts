import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrudEnfantService } from 'src/app/demo/service/crud-enfant.service';
import { Personelle } from 'src/app/domain/personelle';
import { User } from 'src/app/domain/user';
import { BreadcrumbService } from 'src/app/shared/breadcrumb/breadcrumb.service';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {


  users : User[]= [];
  displayAddUser=false;

  constructor(  private crudservice: CrudEnfantService, private breadcrumbService: BreadcrumbService,private router: Router) { 
    this.breadcrumbService.setItems([
      {label: 'الإستقبال', routerLink: ['/']},
  
      {label: 'المستعملين' },
      {label: ' قائمة  المستعملين' },
  ]);}




  ngOnInit(): void {
    this.showAllUsers();
  }

addUser() {
  this.displayAddUser=true;
 
}
close(display:boolean) {
  this.displayAddUser=display;
  this.showAllUsers();
}
  showAllUsers() {
      
        
           
       
       
         
          this.crudservice.getlistEntity("user")
          .subscribe( data => {
            if(data.result){
           
               
              this.users= data.result;
           
              console.log( "zzzzzzzz")
              console.log(data.result)
            }
            else{
              console.log( "xxxxxxx")
             
              
           
            }

           
          });
    

    }



    delete(personelle: Personelle){
 
      this.crudservice.deleteLigne("personelle", personelle.id) .subscribe(data => {
        console.log(data.message);
        this.showAllUsers();
      });
    }
  }
