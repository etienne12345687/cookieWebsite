import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { CookieAdminComponent } from './components/cookie-admin/cookie-admin.component';
import { ProfilComponent } from './components/profil/profil.component';


@NgModule({
  declarations: [
    CookieAdminComponent,
    ProfilComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
