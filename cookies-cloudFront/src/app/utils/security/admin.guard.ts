import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate, CanLoad {
  private roles: string[] = [];

  constructor(
    private tokenStorageService: TokenStorageService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (!this.tokenStorageService.getToken()) {
        Swal.fire({
          title: 'Attention',
          text: 'Cette page n\'est pas accessible pour vous',
          icon: 'warning',
          confirmButtonText: 'OK',
        }).then((result) => {
          window.location.replace('/');
        });
        return false;
      } else {
        const user = this.tokenStorageService.getUser();
        this.roles = user.roles;
        if (this.roles.includes('ROLE_ADMIN')) {
          return true;
        } else {
          Swal.fire({
            title: 'Attention',
            text: 'Cette page n\'est pas accessible pour vous',
            icon: 'warning',
            confirmButtonText: 'OK',
          }).then((result) => {
            window.location.replace('/');
          });
          return false;
        }
      }
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree  {
      return true;
  }
}
