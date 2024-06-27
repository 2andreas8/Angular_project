import { Injectable } from '@angular/core';
import { Friend } from './interface/friend';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FriendsService {
  private apiUrl = "http://localhost:4000/friends";
  private friendsSubject = new BehaviorSubject<Friend[]>([]);
  private friends: Friend[] = [];
 
  constructor(private http: HttpClient) { 
    this.loadFriends();
  }

  //stocheaza local prietenii incarcati de pe server
  private loadFriends(): void {
    this.http.get<Friend[]>(this.apiUrl).subscribe(friends => {
      console.log('Friends loaded:', friends); // Debugging
      this.friendsSubject.next(friends);
    }, error => {
      console.error('Error loading friends:', error); // Debugging
    });
  }

  getFriends(): Observable<Friend[]> {
    return this.http.get<Friend[]>(this.apiUrl);
  }

  addFriend(friend: Friend): void {
    this.http.post<Friend>(this.apiUrl, friend).subscribe(addedFriend => {
      this.friends.push(addedFriend);
      this.friendsSubject.next(this.friends);
    });
  }
}
