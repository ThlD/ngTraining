import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {UsersService} from '../../shared/services/users.service';
import {User} from '../../shared/models/user.model';
import {AuthService} from '../../shared/services/auth.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {UiService} from '../../shared/services/ui.service';
import {takeWhile} from 'rxjs/operators';

@Component({
  selector: 'silk-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  private alive = true;
  isLoading = false;
  constructor(private usersService: UsersService,
              private authService: AuthService,
              private uiService: UiService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.queryParams.pipe(takeWhile(() => this.alive)).subscribe((params: Params) => {
      if (params[`accessDenied`]) {
        this.uiService.showSnackbar('You must be logged in to access the system', null, 5000);
      }
    });
  }

  onSubmit(form: NgForm) {
    const formData = form.value;
    this.usersService.getAdminByName(formData.username).pipe(takeWhile(() => this.alive)).subscribe((admin: User) => {
      if (admin) {
        if (admin.password === formData.password) {
          this.authService.login();
          window.localStorage.setItem('admin', JSON.stringify(admin));
          this.router.navigate(['/home']);
        } else {
          this.uiService.showSnackbar('Password is not correct', null, 5000);
        }
      } else {
        this.uiService.showSnackbar('This user does not exist', null, 5000);
      }
    });
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
