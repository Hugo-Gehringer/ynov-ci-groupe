import {User, UserService} from './user-service.service';
import {TestBed} from '@angular/core/testing';

describe('UserServiceService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('userService.calculateAge', () => {

    it('should return the age of the person', () => {
      const test: User = {
        firstName: 'test',
        lastName: 'test',
        email: 'test',
        city: 'test',
        postalCode: '00000',
        birthDate: new Date('01/04/1999')
      };
      expect(service.calculateAge(test.birthDate)).toBe(25);
    });

    it('should throw an error if no arguments are passed', () => {
      expect(() => service.calculateAge(undefined as unknown as Date)).toThrow();
    });

    it('should throw an error if the argument is not an object', () => {
      expect(() => service.calculateAge(('not an object') as unknown as Date)).toThrow();
    });

    it('should throw an error if the object does not have a birth property', () => {
      const personWithoutBirth = {
        name: 'test'
      } as unknown as User;
      expect(() => service.calculateAge(personWithoutBirth.birthDate)).toThrow();
    });

    it('should throw an error if the birth property is not a Date object', () => {
      const personWithInvalidBirth: User = {
        firstName: 'test',
        lastName: 'test',
        email: 'test',
        city: 'test',
        postalCode: '00000',
        birthDate: 'not a date' as unknown as Date
      };
      expect(() => service.calculateAge(personWithInvalidBirth.birthDate)).toThrow();
    });

    it('should throw an error if the birth property is an invalid Date object', () => {
      const personWithInvalidBirthDate: User = {
        firstName: 'test',
        lastName: 'test',
        email: 'test',
        city: 'test',
        postalCode: '00000',
        birthDate: new Date('invalid date')
      };
      expect(() => service.calculateAge(personWithInvalidBirthDate.birthDate)).toThrow();
    });

    it('should return the correct age even next year', () => {
      const user: User = {
        firstName: 'test',
        lastName: 'test',
        email: 'test',
        city: 'test',
        postalCode: '00000',
        birthDate: new Date('01-04-1999')
      };
      const today = new Date();
      const thisYear = today.getFullYear();
      const birthDateThisYear = new Date(thisYear, user.birthDate.getMonth(), user.birthDate.getDate());
      const ageThisYear = thisYear - user.birthDate.getFullYear() - (birthDateThisYear > today ? 1 : 0);
      expect(service.calculateAge(user.birthDate)).toBe(ageThisYear);
    });
  });
});
