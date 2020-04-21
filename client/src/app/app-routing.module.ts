import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LoginSuccessComponent } from './login-success/login-success.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/welcome' },

  { path: 'login/success/:jwt', component: LoginSuccessComponent },
  { path: 'login', component: LoginComponent },

  { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
