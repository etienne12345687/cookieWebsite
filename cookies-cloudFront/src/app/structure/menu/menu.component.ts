import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage.service';


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

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.replace('http://localhost:4200/');
  }
}
