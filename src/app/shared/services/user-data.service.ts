import {Injectable} from '@angular/core';
import {InMemoryDbService} from 'angular-in-memory-web-api';
import {Observable} from 'rxjs';

import {User} from '../models/user.model';

@Injectable()
export class UserData implements InMemoryDbService {
  createDb(): {} | Observable<{}> | Promise<{}> {
    const users: User[] = [
      {id: 1, name: 'Vasya', email: 'Vasya@gmail.com'},
      {id: 2, name: 'Petya', email: 'Petya@gmail.com'},
      {id: 3, name: 'Kolya', email: 'Kolya@gmail.com'},
      {id: 4, name: 'Fedya', email: 'Fedya@gmail.com'},
      {id: 5, name: 'Nastya', email: 'Nastya@gmail.com'},
      {id: 6, name: 'Vasya1', email: 'Vasya1@gmail.com'},
      {id: 7, name: 'Vasya2', email: 'Vasya2@gmail.com'},
      {id: 8, name: 'Vasya3', email: 'Vasya3@gmail.com'},
      {id: 9, name: 'Vasya4', email: 'Vasya4@gmail.com'},
      {id: 10, name: 'Vasya5', email: 'Vasya5@gmail.com'},
      {id: 11, name: 'Vasya6', email: 'Vasya6@gmail.com'},
    ];

    const admins: User[] = [
      {id: 1, name: 'admin', email: 'admin@gmail.com', password: 'admin'}
    ];
    return {users, admins};
  }
}
