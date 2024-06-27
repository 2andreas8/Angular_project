import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { FriendsService } from 'src/app/birthday-friends/friends.service';
import { Friend } from 'src/app/birthday-friends/interface/friend';

@Component({
  selector: 'app-add-friend',
  templateUrl: './add-friend.component.html',
  styleUrls: ['./add-friend.component.css']
})
export class AddFriendComponent {
  addFriendForm: FormGroup; // Folosește FormGroup pentru a inițializa formularul

  @Output() friendAdded = new EventEmitter<Friend>();

  constructor(
    private fb: FormBuilder,
    private friendService: FriendsService,
    private router: Router,
    private notification: NzNotificationService
  ) {
    // Inițializează formularul folosind FormBuilder
    this.addFriendForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      city: ['', Validators.required],
      birthday: ['', [Validators.required, this.dateValidator]] // Adaugă validatorul custom pentru dată
    });
  }

    addFriend(): void {
      if(this.addFriendForm.valid) {
        const birthdayControl = this.addFriendForm.get('birthday');
      if (birthdayControl) {
        const birthdayValue = birthdayControl.value;
        const formData = {
          ...this.addFriendForm.value,
          birthday: this.formatDate(birthdayValue)
        }

        this.friendService.addFriend(this.addFriendForm.value);
        this.friendAdded.emit(this.addFriendForm.value);
        this.addFriendForm.reset();
        this.router.navigate(['/friends']);
      }
    }
  }

  dateValidator(control: FormControl): { [key: string]: any } | null {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Setează ora 00:00:00 pentru ziua curentă
    const dateToCheck = new Date(control.value);

    if (dateToCheck >= today) {
      return { 'futureDate': 'The date must be in the past.' };
    }
    return null;
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Adăugăm 0 în fața lunii dacă e necesar
    const day = ('0' + date.getDate()).slice(-2); // Adăugăm 0 în fața zilei dacă e necesar
    return `${year}-${month}-${day}`;
  }
}
