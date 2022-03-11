import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { trigger, state, transition, style, animate } from '@angular/animations';  
import { DOCUMENT } from '@angular/common';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  isLoggedIn = false;
  isAdmin = false;
      
  constructor(private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.tokenStorageService.getUser().roles == 'ROLE_ADMIN'){
      this.isAdmin = true;
    };
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e: any) {
     if (window.pageYOffset > 300) {
       let element = document.getElementById('navbar');
       if (element != null) {
        element.classList.add('sticky');
       }
     } else {
      let element = document.getElementById('navbar');
      if (element != null) {
        element.classList.remove('sticky'); 
      }
     }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.replace('http://localhost:4200/');
  }
}
