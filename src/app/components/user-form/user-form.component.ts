import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user-service.service';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent implements  OnInit{
  userForm!: FormGroup;


  constructor(private userService: UserService, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.userForm = new FormGroup({
      'firstName': new FormControl(null, Validators.required),
      'lastName': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'birthDate': new FormControl(null, [Validators.required, this.customAgeValidator()]),
      'city': new FormControl(null, Validators.required),
      'postalCode': new FormControl(null,[ Validators.required, this.customPostalCodeValidator()])
    });
  }

  customAgeValidator():ValidatorFn {
    return  (control: AbstractControl):ValidationErrors|null => {
      if (!control.value) return null;
      const age = this.userService.calculateAge(new Date(control.value));
      console.debug(age);
      return age < 18 ? {ageBelow18: true} : null;
    }
  }

  customPostalCodeValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      const isValid = /^\d{5}$/.test(value);
      return isValid ? null : { 'invalidLength': true };
    };
  }

  onSubmit() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }
    this.userForm.reset();
    this.toastr.success('Utilisateur ajouté avec succès', 'Succès');
    }
}


