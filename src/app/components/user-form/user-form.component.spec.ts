import { render, RenderResult, screen } from '@testing-library/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserFormComponent } from './user-form.component';

describe('UserFormComponent', () => {

  beforeEach(async () => {
    await render(UserFormComponent, {
      imports: [ReactiveFormsModule, ToastrModule.forRoot(), BrowserAnimationsModule],
    });
  });

  it('should have a lastName input field',  () => {
    const lastNameInput = screen.getByLabelText('Prénom');
    expect(lastNameInput).toBeTruthy();
  });
});
