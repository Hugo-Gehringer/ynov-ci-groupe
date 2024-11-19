import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {UserFormComponent} from './components/user-form/user-form.component';
import {UsersListComponent} from './components/users-list/users-list.component';
import {AuthGuard} from './guard/auth.guard';

const routes: Routes = [
  {
    title: "Connexion",
    path: "login",
    component: LoginComponent
  },
  {
    title: "Inscription",
    path: "register",
    component: UserFormComponent
  },
  {
    title: "Liste des utilisateurs",
    path: "users-list",
    canActivate: [AuthGuard],
    component: UsersListComponent
  },
  {
    path: "",
    redirectTo: "/login",
    pathMatch: "full"
  },
  {
    path: "**",
    redirectTo: "/login",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
