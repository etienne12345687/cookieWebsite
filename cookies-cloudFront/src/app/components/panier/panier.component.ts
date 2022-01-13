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
  currentPanierEmpty= true;
  previousPanierEmpty= true;

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
      data.data.forEach( (e: { user: { toString: () => any; }; payed: boolean; _id: any; cookie: any; prix: any; quantity: any; }) => {
        if (e.user.toString() === this.tokenStorageService.getUser().id){
          if (e.payed === false){
            this.currentPanier.push({
              _id: e._id,
              user: e.user,
              cookie: e.cookie,
              cookieName: '',
              prix: e.prix,
              quantity: e.quantity,
              prixUnitaire: 0
            });
            this.currentPanierEmpty = false;
          } else {
            this.previousPanier.push({
              _id: e._id,
              user: e.user,
              cookie: e.cookie,
              cookieName: '',
              prix: e.prix,
              quantity: e.quantity,
              prixUnitaire: 0
            });
            this.previousPanierEmpty = false;
          }
        };
      },
        (error: any) => {
        console.log(error);
      });

      this.getCookieInfo();
    });
  }

  getCookieInfo(){
    this.currentPanier.forEach( e => {
      this.CookieServ.get(e.cookie).subscribe(
        data => {
          e.cookieName = data.data.nom;
          e.prixUnitaire = data.data.prix;
        },
        error => {
          console.log(error);
        }
      );
    })

    this.previousPanier.forEach( e => {
      this.CookieServ.get(e.cookie).subscribe(
        data => {
          e.cookieName = data.data.nom;
          e.prixUnitaire = data.data.prix;
        },
        error => {
          console.log(error);
        }
      );
    })
  }

  ValidatePanier() {
    this.currentPanier.forEach( e => {
      this.panierServ.update(e._id, {
        _id: e._id,
        user: e.user,
        cookie: e.cookie,
        prix: e.prix,
        quantity: e.quantity,
        dateTime: new Date(),
        payed: true,
        sent: false
      }).subscribe(
        response => {
          console.log(response);
          window.location.reload();
        },
        error => {
          console.log(error);
        });
    })
  }

  delete(id: any){
    this.panierServ.delete(id).subscribe(
      (res: any) => {
        window.location.reload();
      },
      (error:any) => {
        console.log(error);
      }
    );
  }
}
