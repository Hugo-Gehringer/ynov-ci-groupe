import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = [];

  getUsers(): User[] {
    return this.users;
  }

  addUser(user: User) {
    this.users.push(user);
  }

  calculateAge(p: Date){
    const today = new Date();
    console.debug(p)
    let age = today.getFullYear() - p.getUTCFullYear();
    const monthDifference = today.getMonth() - p.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < p.getDate())) {
      age--;
    }

    return age;
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
