import {Component, EventEmitter, OnDestroy, Output} from '@angular/core';
import {NgForm} from '@angular/forms';
import {MatTableDataSource} from '@angular/material';
import {Subscription} from 'rxjs';

import {User} from '../../shared/models/user.model';
import {UsersService} from '../../shared/services/users.service';
import {UiService} from '../../shared/services/ui.service';
import {takeWhile} from 'rxjs/operators';

@Component({
  selector: 'silk-fetch-user',
  templateUrl: './fetch-user.component.html',
  styleUrls: ['./fetch-user.component.scss']
})
export class FetchUserComponent implements OnDestroy{
  private alive = true;
  isHidden = true;
  isEdit = false;
  isLoading = false;
  editableUserName: string;
  editableUserEmail: string;
  dataSource = new MatTableDataSource<User>();
  displayedColumns: string[] = ['id', 'name', 'email', 'actions'];
  getUserSub: Subscription;
  @Output('onUsersListChanged') usersListEmitter = new EventEmitter();

  constructor(private userService: UsersService,
              private uiService: UiService
  ) {
  }

  onSubmit(form: NgForm) {
    console.log(form);
    this.getUser(form.value.id);

  }

  private getUser(id) {
    this.isLoading = true;
    this.getUserSub = this.userService.getUserById(id).pipe(takeWhile(() => this.alive)).subscribe(data => {
      this.isLoading = false;
      if (data) {
        this.dataSource.data = [data];
        this.isHidden = false;
      } else {
        this.uiService.showSnackbar('No user with this ID', null, 5000);
        this.isHidden = true;
      }
    });
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).pipe(takeWhile(() => this.alive)).subscribe(() => {
      this.usersListEmitter.emit();
      this.isHidden = true;
      this.uiService.showSnackbar('User has been deleted', null, 5000);
    });
  }

  editUser(id: number) {
    const editedUser = {
      id,
      name: this.editableUserName,
      email: this.editableUserEmail
    };
    this.userService.updateUser(editedUser).pipe(takeWhile(() => this.alive)).subscribe(() => {
      this.isEdit = false;
      this.getUser(id);
      this.usersListEmitter.emit();
    });
  }

  enableEditMode(el: User) {
    this.isEdit = true;
    this.editableUserName = el.name;
    this.editableUserEmail = el.email;
  }

  disableEditMode() {
    this.isEdit = false;
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
