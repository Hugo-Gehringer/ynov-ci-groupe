import {Component, OnInit} from '@angular/core';
import {User, UserService} from '../../services/user-service.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent implements OnInit {


  constructor(public userService :UserService, private router: Router) {
  }

  async ngOnInit(): Promise<void> {
    await this.userService.getUsers();
  }
  disconnectUser() {
    this.userService.disconnect();
    this.router.navigate(['/login']);
  }
}
