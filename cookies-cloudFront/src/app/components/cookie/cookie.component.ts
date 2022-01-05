import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ICookies } from 'src/app/utils/modele/cookies';
import { environment } from 'src/environments/environment';
import { CookieService } from 'src/app/services/cookie.service';


@Component({
  selector: 'app-cookie',
  templateUrl: './cookie.component.html',
  styleUrls: ['./cookie.component.css']
})
export class CookieComponent implements OnInit {

  listeCookie:Array<ICookies> = [];

  constructor(private http:HttpClient, public CookieServ: CookieService) { 
  }

  ngOnInit(): void {
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

}
