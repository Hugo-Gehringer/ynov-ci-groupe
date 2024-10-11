import {Injectable} from '@angular/core';
/**
 * Service to handle user-related operations.
 */
@Injectable({
  providedIn: 'root'
})
export class UserService {
  /**
   * Calculates the age based on the birthdate.
   * @param {Date} birthDate - The birthdate of the user.
   * @returns {number} The calculated age.
   * @throws Will throw an error if the birthDate is invalid.
   */
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
