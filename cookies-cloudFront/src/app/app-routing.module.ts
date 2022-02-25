import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnexionComponent } from './components/connexion/connexion.component';
import { CookieComponent } from './components/cookie/cookie.component';
import { PanierComponent } from './components/panier/panier.component';
import { ProfilComponent } from './components/profil/profil.component';
import { RegisterComponent } from './components/register/register.component';
import { HistoireComponent } from './components/histoire/histoire.component';
import { SavoirFaireComponent } from './components/savoir-faire/savoir-faire.component';
import { Erreur404Component } from './structure/erreur404/erreur404.component';
import { AdminGuard } from './utils/security/admin.guard';
import { PanierGuard } from './utils/security/panier.guard';
import { ProfilGuard } from './utils/security/profil.guard';

const routes: Routes = [
  {path:'', component:CookieComponent},
  {
    path:'profil',
    component:ProfilComponent,
    canActivate:[ProfilGuard],
  },
  {
    path:'panier',
    component:PanierComponent,
    canActivate:[PanierGuard],
    canLoad:[PanierGuard]
  },
  {path:'connexion',component:ConnexionComponent},
  {path:'register', component: RegisterComponent},
  {path:'histoire',component:HistoireComponent},
  {path:'savoir-faire', component: SavoirFaireComponent},
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canActivate:[AdminGuard],
    canLoad:[AdminGuard]
  },
  {path:"**", component: Erreur404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
