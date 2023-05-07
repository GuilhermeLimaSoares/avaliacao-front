import { UsersService } from './../../services/users.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent implements OnInit {
  form!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private service: UsersService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      firstName: [
        'Type your first name',
        Validators.compose([Validators.required]),
      ],
      lastName: [
        'Type your last name',
        Validators.compose([Validators.required]),
      ],
      email: ['Type your email', Validators.compose([Validators.required])],
    });
  }

  cancelRegister(): void {
    this.router.navigate(['/users']);
  }

  registerUser(): void {
    if (this.form.valid) {
      const { email, firstName, lastName } = this.form.value;

      this.service
        .createUser(firstName, lastName, email)
        .subscribe((response) => {
          alert('Sucesso!');
        }, error => {
          alert('Erro!');
        });
    }
  }
}
