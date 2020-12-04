import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { NzButtonModule, NzCardModule, NzIconModule, NzListModule, NzSkeletonModule, NzToolTipModule } from 'ng-zorro-antd';
import { NzSpaceModule } from 'ng-zorro-antd/space';

const routes: Routes = [
  { path: '', component: DashboardComponent }
];

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,

    NzCardModule,
    NzListModule,
    NzIconModule,
    NzToolTipModule,
    NzButtonModule,
    NzSkeletonModule,
    NzSpaceModule,
    
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class DashboardModule { }
