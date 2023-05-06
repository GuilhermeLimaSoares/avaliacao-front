import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/user';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['picture', 'name'];
  dataSource: MatTableDataSource<User>;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageSizeTotalItems: number = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;

  constructor(private service: UsersService){
    const users = [{
      title: '',
      firstName: '',
      lastName: '',
      picture: ''
    }];

    this.dataSource = new MatTableDataSource(users);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.service.getUsers().subscribe((response) => {
      console.log('data:', response);
      this.pageSizeTotalItems = response?.total;
      this.dataSource = new MatTableDataSource(response?.data);
    })
  }

  handlePageEvent(event: PageEvent): void {
    console.log('event:', event);
  }

}
