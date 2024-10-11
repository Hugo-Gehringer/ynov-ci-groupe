import { render, RenderResult, screen, fireEvent } from '@testing-library/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserFormComponent } from './user-form.component';

describe('UserFormComponent', () => {
  let component: RenderResult<UserFormComponent>;

  beforeEach(async () => {
    component = await render(UserFormComponent, {
      imports: [ReactiveFormsModule, ToastrModule.forRoot(), BrowserAnimationsModule],
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
});
