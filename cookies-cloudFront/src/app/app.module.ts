import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CookieComponent } from './components/cookie/cookie.component';
import { PanierComponent } from './components/panier/panier.component';
import { ConnexionComponent } from './components/connexion/connexion.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuComponent } from './structure/menu/menu.component';
import { Erreur404Component } from './structure/erreur404/erreur404.component';
import {MatTabsModule} from '@angular/material/tabs'; 
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './components/register/register.component';
import { ProfilComponent } from './components/profil/profil.component';
import { FooterComponent } from './structure/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    CookieComponent,
    PanierComponent,
    ProfilComponent,
    ConnexionComponent,
    MenuComponent,
    Erreur404Component,
    RegisterComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatTabsModule,
    MatCardModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
