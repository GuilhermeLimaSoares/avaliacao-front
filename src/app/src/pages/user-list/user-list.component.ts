import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  displayedColumns: string[] = ['picture', 'name'];
  dataSource: User[] = [];

  constructor(private service: UsersService){

  }

  ngOnInit(): void {
    console.log('Users');
    this.service.getUsers().subscribe((response) => {
      console.log('data:', response);
      this.dataSource = response?.data
    })
  }
}
