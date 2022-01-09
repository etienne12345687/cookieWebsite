import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ICookies } from 'src/app/utils/modele/cookies';
import { CookieService } from 'src/app/services/cookie.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { PanierService } from 'src/app/services/panier.service';


@Component({
  selector: 'app-cookie',
  templateUrl: './cookie.component.html',
  styleUrls: ['./cookie.component.css']
})
export class CookieComponent implements OnInit {

  listeCookie:Array<ICookies> = [];
  isLoggedIn = false;
  form: any = {
    quantity: null,
  }
  isSuccessful = false;
  isFailed = false;
  validity= '';

  constructor(
    private tokenStorageService: TokenStorageService,
    public CookieServ: CookieService,
    public panierServ: PanierService) { 
  }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    this.getCookie();
  }

  getCookie(){
    this.CookieServ.getAll().subscribe(data => {
      this.listeCookie = data.data;
    },
    error => {
      console.log(error);
    });
  }

  addToPanier(element: any){
    const cookie = {
      cookie: element._id,
      quantity: this.form.quantity,
      user: this.tokenStorageService.getUser().id,
      prix: element.prix * this.form.quantity
    }
    
    if (this.form.quantity === null){
      this.validity = "Merci d'entrer un nombre.";
    } else {
      this.validity = "";
      this.panierServ.create(cookie).subscribe(
        (res: any) => {
          console.log(res);
          this.isSuccessful = true;
          this.isFailed = false;
          return ;
        },
        (error:any) => {
          console.log(error);
        }
      );
    }

  }

}
