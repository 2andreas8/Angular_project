import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NzTableModule } from 'ng-zorro-antd/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzNotificationComponent } from 'ng-zorro-antd/notification';
//import { NzDatePickerModule} from 'ng-zorro-antd/date-picker';

import { BirthdayFriendsRoutingModule } from './birthday-friends-routing.module';
import { FriendsTableComponent } from './components/friends-table/friends-table/friends-table.component';
import { AddFriendComponent } from './components/friends-table/add-friend/add-friend/add-friend.component';
import { NzDatePickerComponent } from 'ng-zorro-antd/date-picker';

import { NzDatePickerModule} from 'ng-zorro-antd/date-picker'; // Sau alte module Ng-Zorro-antd necesare
import { en_US, NZ_I18N } from 'ng-zorro-antd/i18n';
import en from '@angular/common/locales/en';

@NgModule({
  declarations: [
    FriendsTableComponent,
    AddFriendComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BirthdayFriendsRoutingModule,
    NzFormModule,
    NzInputModule,
    NzTableModule,
    NzDatePickerModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US }, // Setează limba engleză pentru Ng-Zorro-antd
  ],
  exports: [
    FriendsTableComponent,
    //AddFriendComponent
  ]
})
export class BirthdayFriendsModule { }
