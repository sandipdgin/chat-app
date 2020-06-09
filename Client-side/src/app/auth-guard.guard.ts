import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from './user/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardGuard implements CanActivate {
  constructor(private router: Router, private userService: UserService) {}
  canActivate() {
    if (this.userService.loggedIn()) {
      return true;
    }
    this.router.navigate(['/user/login']);
    return;
  }
}
