import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from '@angular/router';
import {inject, Injectable} from "@angular/core";
import {UserService} from '../services/user-service.service';


@Injectable({
  providedIn: 'root'
})
class AuthenticationService {
  constructor(private userService: UserService,private router: Router) {
  }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.userService.isConnected()) {
      return true;
    } else {
      console.log("You are not connected");
      this.router.navigate(['/login']);
      return false;
    }
  }
}

export const AuthGuard: CanActivateFn = (route, state) => {
  return inject(AuthenticationService).canActivate(route, state);
};
