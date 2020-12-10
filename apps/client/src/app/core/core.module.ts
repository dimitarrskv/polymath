import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './components/layout/layout.component';
import { RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';



@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    RouterModule,

    NzLayoutModule,
    NzMenuModule,
    NzAvatarModule
  ],
  providers: [AuthService]
})
export class CoreModule { }
