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
  { path: 'linkedin-oauth/callback', loadChildren: () => import('./linkedin-oauth-callback/linkedin-oauth-callback.module').then(m => m.LinkedinOauthCallbackModule) },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule) },
      { path: 'profile', loadChildren: () => import('./my-profile/my-profile.module').then(m => m.MyProfileModule) },
      { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
      { path: 'instagram', loadChildren: () => import('./instagram/instagram.module').then(m => m.InstagramModule) }
    ],
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
