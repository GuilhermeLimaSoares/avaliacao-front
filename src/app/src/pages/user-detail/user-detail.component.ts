import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { FullUser } from '../../models/fullUser';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent {
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
    private service: UsersService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route?.snapshot?.paramMap.get('id');
    console.log('Profile id:', id, typeof id);
    this.service.searchUserById(id).subscribe((response) => {
      // this.pensamento = pensamento;
      console.log('response:', response);
      this.fullUserDetails = response;
    });
  }
}
