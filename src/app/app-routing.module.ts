import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateUserComponent } from './src/pages/create-user/create-user.component';
import { UserListComponent } from './src/pages/user-list/user-list.component';
import { UserEditComponent } from './src/pages/user-edit/user-edit.component';
import { UserDetailComponent } from './src/pages/user-detail/user-detail.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full',
  },
  {
    path: 'create-user',
    component: CreateUserComponent,
  },
  {
    path: 'users',
    component: UserListComponent,
  },
    {
    path: 'users/detail-user/:id',
    component: UserDetailComponent,
  },
  // {
  //   path: 'users/delete-user/:id',
  //   component: UserDeleteComponent,
  // },
  {
    path: 'users/edit-user/:id',
    component: UserEditComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
