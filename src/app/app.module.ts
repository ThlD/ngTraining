import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {InMemoryWebApiModule} from 'angular-in-memory-web-api';

import { AppComponent } from './app.component';
import {AppRoutingModule} from './app-routing.module';
import { NotFoundComponent } from './not-found/not-found.component';
import {AuthModule} from './auth/auth.module';
import {MaterialModule} from './ui/material/material.module';
import {UserData} from './shared/services/user-data.service';
import {UsersService} from './shared/services/users.service';
import {AuthService} from './shared/services/auth.service';
import {UiService} from './shared/services/ui.service';
import {AuthGuard} from './shared/guards/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AuthModule,
    AppRoutingModule,
    MaterialModule,
    InMemoryWebApiModule.forRoot(UserData, { delay: 1000 }),
  ],
  providers: [
    UsersService,
    AuthService,
    UiService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

