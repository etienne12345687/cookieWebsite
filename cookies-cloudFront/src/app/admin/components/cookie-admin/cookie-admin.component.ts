import { Component, OnInit } from '@angular/core';
import { CookieService } from 'src/app/services/cookie.service';

@Component({
  selector: 'app-cookie-admin',
  templateUrl: './cookie-admin.component.html',
  styleUrls: ['./cookie-admin.component.css']
})
export class CookieAdminComponent implements OnInit {

  cookie = {
    nom: '',
    prix: 0,
    recette: '',
    photo: '',
  };
  submitted = false;

  constructor(private cookieService: CookieService) { }

  ngOnInit(): void {
  }

  saveCookie(): void {
    const data = {
      nom: this.cookie.nom,
      prix: this.cookie.prix,
      recette: this.cookie.recette,
      photo: this.cookie.photo,
    };

    this.cookieService.create(data)
      .subscribe(
        (        response: any) => {
          console.log(response);
          this.submitted = true;
        },
        (        error: any) => {
          console.log(error);
        });
  }

  newCookie(): void {
    this.submitted = false;
    this.cookie = {
      nom: '',
      prix: 0,
      recette: '',
      photo: '',
    };
  }
}
