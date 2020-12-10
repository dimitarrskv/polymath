import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { LinkedinOauthCallbackComponent } from './linkedin-oauth-callback.component';

const routes: Routes = [
  { path: '', component: LinkedinOauthCallbackComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  declarations: [LinkedinOauthCallbackComponent]
})
export class LinkedinOauthCallbackModule { }
