import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';

import {BaseApiService} from '../core/base-api.service';
import {User} from '../models/user.model';

@Injectable()
export class UsersService extends BaseApiService {

  constructor(public http: HttpClient) {
    super(http);
  }

  getAdminByName(name: string): Observable<User> {
    return this.get(`admins?name=${name}`)
      .pipe(map((user) => user[0] ? user[0] : undefined));
  }

  getUsers(): Observable<User[]> {
    return this.get(`users`)
      .pipe(
        tap(data => console.log(data))
      );
  }

  getUserById(id: number): Observable<User> {
    return this.get(`users?id=${id}`)
      .pipe(map((user) => user[0] ? user[0] : undefined));
  }

  createNewUser(user: User): Observable<User> {
    user.id = null;
    return this.post('users', user);
  }

  updateUser(user: User): Observable<User> {
    return this.put(`users/${user.id}`, user);
  }

  deleteUser(id: number): Observable<User> {
    return this.delete(`users/${id}`);
  }
}
