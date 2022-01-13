import { Component, OnInit } from '@angular/core';
import { ConnexionService } from 'src/app/services/connexion.service';
import { CookieService } from 'src/app/services/cookie.service';
import { PanierService } from 'src/app/services/panier.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.css']
})
export class CommandeComponent implements OnInit {

  currentCommand: Array<any> =[];
  currentCommandEmpty= true;
  commandGroupByUser: Array<any> = [];

  constructor(
    private panierServ: PanierService,
    private cookieServ: CookieService,
    private connexionServ: ConnexionService
  ) { }

  ngOnInit(): void {
    this.initCommande();
  }

  initCommande(){
    this.panierServ.getAll().subscribe(
      data => {
        data.data.forEach( (e: { user: { toString: () => any; }; sent: boolean; payed: boolean; _id: any; cookie: any; prix: any; quantity: any; dateTime: any; }) => {
          if (e.payed === true && e.sent === false){
            this.currentCommand.push(
                {
                  _id: e._id,
                  user: e.user,
                  userName: '',
                  cookie: e.cookie,
                  cookieName: '',
                  prix: e.prix,
                  quantity: e.quantity,
                  prixUnitaire: 0
                }
              );
            this.currentCommandEmpty = false;
          }
        })
        this.groupByUser();
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  groupByUser(){
    var isPresent = false;
    this.currentCommand.forEach(e => {
      this.commandGroupByUser.forEach(element => {
        if (e.user.toString() === element.user.toString()) {
          element.data.push(this.getCookieInfo(
            {
              _id: e._id,
              cookie: e.cookie,
              cookieName: e.cookieName,
              prix: e.prix,
              quantity: e.quantity,
              prixUnitaire: e.prixUnitaire
            }
          ));
          isPresent = true;
        }
      })
      if (isPresent === false){
        this.commandGroupByUser.push(
            {
              userName: e.userName,
              user: e.user,
              data: [this.getCookieInfo(
                {
                  _id: e._id,
                  cookie: e.cookie,
                  cookieName: e.cookieName,
                  prix: e.prix,
                  quantity: e.quantity,
                  prixUnitaire: e.prixUnitaire
                }
              )]
            }
        )
      } else {
        isPresent = false;
      }
    })

    this.commandGroupByUser.forEach(e => {
      this.connexionServ.getUser(e.user).subscribe(
        data => {
          console.log(data.data);
          e.userName =  data.data.username;
        },
        error => {
          console.log(error);
        });
    })
  }

  getCookieInfo(element: { _id?: any; cookie?: any; cookieName?: any; prix?: any; quantity?: any; prixUnitaire?: any; data?: any; }){
    this.cookieServ.get(element.cookie).subscribe(
      data => {
        element.cookieName = data.data.nom;
        element.prixUnitaire = data.data.prix;
      },
      error => {
        console.log(error);
      });
    
    return element;
  }

  SendCommand(id: any) {
    Swal.fire({
      title: 'confirmez-vous l\'envoie de la commande ?',
      text: 'Il ne sera pas possible de revenir en arrière',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui',
      cancelButtonText: 'Non',
    }).then((result) => {

      if (result.isConfirmed) {

        this.currentCommand.forEach( e => {
          if (e.user.toString() === id.toString()) {
            this.panierServ.update(e._id, {
              _id: e._id,
              user: e.user,
              cookie: e.cookie,
              prix: e.prix,
              quantity: e.quantity,
              dateTime: new Date(),
              payed: true,
              sent: true
            }).subscribe(
              response => {
                console.log(response);
                window.location.reload();
              },
              error => {
                console.log(error);
              });
          }
        })

      } else if (result.isDismissed) {

        console.log('Envoie non confirmé');

      }
    })
  }

  

}
