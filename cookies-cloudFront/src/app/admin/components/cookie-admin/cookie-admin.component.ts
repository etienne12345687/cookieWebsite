import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CookieService } from 'src/app/services/cookie.service';
import { ImageService } from 'src/app/services/image.service';
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
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';

  fileInfos?: Observable<any>;

  constructor(private cookieServ: CookieService, private imageService: ImageService) { }

  ngOnInit(): void {
    this.getCookie();
    this.fileInfos = this.imageService.getFiles();
  }

  getCookie(){
    this.cookieServ.getAll().subscribe(data => {
      this.listeCookie = data.data;
    },
    error => {
      console.log(error);
    });
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  upload(): void {
    this.progress = 0;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;

        this.imageService.upload(this.currentFile).subscribe(
          (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              this.fileInfos = this.imageService.getFiles();
            }
          },
          (err: any) => {
            console.log(err);
            this.progress = 0;

            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Could not upload the file!';
            }
          });
      }
    }
  }

  saveCookie() {
    if (this.currentFile?.name) {
      const data = {
        nom: this.cookie.nom,
        prix: this.cookie.prix,
        recette: this.cookie.recette,
        photo: this.currentFile?.name,
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
    } else {
      this.message = 'Merci de télécharger une photo avant d\'ajouter le cookie';
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
