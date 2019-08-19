import {Injectable} from '@angular/core';

@Injectable()
export class AuthService {
  private isAuth = false;

  login() {
    this.isAuth = true;
  }

  // logout() {
  //   this.isAuth = false;
  // }

  isLoggedIn(): boolean {
    return this.isAuth;
  }
}
