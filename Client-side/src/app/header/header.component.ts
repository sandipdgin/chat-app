import {
  Component,
  OnInit,
  OnChanges,
  SimpleChanges,
  OnDestroy,
} from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  userStatus = false;
  subscription: Subscription;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.subscription = this.userService.loginStatus.subscribe(
      (status) => (this.userStatus = status)
    );
  }

  userLogout() {
    this.userService.logout();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
