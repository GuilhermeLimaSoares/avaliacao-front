import { Component, DoCheck, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { FullUser } from '../../models/fullUser';

import { DialogStatusComponent } from '../../components/dialog-status/dialog-status.component';

import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
})
export class UserEditComponent implements OnInit, DoCheck {
  isSuccessStatus: boolean = false;
  id: any = '';
  form!: FormGroup;
  fullUserDetails: FullUser = {
    id: '',
    title: '',
    firstName: '',
    lastName: '',
    gender: '',
    email: '',
    dateOfBirth: '',
    registerDate: '',
    phone: '',
    picture: '',
    location: {
      street: '',
      city: '',
      state: '',
      country: '',
      timezone: '',
    },
  };

  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private service: UsersService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route?.snapshot?.paramMap.get('id');
    this.service.searchUserById(this.id).subscribe((response) => {
      this.fullUserDetails = response;
      this.form = this.formBuilder.group({
        firstName: [
          this.fullUserDetails?.firstName,
          Validators.compose([Validators.required]),
        ],
        lastName: [
          this.fullUserDetails?.lastName,
          Validators.compose([Validators.required]),
        ],
        email: [
          this.fullUserDetails?.email,
          Validators.compose([Validators.required]),
        ],
      });
    });
  }

  ngDoCheck(): void {
      this.form.get('email')?.disable();
  }

  cancelRegister(): void {
    this.router.navigate(['/users']);
  }

  editRegister(): void {
    const { email, firstName, lastName } = this.form.value;
    this.service.editUserById(this.id, email, firstName, lastName).subscribe(
      (response) => {
        this.isSuccessStatus = true;
        this.openDialog();
      },
      (error) => {
        this.isSuccessStatus = false;
        this.openDialog();
      }
    );
  }

  statusMessage(isSuccessStatus: boolean): string {
    return isSuccessStatus
      ? 'Registration change performed successfully.'
      : 'Failed to perform registration change.';
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogStatusComponent, {
      data: {
        message: this.statusMessage(this.isSuccessStatus),
        isSuccess: this.isSuccessStatus
      },
    });
  }
}
