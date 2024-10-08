import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../services/user-service.service';


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {
  userForm: FormGroup;
  constructor(private fb: FormBuilder, private userService: UserService) {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      birthDate: ['', Validators.required],
      city: ['', Validators.required],
      postalCode: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      const newUser : User = this.userForm.value as User;
      this.userService.addUser(newUser).subscribe(() => {
        // Afficher le toaster de succès
        // Vider les champs
        this.userForm.reset();
      });
    }
  }
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  birthDate: Date;
  city: string;
  postalCode: string;
}
