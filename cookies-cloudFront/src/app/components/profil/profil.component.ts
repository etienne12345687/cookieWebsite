import { Component, OnInit } from '@angular/core';
import { ConnexionService } from 'src/app/services/connexion.service';
import { TokenStorageService } from '../../services/token-storage.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  currentUser: any;
  isAdmin= false;

  constructor(private tokenStorageService: TokenStorageService, private connexionServ: ConnexionService) { }

  ngOnInit(): void {
    this.currentUser = this.tokenStorageService.getUser();
    if (this.tokenStorageService.getUser().roles == 'ROLE_ADMIN'){
      this.isAdmin = true;
    };
  }

  deleteAccount() {
    const id = this.tokenStorageService.getUser().id;
    this.connexionServ.delete(id).subscribe(
      (res: any) => {
        console.log(res);
        this.tokenStorageService.signOut();
        window.location.replace('http://localhost:4200/');
      },
      (error:any) => {
        console.log(error);
      }
    );
  }
}

