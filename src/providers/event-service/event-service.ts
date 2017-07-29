import { Injectable } from '@angular/core';
import { StorageService } from '../storage-service/storage-service';
import { AuthService } from '../auth-service/auth-service';
import 'rxjs/add/operator/map';

export const regExp = {
  website: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
}

@Injectable()
export class EventService {

  constructor(
    private auth: AuthService,
    private storage: StorageService,
  ) {
    console.log('Hello EventServiceProvider Provider');
  }



}
