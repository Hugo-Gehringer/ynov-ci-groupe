import { render, RenderResult, screen, fireEvent } from '@testing-library/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserFormComponent } from './user-form.component';
import { UserService } from '../../services/user-service.service';
import '@testing-library/jest-dom';

describe('UserFormComponent', () => {
  let component: RenderResult<UserFormComponent>;
  let userService: UserService;
  let toastrService: ToastrService;

  beforeEach(async () => {
    toastrService = {
      success: jest.fn()
    } as unknown as ToastrService;

    userService = {
      calculateAge: jest.fn()
    } as unknown as UserService;

    component = await render(UserFormComponent, {
      imports: [ReactiveFormsModule, ToastrModule.forRoot(), BrowserAnimationsModule],
      providers: [
        { provide: ToastrService, useValue: toastrService }
      ]
    });
  });

  it('should have a firstName input field', () => {
    const firstNameInput = screen.getByLabelText('Prénom');
    expect(firstNameInput).toBeTruthy();
  });

  it('should have a lastName input field', () => {
    const lastNameInput = screen.getByLabelText('Nom :');
    expect(lastNameInput).toBeTruthy();
  });

  it('should have an email input field', () => {
    const emailInput = screen.getByLabelText('Email');
    expect(emailInput).toBeTruthy();
  });

  it('should have a birthDate input field', () => {
    const birthDateInput = screen.getByLabelText('Date de naissance');
    expect(birthDateInput).toBeTruthy();
  });

  it('should have a city input field', () => {
    const cityInput = screen.getByLabelText('Ville');
    expect(cityInput).toBeTruthy();
  });

  it('should have a postalCode input field', () => {
    const postalCodeInput = screen.getByLabelText('Code postal');
    expect(postalCodeInput).toBeTruthy();
  });

  it('should display required error messages when form is submitted empty', async () => {
    const submitButton = screen.getByText('Envoyer');
    fireEvent.click(submitButton);

    expect(await screen.findByText('Veuillez saisir un email')).toBeTruthy();
    expect(await screen.findByText('Veuillez saisir un code postal valide avec 5 chiffres')).toBeTruthy();
    expect(await screen.findByText('Veuillez saisir une date de naissance')).toBeTruthy();
  });

  it('should display invalid email error message', async () => {
    const emailInput = screen.getByLabelText('Email');
    fireEvent.input(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.blur(emailInput);

    expect(await screen.findByText('Veuillez saisir un email valide')).toBeTruthy();
  });

  it('should display invalid postal code error message', async () => {
    const postalCodeInput = screen.getByLabelText('Code postal');
    fireEvent.input(postalCodeInput, { target: { value: '123' } });
    fireEvent.blur(postalCodeInput);

    expect(await screen.findByText('Veuillez saisir un code postal valide avec 5 chiffres')).toBeTruthy();
  });

  it('should display age below 18 error message', async () => {
    const birthDateInput = screen.getByLabelText('Date de naissance');
    fireEvent.input(birthDateInput, { target: { value: '2020-01-01' } });
    fireEvent.blur(birthDateInput);

    expect(await screen.findByText('Vous devez être majeur')).toBeTruthy();
  });

  it('should mark all controls as touched and not submit if form is invalid', async () => {
    const submitButton = screen.getByText('Envoyer');
    fireEvent.click(submitButton);

    const firstNameInput = screen.getByLabelText('Prénom');
    expect(firstNameInput).toHaveClass('ng-touched');
  });

  it('should reset form and show success message if form is valid', async () => {
    const firstNameInput = screen.getByLabelText('Prénom');
    const lastNameInput = screen.getByLabelText('Nom :');
    const emailInput = screen.getByLabelText('Email');
    const birthDateInput = screen.getByLabelText('Date de naissance');
    const cityInput = screen.getByLabelText('Ville');
    const postalCodeInput = screen.getByLabelText('Code postal');

    fireEvent.input(firstNameInput, { target: { value: 'John' } });
    fireEvent.input(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.input(emailInput, { target: { value: 'john.doe@example.com' } });
    fireEvent.input(birthDateInput, { target: { value: '2000-01-01' } });
    fireEvent.input(cityInput, { target: { value: 'Paris' } });
    fireEvent.input(postalCodeInput, { target: { value: '75001' } });

    const submitButton = screen.getByText('Envoyer');
    fireEvent.click(submitButton);
    expect(toastrService.success).toHaveBeenCalledWith('Utilisateur ajouté avec succès', 'Succès');
  });
});
