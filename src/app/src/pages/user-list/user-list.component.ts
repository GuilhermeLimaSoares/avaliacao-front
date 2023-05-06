import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  constructor(private service: UsersService){

  }

  ngOnInit(): void {
    console.log('Users');
    this.service.getUsers().subscribe((data) => {
      debugger;
      console.log('data:', data);
    })
  }
}
