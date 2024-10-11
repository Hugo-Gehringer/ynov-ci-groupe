import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user-service.service';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

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
  constructor(private userService: UserService, private toastr: ToastrService) {}

  /**
   * Initializes the component and sets up the form.
   */
  ngOnInit(): void {
    this.userForm = new FormGroup({
      'firstName': new FormControl(null, Validators.required),
      'lastName': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
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
      console.debug(age);
      return age < 18 ? { ageBelow18: true } : null;
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
      return isValid ? null : { 'invalidLength': true };
    };
  }

  /**
   * Handles the form submission.
   */
  onSubmit() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }
    this.userForm.reset();
    this.toastr.success('Utilisateur ajouté avec succès', 'Succès');
  }
}
