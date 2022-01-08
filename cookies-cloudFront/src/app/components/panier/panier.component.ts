import { Component, OnInit } from '@angular/core';
import { CookieService } from 'src/app/services/cookie.service';
import { PanierService } from 'src/app/services/panier.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {

  currentPanier: Array<any> = [];
  previousPanier: Array<any> = [];
  panier: Array<any> = [];

  constructor(
    private tokenStorageService: TokenStorageService,
    public CookieServ: CookieService,
    public panierServ: PanierService) { 
  }

  ngOnInit(): void {
    this.initPanier();
  }

  initPanier(){
    this.panierServ.getAll().subscribe(data => {
      data.data.forEach( (e: { user: any; active: boolean; }) => {
        if (e.user.toString() === this.tokenStorageService.getUser().id){
          if (e.active === true){
            this.currentPanier.push(e);
          } else {
            this.previousPanier.push(e);
          }
        };
      },
        (error: any) => {
        console.log(error);
      });
    });
  }

  getCookieInfo(){
    this.currentPanier.forEach( e => {
      
    })
  }

}
