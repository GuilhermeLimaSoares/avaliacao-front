import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/user';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Users } from '../../models/users';
import { MatDialog } from '@angular/material/dialog';
import { DialogStatusComponent } from '../../components/dialog-status/dialog-status.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements AfterViewInit, OnInit {
  currentPage: number = 1;
  displayedColumns: string[] = ['picture', 'name', 'optionals'];
  dataSource: MatTableDataSource<User>;
  isSuccessStatus: boolean = false;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageSizeTotalItems: number = 0;


  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;

  constructor(private router: Router, private service: UsersService, public dialog: MatDialog,) {
    const users = [
      {
        title: '',
        firstName: '',
        lastName: '',
        picture: '',
      },
    ];

    this.dataSource = new MatTableDataSource(users);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.service.getUsers().subscribe((response: Users) => {
      this.pageSizeTotalItems = response?.total;
      this.dataSource = new MatTableDataSource(response?.data);
    });
  }

  handlePageEvent(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.service
      .getUsers(event.pageIndex, event.pageSize)
      .subscribe((response) => {
        this.pageSizeTotalItems = response?.total;
        this.dataSource = new MatTableDataSource(response?.data);
      });
  }

  showUserProfile(id: string): void {
    this.router.navigate([`/users/detail-user/${id}`]);
  }

  addUser(): void {
    this.router.navigate(['/register-user']);
  }

  editUser(id: string): void {
    this.router.navigate([`/users/edit-user/${id}`]);
  }

  statusMessage(isSuccessStatus: boolean): string {
    return isSuccessStatus
      ? 'Registration successfully deleted.'
      : 'Failed to delete registration.';
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogStatusComponent, {
      data: {
        message: this.statusMessage(this.isSuccessStatus),
        isSuccess: this.isSuccessStatus
      },
    });
  }

  deleteUser(id: string): void {
    this.service.deleteUser(id).subscribe((response) => {
      this.isSuccessStatus = true;
      this.openDialog();
    }, error => {
      this.isSuccessStatus = false;
      this.openDialog();
    })
  }
}
