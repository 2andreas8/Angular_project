import { TestBed } from '@angular/core/testing';
import { FriendsService } from './friends.service';
import { BirthdayFriendsModule } from './birthday-friends.module';

describe('FriendsService', () => {
  let service: FriendsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BirthdayFriendsModule]  // Importă modulul în care este definit FriendsService
    });
    service = TestBed.inject(FriendsService);  // Injectează FriendsService
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
