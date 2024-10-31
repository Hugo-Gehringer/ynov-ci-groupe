import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersListComponent } from './users-list.component';
import { UserService } from '../../services/user-service.service';
import { of } from 'rxjs';
import '@testing-library/jest-dom';

class MockUserService {
  getUsers = jest.fn();
}

describe('UsersListComponent', () => {
  let component: UsersListComponent;
  let fixture: ComponentFixture<UsersListComponent>;
  let userService: MockUserService;

  beforeEach(async () => {
    userService = new MockUserService();
    userService.getUsers.mockResolvedValue([
      { firstName: 'John', lastName: 'Doe', email: 'john@example.com', birthDate: '1990-01-01' },
      { firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com', birthDate: '1992-02-02' }
    ]);

    await TestBed.configureTestingModule({
      declarations: [UsersListComponent],
      providers: [{ provide: UserService, useValue: userService }]
    }).compileComponents();

    fixture = TestBed.createComponent(UsersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch users on init', async () => {
    await component.ngOnInit();
    expect(userService.getUsers).toHaveBeenCalled();
  });


  it('should display no users message when user list is empty', async () => {
    userService.getUsers.mockResolvedValue([]);
    await component.ngOnInit();
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('p').textContent).toContain('No users available.');
  });
});
