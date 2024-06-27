import { Component, OnInit } from '@angular/core';
import { FriendsService } from 'src/app/birthday-friends/friends.service';
import { Observable } from 'rxjs';
import { Friend } from 'src/app/birthday-friends/interface/friend';
import { AuthService } from 'src/auth/auth.service';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-friends-table',
  templateUrl: './friends-table.component.html',
  styleUrls: ['./friends-table.component.css']
})
export class FriendsTableComponent implements OnInit {
  friends: Friend[] = [];

  constructor(private router: Router, private friendsService: FriendsService, private notification: NzNotificationService) { }

  ngOnInit(): void {
    this.loadFriends();
  }

  loadFriends(): void {
    this.friendsService.getFriends().subscribe({
      next: (friends) => {
        this.friends = friends;
      },
      error: (err) => {
        console.error('Failed to load friends', err);
      }
    });
  }

  editFriend(friend: Friend): void {
    // Implementare logica pentru editarea unui prieten
    this.notification.info('Edit Friend', `Editing ${friend.firstName} ${friend.lastName}`);
  }

  deleteFriend(friend: Friend): void {
    // Implementare logica pentru ștergerea unui prieten
    this.notification.warning('Delete Friend', `Deleting ${friend.firstName} ${friend.lastName}`);
  }

  navigateToAddFriend(): void {
    this.router.navigate(['/add-friend']); // Redirecționează către ruta pentru adăugarea unui prieten
  }
}
