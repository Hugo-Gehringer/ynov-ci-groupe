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
        _id: 1,
        firstName: 'test',
        lastName: 'test',
        email: 'test',
        password: 'test',
        city: 'test',
        postalCode: '00000',
        birthDate: new Date('01/04/1999'),
        isAdmin: false
      };
      expect(service.calculateAge(test.birthDate)).toBe(26);
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
        _id: 1,
        firstName: 'test',
        lastName: 'test',
        email: 'test',
        password: 'test',
        city: 'test',
        postalCode: '00000',
        birthDate: 'not a date' as unknown as Date,
        isAdmin: false
      };
      expect(() => service.calculateAge(personWithInvalidBirth.birthDate)).toThrow();
    });

    it('should throw an error if the birth property is an invalid Date object', () => {
      const personWithInvalidBirthDate: User = {
        _id: 1,
        firstName: 'test',
        lastName: 'test',
        email: 'test',
        password: 'test',
        city: 'test',
        postalCode: '00000',
        birthDate: new Date('invalid date'),
        isAdmin: false
      };
      expect(() => service.calculateAge(personWithInvalidBirthDate.birthDate)).toThrow();
    });

    it('should return the correct age even next year', () => {
      const user: User = {
        _id: 1,
        firstName: 'test',
        lastName: 'test',
        email: 'test',
        password: 'test',
        city: 'test',
        postalCode: '00000',
        birthDate: new Date('01-04-1999'),
        isAdmin: false
      };
      const today = new Date();
      const thisYear = today.getFullYear();
      const birthDateThisYear = new Date(thisYear, user.birthDate.getMonth(), user.birthDate.getDate());
      const ageThisYear = thisYear - user.birthDate.getFullYear() - (birthDateThisYear > today ? 1 : 0);
      expect(service.calculateAge(user.birthDate)).toBe(ageThisYear);
    });
  });

  describe('addUser', () => {
    const user: User = {
      _id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'password',
      birthDate: new Date('2000-01-01'),
      city: 'Paris',
      postalCode: '75001',
      isAdmin: false
    };

    it('should add a user successfully', async () => {
      globalThis.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue({})
      });

      try {
        await service.addUser(user);
        expect(fetch).toHaveBeenCalledWith('https://ynov-ci-groupe.vercel.app/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(user)
        });
      } catch (error) {
        // This block should not be executed
        expect(error).toBeUndefined();
      }
    });

    it('should throw an error if adding a user fails', async () => {
      globalThis.fetch = jest.fn().mockResolvedValue({
        ok: false,
        statusText: 'Internal Server Error'
      });

      try {
        await service.addUser(user);
      } catch (error) {
        expect(error).toEqual(new Error('Failed to add user: Internal Server Error'));
      }
      expect(fetch).toHaveBeenCalledWith('https://ynov-ci-groupe.vercel.app/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });
    });

    it('should throw an error if fetch throws an error', async () => {
      globalThis.fetch = jest.fn().mockRejectedValue(new Error('Network Error'));

      try {
        await service.addUser(user);
      } catch (error) {
        expect(error).toEqual(new Error('Network Error'));
      }
      expect(fetch).toHaveBeenCalledWith('https://ynov-ci-groupe.vercel.app/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });
    });
  });

  describe('getUsers', () => {
    it('should fetch the list of users successfully', async () => {
      const mockUsers: User[] = [
        {
          _id: 1,
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          password: 'password',
          birthDate: new Date('2000-01-01'),
          city: 'Paris',
          postalCode: '75001',
          isAdmin: false
        }
      ];

      globalThis.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockUsers)
      });

      const users = await service.getUsers();
      expect(users).toEqual(mockUsers);
      expect(fetch).toHaveBeenCalledWith('https://ynov-ci-groupe.vercel.app/users');
    });

    it('should throw an error if fetching users fails', async () => {
      globalThis.fetch = jest.fn().mockResolvedValue({
        ok: false,
        statusText: 'Internal Server Error'
      });

      try {
        await service.getUsers();
      } catch (error) {
        expect(error).toEqual(new Error('Failed to fetch users'));
      }
      expect(fetch).toHaveBeenCalledWith('https://ynov-ci-groupe.vercel.app/users');
    });

    it('should throw an error if fetch throws an error', async () => {
      globalThis.fetch = jest.fn().mockRejectedValue(new Error('Network Error'));

      try {
        await service.getUsers();
      } catch (error) {
        expect(error).toEqual(new Error('Network Error'));
      }
      expect(fetch).toHaveBeenCalledWith('https://ynov-ci-groupe.vercel.app/users');
    });
  });
});
