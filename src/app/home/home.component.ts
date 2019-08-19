import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

import {UsersService} from '../shared/services/users.service';
import {User} from '../shared/models/user.model';
import {UiService} from '../shared/services/ui.service';
import {takeWhile} from 'rxjs/operators';

@Component({
  selector: 'silk-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  private alive = true;
  dataSource = new MatTableDataSource<User>();
  displayedColumns: string[] = ['id', 'name', 'email', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  isEdit = false;
  isLoading = true;
  editableUserId: number | null = null;
  editableUserName: string;
  editableUserEmail: string;

  constructor(private userService: UsersService,
              private uiService: UiService) {
  }

  ngOnInit() {
    this.getUsers();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  getUsers() {
    this.isLoading = true;
    this.userService.getUsers().pipe(takeWhile(() => this.alive)).subscribe(data => {
      this.dataSource.data = data;
      this.isLoading = false;
    });
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).pipe(takeWhile(() => this.alive)).subscribe(data => {
      this.getUsers();
      this.uiService.showSnackbar('User has been deleted', null, 5000);

    });
  }

  enableEditMode(el: User) {
    this.isEdit = true;
    this.editableUserId = el.id;
    this.editableUserName = el.name;
    this.editableUserEmail = el.email;
  }

  disableEditMode() {
    this.isEdit = false;
  }

  editUser(id: number) {
    const editedUser = {
      id,
      name: this.editableUserName,
      email: this.editableUserEmail
    };
    this.userService.updateUser(editedUser).pipe(takeWhile(() => this.alive)).subscribe(() => {
      this.isEdit = false;
      this.getUsers();
    });
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
