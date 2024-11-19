import {Component, OnInit} from '@angular/core';
import {AddUser, User, UserService} from '../../services/user-service.service';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

/**
 * Component for the user form.
 */
@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent implements OnInit {
  userForm!: FormGroup;

  /**
   * Constructor for UserFormComponent.
   * @param {UserService} userService - The user service.
   * @param {ToastrService} toastr - The toastr service for notifications.
   */
  constructor(private userService: UserService, private toastr: ToastrService, private router: Router) {
  }

  /**
   * Initializes the component and sets up the form.
   */
  ngOnInit(): void {
    this.userForm = new FormGroup({
      'firstName': new FormControl(null, Validators.required),
      'lastName': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required]),
      'birthDate': new FormControl(null, [Validators.required, this.customAgeValidator()]),
      'city': new FormControl(null, Validators.required),
      'postalCode': new FormControl(null, [Validators.required, this.customPostalCodeValidator()])
    });
  }

  /**
   * Custom validator to check if the user's age is below 18.
   * @returns {ValidatorFn} The validator function.
   */
  customAgeValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      const age = this.userService.calculateAge(new Date(control.value));
      return age < 18 ? {ageBelow18: true} : null;
    };
  }

  /**
   * Custom validator to check if the postal code is valid.
   * @returns {ValidatorFn} The validator function.
   */
  customPostalCodeValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      const isValid = /^\d{5}$/.test(value);
      return isValid ? null : {'invalidLength': true};
    };
  }

  /**
   * Handles the form submission.
   */
  async onSubmit() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }
    const user: AddUser = {
      firstName: this.userForm.get('firstName')?.value,
      lastName: this.userForm.get('lastName')?.value,
      email: this.userForm.get('email')?.value,
      password: this.userForm.get('password')?.value,
      birthDate: new Date(this.userForm.get('birthDate')?.value),
      city: this.userForm.get('city')?.value,
      postalCode: this.userForm.get('postalCode')?.value,
      isAdmin: false
    };
    try {
      await this.userService.addUser(user);
      this.userForm.reset();
      this.toastr.success('Utilisateur ajouté avec succès', 'Succès');
      await this.userService.getUsers();
      this.router.navigate(['/users-list']);
    } catch (error) {
      console.log(error);
      this.toastr.error('Erreur lors de l\'ajout de l\'utilisateur '+error, 'Erreur');
    }
  }
}
