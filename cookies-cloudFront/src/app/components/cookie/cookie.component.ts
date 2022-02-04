import { Component, OnInit, Input } from '@angular/core';
import { CookieService } from 'src/app/services/cookie.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { PanierService } from 'src/app/services/panier.service';
import { ImageService } from 'src/app/services/image.service';
import {DomSanitizer} from '@angular/platform-browser';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-cookie',
  templateUrl: './cookie.component.html',
  styleUrls: ['./cookie.component.css']
})
export class CookieComponent implements OnInit {

  listeCookie: Array<any> = [];
  isLoggedIn = false;
  isAdmin = false;
  achat = '';
  isSuccessful = false;
  isFailed = false;
  validity= '';

  constructor(
    private tokenStorageService: TokenStorageService,
    public CookieServ: CookieService,
    public panierServ: PanierService,
    private imageServ: ImageService,
    private sanitizer:DomSanitizer) { 
  }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.tokenStorageService.getUser().roles == 'ROLE_ADMIN'){
      this.isAdmin = true;
    };
    this.getCookie();
  }

  sanitize( url:string ) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }  

  arrayBufferToBase64( buffer: Iterable<number> ) {
    var binary = '';
    var bytes = new Uint8Array( buffer );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
       binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa( binary );
  }

  getCookie(){
    this.CookieServ.getAll().subscribe(data => {
      data.data.forEach((element: {_id:any, nom: any; prix: any; recette: any; photo: any; }) => {
        this.imageServ.get(element.photo).subscribe( data => {
          console.log(data);
          this.listeCookie.push({
            _id: element._id,
            nom: element.nom,
            prix: element.prix,
            recette: element.recette,
            photo: this.arrayBufferToBase64(data),
            quantity: 0,
          });
        })
      })
    },
    error => {
      console.log(error);
    });
  }

  addToPanier(element: any){
    const cookie = {
      cookie: element._id,
      quantity: element.quantity,
      user: this.tokenStorageService.getUser().id,
      prix: element.prix * element.quantity
    }
    
    if (element.quantity === 0){
      this.validity = "Merci d'entrer un nombre.";
    } else {
      this.validity = "";
      this.panierServ.create(cookie).subscribe(
        (res: any) => {
          console.log(res);
          this.isSuccessful = true;
          this.isFailed = false;
          Swal.fire('', 'Cookie ajouté au panier', 'success')
        },
        (error:any) => {
          console.log(error);
        }
      );
    }
  }

}

