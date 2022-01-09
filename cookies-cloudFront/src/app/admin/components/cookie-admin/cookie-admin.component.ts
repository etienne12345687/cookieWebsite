import { Component, OnInit } from '@angular/core';
import { CookieService } from 'src/app/services/cookie.service';
import { ICookies } from 'src/app/utils/modele/cookies';

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
  listeCookie:Array<ICookies> = [];
  priceValidation='';

  constructor(private cookieServ: CookieService) { }

  ngOnInit(): void {
    this.getCookie();
  }

  getCookie(){
    this.cookieServ.getAll().subscribe(data => {
      this.listeCookie = data.data;
    },
    error => {
      console.log(error);
    });
  }

  saveCookie(): void {
    const data = {
      nom: this.cookie.nom,
      prix: this.cookie.prix,
      recette: this.cookie.recette,
      photo: this.cookie.photo,
    };

    if (this.cookie.prix === null){
      this.priceValidation = 'Veuillez insérer un nombre valide';
    } else {
      this.cookieServ.create(data)
      .subscribe(
        (        response: any) => {
          console.log(response);
          this.submitted = true;
          window.location.reload();
        },
        (        error: any) => {
          console.log(error);
        });
    }
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

  delete(idCookie: any){
    this.cookieServ.delete(idCookie).subscribe(
      (res: any) => {
        console.log(res);
        window.location.reload();
      },
      (error:any) => {
        console.log(error);
      }
    );
  }

  update(){
    /*
    this.panierServ.update(e._id, data).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      });
      */
  }
}
