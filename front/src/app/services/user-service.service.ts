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
  public user: User | null = null;

  constructor() {
  }

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
    const response = await fetch(this.apiUrl + '/users');
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    this.users = await response.json();
    return this.users;
  }

  /**
   * Adds a new user to the API.
   * @param {AddUser} user - The user to add.
   * @returns {Promise<void>} A promise that resolves when the user is added.
   */
  async addUser(user: AddUser): Promise<void> {
    try {
      const response = await fetch(this.apiUrl + "/users", {
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
      const response = await fetch(this.apiUrl + "/users/" + id, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error(`Failed to delete user: ${response.statusText}`);
      }else {
        this.getUsers();
      }
    } catch (error) {
      throw error;
    }
  }

  async login(email: string, password: string): Promise<void> {
    try {
      const response = await fetch(this.apiUrl + "/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: email, password: password})
      });
      if (!response.ok) {
        throw new Error(`Failed to connect: ${response.statusText}`);
      }
      this.user = await response.json();
    } catch (error) {
      throw error;
    }
  }

  isConnected(): boolean {
    return this.user !== null;
  }

  disconnect() {
    this.user = null;
  }

  isAdmin(): boolean {
    return this.user !== null && this.user.isAdmin;
  }

  userId(): number {
    return this.user?._id || -1;
  }
}


export interface User {
  _id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  birthDate: Date;
  city: string;
  postalCode: string;
  isAdmin: boolean;
}
export interface AddUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  birthDate: Date;
  city: string;
  postalCode: string;
  isAdmin: boolean;
}
