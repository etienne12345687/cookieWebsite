import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ConnexionService } from 'src/app/services/connexion.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

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
    return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree  {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      if (this.roles.includes('ROLE_ADMIN')) {
        return true;
      } else {
        return false;
      }
  }
}
