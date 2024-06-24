import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import {AppMainComponent} from '../../layouts/full/app.main.component';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
})
export class AppTopBarComponent implements OnInit{

    activeItem: number;
    currentUser: any;
    img: any;
    constructor(public app: AppMainComponent,private router: Router,private token: TokenStorageService) {
    }
    signout(){
        this.router.navigate(['/logoutpage']);

    }
    mobileMegaMenuItemClick(index) {
        this.app.megaMenuMobileClick = true;
        this.activeItem = this.activeItem === index ? null : index;
    }
    ngOnInit() {
  
        this.currentUser = this.token.getUser(); 
        this.img =this.currentUser.personelle.img;
      
       
    
      }
}
