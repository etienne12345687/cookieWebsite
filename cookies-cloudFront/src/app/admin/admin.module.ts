import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { CookieAdminComponent } from './components/cookie-admin/cookie-admin.component';
import { ProfilComponent } from './components/profil/profil.component';
import { FormsModule } from '@angular/forms';
import { AccueilAdminComponent } from './components/accueil-admin/accueil-admin.component';
import { MenuAdminComponent } from './components/menu-admin/menu-admin.component';


@NgModule({
  declarations: [
    CookieAdminComponent,
    ProfilComponent,
    AccueilAdminComponent,
    MenuAdminComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule
  ]
})
export class AdminModule { }
