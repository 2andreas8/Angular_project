import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { AuthModule } from '../auth/auth.module';
import { BirthdayFriendsModule } from './birthday-friends/birthday-friends.module';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzNotificationModule } from 'ng-zorro-antd/notification'; 


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AuthModule,
    BrowserModule,
    BirthdayFriendsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,  // <-- Importă BrowserAnimationsModule aici
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzNotificationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
