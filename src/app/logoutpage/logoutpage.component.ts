import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-logoutpage',
  templateUrl: './logoutpage.component.html',
  styleUrls: ['./logoutpage.component.css']
})
export class LogoutpageComponent implements OnInit {

  constructor(private router: Router,
    private tokenStorageService: TokenStorageService,) { }

  ngOnInit() {
    this.tokenStorageService.signOut();
    // window.location.reload();
     this.router.navigate(['login']);
  }

}
