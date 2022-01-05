import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfilComponent } from '../admin/components/profil/profil.component';
import { AccueilAdminComponent } from './components/accueil-admin/accueil-admin.component';
import { CookieAdminComponent } from './components/cookie-admin/cookie-admin.component';

const routes: Routes = [
  {path: '', component: AccueilAdminComponent,
    children:[{
      path:'cookie-admin',
      component:CookieAdminComponent,
    },{
      path:'profil-admin',
      component:ProfilComponent,
    }
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
