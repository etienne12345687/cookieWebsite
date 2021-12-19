import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CookieComponent } from './components/cookie/cookie.component';
import { CookieDetailsComponent } from './components/cookie-details/cookie-details.component';
import { PanierComponent } from './components/panier/panier.component';
import { ProfilComponent } from './components/profil/profil.component';
import { ConnexionComponent } from './components/connexion/connexion.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuComponent } from './structure/menu/menu.component';
import { FooterComponent } from './structure/footer/footer.component';
import { Erreur404Component } from './structure/erreur404/erreur404.component';

@NgModule({
  declarations: [
    AppComponent,
    CookieComponent,
    CookieDetailsComponent,
    PanierComponent,
    ProfilComponent,
    ConnexionComponent,
    MenuComponent,
    FooterComponent,
    Erreur404Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
