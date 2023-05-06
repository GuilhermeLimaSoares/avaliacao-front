import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserListComponent } from './src/pages/user-list/user-list.component';
import { UserDetailComponent } from './src/pages/user-detail/user-detail.component';
import { UserEditComponent } from './src/pages/user-edit/user-edit.component';
import { CreateUserComponent } from './src/pages/create-user/create-user.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UsersService } from './src/services/users.service';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './src/components/header/header.component';
import { FooterComponent } from './src/components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    UserDetailComponent,
    UserEditComponent,
    CreateUserComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [UsersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
