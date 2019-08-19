import {Component, EventEmitter, OnDestroy, Output} from '@angular/core';
import {NgForm} from '@angular/forms';

import {UsersService} from '../../shared/services/users.service';
import {UiService} from '../../shared/services/ui.service';
import {User} from '../../shared/models/user.model';
import {takeWhile} from 'rxjs/operators';

@Component({
  selector: 'silk-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnDestroy {
  private alive = true;
  @Output('onAddUser') addUserEmitter = new EventEmitter();

  constructor(private userService: UsersService,
              private uiService: UiService) {
  }

  onSubmit(form: NgForm) {
    this.addUser(form.value);
    form.reset();
  }

  addUser(user: User) {
    this.userService.createNewUser(user).pipe(takeWhile(() => this.alive)).subscribe(() => {
      this.addUserEmitter.emit();
      this.uiService.showSnackbar('User has been added', null, 5000);
    });
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
