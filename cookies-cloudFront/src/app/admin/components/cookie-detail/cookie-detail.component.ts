import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'src/app/services/cookie.service';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-cookie-detail',
  templateUrl: './cookie-detail.component.html',
  styleUrls: ['./cookie-detail.component.css']
})
export class CookieDetailComponent implements OnInit {

  cookie: any;
  currentFile?: File;
  selectedFiles?: FileList;
  progress = 0;
  priceValidation='';
  message = '';
  fileInfos?: Observable<any>;

  constructor(
    private cookieServ: CookieService,
    private route: ActivatedRoute,
    private router: Router,
    private imageService: ImageService
    ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.route.data.subscribe(async () => {
        await this.cookieServ.get(params['_id']).subscribe(
          data => {
            this.cookie = data.data;
          },
          error => {
            console.log(error);
          });
      })
    })

    this.fileInfos = this.imageService.getFiles();
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

  update(){
    if (this.currentFile?.name) {
      const data= {
        nom: this.cookie.nom,
        prix: this.cookie.prix,
        recette: this.cookie.recette,
        photo: this.currentFile?.name
      }
      this.cookieServ.update(this.cookie._id, data).subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        });
    } else {
      const data= {
        nom: this.cookie.nom,
        prix: this.cookie.prix,
        recette: this.cookie.recette,
        photo: this.cookie.photo
      }
      this.cookieServ.update(this.cookie._id, data).subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        });
    }
  }
}
