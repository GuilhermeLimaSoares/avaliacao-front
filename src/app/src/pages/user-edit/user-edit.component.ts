import { Component, DoCheck, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FullUser } from '../../models/fullUser';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
})
export class UserEditComponent implements OnInit, DoCheck {
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
          `${this.fullUserDetails?.firstName}`,
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
    console.log('form:', this.form.value);
  }

  cancelRegister(): void {
    this.router.navigate(['/users']);
  }

  editRegister(): void {
    const { email, firstName, lastName } = this.form.value;
    this.service
      .editUserById(this.id, email, firstName, lastName)
      .subscribe((response) => {
        alert('editado com sucesso!');
      }, error => {
        alert('erro!');
      });
  }
}
