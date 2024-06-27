import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FriendsTableComponent } from './components/friends-table/friends-table/friends-table.component';
import { AddFriendComponent } from './components/friends-table/add-friend/add-friend/add-friend.component';

const routes: Routes = [
  { path: 'friends', component: FriendsTableComponent },
  { path: 'add-friend', component: AddFriendComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BirthdayFriendsRoutingModule { }
