import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {}

  setUserDetails(userObj) {
    this.userService.getUserDetails(userObj).subscribe(
      (res) => {
        // console.log('logged in', res);
        localStorage.setItem('userdetails', JSON.stringify(res));
      },
      (error) => {
        console.log(error);
      }
    );
  }
  userLogin() {
    if (this.loginForm.valid) {
      // console.log('login form value=', this.loginForm.value);

      this.userService.login(this.loginForm.value).subscribe(
        (res) => {
          // console.log('logged in', res);
          localStorage.setItem('token', res.token);
          this.setUserDetails(this.loginForm.value);
          this.loginForm.reset();
          this.router.navigate(['user/chat']);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
