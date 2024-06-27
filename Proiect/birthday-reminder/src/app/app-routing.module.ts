import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from 'src/auth/login/login.component';
import { RegisterComponent } from 'src/auth/register/register.component';

const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full'},
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },
  { path: 'birthday', loadChildren: () => import('./birthday-friends/birthday-friends.module').then(m => m.BirthdayFriendsModule) },
  { path: '**', redirectTo: 'auth/login' } 
  /* wildcard angular -> ruta activata pt orice ruta ce nu e mai sus*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
