import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class PanierGuard implements CanActivate, CanLoad {

  constructor(
    private tokenStorageService: TokenStorageService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (!!this.tokenStorageService.getToken()){
        const user = this.tokenStorageService.getUser();
        const roles = user.roles;
        if (roles.includes('ROLE_ADMIN')) {
          Swal.fire({
            title: 'Attention',
            text: 'Cette page n\'est accessible qu\'aux utilisateurs',
            icon: 'warning',
            confirmButtonText: 'OK',
          }).then((result) => {
            window.location.replace('/');
          });
          return false;
        } 
        return true;
      } else {
        Swal.fire({
          title: 'Attention',
          text: 'Cette page n\'est accessible qu\'en étant connecté',
          icon: 'warning',
          confirmButtonText: 'OK',
        }).then((result) => {
          window.location.replace('/');
        });
        return false;
      }
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return true;
  }
}
