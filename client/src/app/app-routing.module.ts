import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LoginSuccessComponent } from './login-success/login-success.component';
import { AuthGuard } from './core/guards/auth.guard';
import { UnauthGuard } from './core/guards/unauth.guard';
import { LayoutComponent } from './core/components/layout/layout.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/welcome' },
  { path: 'login/success/:jwt', component: LoginSuccessComponent },
  { path: 'login', component: LoginComponent, canActivate: [UnauthGuard] },
  { path: 'instagram-oauth/callback', loadChildren: () => import('./instagram-oauth-callback/instagram-oauth-callback.module').then(m => m.InstagramOauthCallbackModule) },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule) },
      { path: 'profile', loadChildren: () => import('./my-profile/my-profile.module').then(m => m.MyProfileModule) }
    ],
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
