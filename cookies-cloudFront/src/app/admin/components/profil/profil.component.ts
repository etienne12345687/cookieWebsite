import { Component, OnInit } from '@angular/core';
import { ConnexionService } from 'src/app/services/connexion.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  profils: Array<any> = [];

  constructor(private connexionServ: ConnexionService) { }

  ngOnInit(): void {
    this.initListeProfils();
  }

  initListeProfils() {
    this.connexionServ.getAll().subscribe(data => {
      console.log(data);
      data.data.forEach((element: { username: string; }) => {
        if (element.username != "root") {
          this.profils.push(element);
        }
      });
    },
    error => {
      console.log(error);
    });
  }

  delete(id: any){
    this.connexionServ.delete(id).subscribe(
      (res: any) => {
        window.location.reload();
      },
      (error:any) => {
        console.log(error);
      }
    );
  };
}
