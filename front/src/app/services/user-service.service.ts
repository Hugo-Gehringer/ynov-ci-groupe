import {Injectable} from '@angular/core';
/**
 * Service to handle user-related operations.
 */
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000';
  public users: User[] = [];

  constructor( ) {}

  /**
   * Calculates the age based on the birthdate.
   * @param {Date} birthDate - The birthdate of the user.
   * @returns {number} The calculated age.
   * @throws Will throw an error if the birthDate is invalid.
   */
  calculateAge(birthDate: Date): number {
    if (isNaN(birthDate.getTime())) {
      throw new Error('Invalid date');
    }
    const today = new Date();
    return today.getFullYear() - birthDate.getUTCFullYear();
  }

  /**
   * Fetches the list of users from the API.
   * @returns {Promise<User[]>} A promise that resolves to the list of users.
   */
  async getUsers(): Promise<User[]> {
    const response = await fetch(this.apiUrl+'/users');
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    this.users = await response.json();
    return this.users;
  }

  /**
   * Adds a new user to the API.
   * @param {User} user - The user to add.
   * @returns {Promise<void>} A promise that resolves when the user is added.
   */
  async addUser(user: User): Promise<void> {
    try {
      const response = await fetch(this.apiUrl+"/users", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });
      if (!response.ok) {
        throw new Error(`Failed to add user: ${response.statusText}`);
      }
    } catch (error) {
      throw error;
    }
  }

  /**
   * Delete a user from the API.
    * @param {number} id - The id of the user to delete.
   */
  async deleteUser(id: number): Promise<void> {
    try {
      const response = await fetch(this.apiUrl+"/users/"+id, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error(`Failed to delete user: ${response.statusText}`);
      }
    } catch (error) {
      throw error;
    }
  }
}


export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  birthDate: Date;
  city: string;
  postalCode: string;
}
