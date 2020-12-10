import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { InstagramOauthCallbackComponent } from './instagram-oauth-callback.component';

const routes: Routes = [
  { path: '', component: InstagramOauthCallbackComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  declarations: [InstagramOauthCallbackComponent]
})
export class InstagramOauthCallbackModule { }
