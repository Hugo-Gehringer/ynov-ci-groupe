import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user-service.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

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
    this.loginForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, Validators.required)
    });
  }


  /**
   * Handles the form submission.
   */
  async onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    try {
      await this.userService.login(this.loginForm.value.email, this.loginForm.value.password);
      this.loginForm.reset();
      this.toastr.success('Connexion avec succès', 'Succès');
      this.router.navigate(['/users-list']);
    } catch (error) {
      console.log(error);
      this.toastr.error('Erreur de connexion: '+error, 'Erreur');
    }
  }
}
