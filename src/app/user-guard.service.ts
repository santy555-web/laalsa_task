import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  RouterStateSnapshot,
  UrlSegment,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserguardService implements CanActivate {
  constructor() {}
  canActivate(): boolean {
    if (localStorage.getItem('token') != null) {
      return true;
    } else {
      alert('login first to access this page');
      return false;
    }
  }
}
