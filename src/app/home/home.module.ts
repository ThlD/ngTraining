import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HomeComponent} from './home.component';
import {SharedModule} from '../shared/shared.module';
import {AddUserComponent} from './add-user/add-user.component';
import {FetchUserComponent} from './fetch-user/fetch-user.component';
import {HomeRoutingModule} from './home-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule,
  ],
  exports: [],
  declarations: [HomeComponent, AddUserComponent, FetchUserComponent],
  providers: [],
})
export class HomeModule {
}
