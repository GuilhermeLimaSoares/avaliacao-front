import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserListComponent } from './src/pages/user-list/user-list.component';
import { UserDetailComponent } from './src/pages/user-detail/user-detail.component';
import { UserEditComponent } from './src/pages/user-edit/user-edit.component';
import { CreateUserComponent } from './src/pages/create-user/create-user.component';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    UserDetailComponent,
    UserEditComponent,
    CreateUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
