import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  calculateAge(p: Date) {
    if (isNaN(p.getTime())) {
      throw new Error('Invalid date');
    }
    const today = new Date();
    return today.getFullYear() - p.getUTCFullYear();
  }
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  birthDate: Date;
  city: string;
  postalCode: string;
}
