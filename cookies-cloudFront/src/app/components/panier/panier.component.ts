import { Component, OnInit } from '@angular/core';
import { ConnexionService } from 'src/app/services/connexion.service';
import { CookieService } from 'src/app/services/cookie.service';
import { PanierService } from 'src/app/services/panier.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import Swal from 'sweetalert2';

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
    public panierServ: PanierService,
    public connexionServ: ConnexionService
  ) {}

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
    this.connexionServ.getUser(this.tokenStorageService.getUser().id).subscribe(
      data => {
        if (data.data.address === undefined) {
          Swal.fire({
            title: 'Veuillez indiquer l\'adresse de livraison',
            input: 'text',
            inputAttributes: {
              autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Confirmer',
            showLoaderOnConfirm: true,
            preConfirm: (address) => {
              return this.connexionServ.addAdress(this.tokenStorageService.getUser().id, {"address": address}).subscribe(
                data => {
                  console.log(data);
                },
                error => {
                  console.log(error);
                  return error;
                }
              )
            },
            allowOutsideClick: () => !Swal.isLoading()
          }).then((result) => {
            if (result.isConfirmed) {
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
                    Swal.fire({
                      title: 'Cookie commandé',
                      text: 'Les cookies vous seront livrées dans les plus brefs délais',
                      icon: 'success',
                      confirmButtonText: 'OK',
                    }).then(() => {
                      window.location.reload();
                    })
                  },
                  error => {
                    console.log(error);
                  });
              })
            }
          })
        } else {
          Swal.fire({
            title: 'Conserver l\'adresse de livraison enregistrée ?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Oui, je conserve',
            cancelButtonText: 'Non, je change',
          }).then((result) => {
            if (result.isConfirmed) {
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
                    Swal.fire({
                      title: 'Cookie commandé',
                      text: 'Les cookies vous seront livrées dans les plus brefs délais',
                      icon: 'success',
                      confirmButtonText: 'OK',
                    }).then(() => {
                      window.location.reload();
                    })
                  },
                  error => {
                    console.log(error);
                  });
              })
            } else {
              this.connexionServ.addAdress(this.tokenStorageService.getUser().id, {"address": undefined}).subscribe(
                data => {
                  console.log(data);
                  this.ValidatePanier();
                },
                error => {
                  console.log(error);
                  return error;
                }
              )
            }
          },
          error => {
            console.log(error);
            return error;
          })
        }
      }
    )
  }

  delete(id: any){
    Swal.fire({
      title: 'Êtes-vous sur ?',
      text: 'Le cookie seront définitivement supprimé',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui',
      cancelButtonText: 'Non',
    }).then((result) => {
      if (result.isConfirmed) {
        this.panierServ.delete(id).subscribe(
          (res: any) => {
            window.location.reload();
          },
          (error:any) => {
            console.log(error);
          }
        );
      } else if (result.isDismissed) {

        console.log('Clicked No, File is safe!');

      }
    })
    
  }
}
