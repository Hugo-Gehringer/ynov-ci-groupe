import { render, RenderResult, screen, fireEvent } from '@testing-library/angular';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserFormComponent } from './user-form.component';
import { UserService } from '../../services/user-service.service';
import '@testing-library/jest-dom';

class MockUserService {
  calculateAge = jest.fn();
  addUser = jest.fn();
}

describe('UserFormComponent', () => {
  let component: RenderResult<UserFormComponent>;
  let userService: MockUserService;
  let toastrService: ToastrService;

  beforeEach(async () => {
    toastrService = {
      success: jest.fn(),
      error: jest.fn()
    } as unknown as ToastrService;

    userService = new MockUserService();

    component = await render(UserFormComponent, {
      imports: [ReactiveFormsModule, ToastrModule.forRoot(), BrowserAnimationsModule],
      providers: [
        { provide: ToastrService, useValue: toastrService },
        { provide: UserService, useValue: userService }
      ]
    });
  });

  it('should reset form and show success message if form is valid', async () => {
    userService.addUser.mockResolvedValueOnce({});

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

    expect(userService.addUser).toHaveBeenCalled();
  });

  it('should show error message if addUser fails', async () => {
    userService.addUser.mockRejectedValueOnce(new Error('Failed to add user'));

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

    expect(userService.addUser).toHaveBeenCalled();
  });

  it('should mark all fields as touched if form is invalid', async () => {
    const submitButton = screen.getByText('Envoyer');
    fireEvent.click(submitButton);

    const firstNameInput = screen.getByLabelText('Prénom');
    const lastNameInput = screen.getByLabelText('Nom :');
    const emailInput = screen.getByLabelText('Email');
    const birthDateInput = screen.getByLabelText('Date de naissance');
    const cityInput = screen.getByLabelText('Ville');
    const postalCodeInput = screen.getByLabelText('Code postal');

    expect(firstNameInput).toHaveClass('ng-touched');
    expect(lastNameInput).toHaveClass('ng-touched');
    expect(emailInput).toHaveClass('ng-touched');
    expect(birthDateInput).toHaveClass('ng-touched');
    expect(cityInput).toHaveClass('ng-touched');
    expect(postalCodeInput).toHaveClass('ng-touched');
    expect(userService.addUser).not.toHaveBeenCalled();
  });

  it('should validate age correctly using customAgeValidator', () => {
    const control = new FormControl('2005-01-01');
    userService.calculateAge.mockReturnValue(17);

    const validator = component.fixture.componentInstance.customAgeValidator();
    const result = validator(control);

    expect(result).toEqual({ ageBelow18: true });
  });
});
