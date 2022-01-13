import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfilComponent } from '../admin/components/profil/profil.component';
import { AccueilAdminComponent } from './components/accueil-admin/accueil-admin.component';
import { CommandeComponent } from './components/commande/commande.component';
import { CookieAdminComponent } from './components/cookie-admin/cookie-admin.component';
import { CookieDetailComponent } from './components/cookie-detail/cookie-detail.component';

const routes: Routes = [
  {path: '', component: AccueilAdminComponent,
    children:[{
      path:'cookie-admin',
      component:CookieAdminComponent,
    },{
      path:'profil-admin',
      component:ProfilComponent,
    },{
      path: 'cookie-detail/:_id',
      component:CookieDetailComponent,
    },{
      path: 'commande',
      component:CommandeComponent,
    }
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
