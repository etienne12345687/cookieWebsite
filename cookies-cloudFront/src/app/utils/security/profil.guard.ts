import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ProfilGuard implements CanActivate {

  constructor(
    private tokenStorageService: TokenStorageService
  ) {}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (!!this.tokenStorageService.getToken()){
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
  
}
