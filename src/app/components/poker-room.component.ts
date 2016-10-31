import { Component, Input} from '@angular/core';
import { Control } from '@angular/common';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { RouteParams, Router } from '@angular/router-deprecated';
import { Observable } from 'rxjs';
import { CardHand } from './card-hand.component';
import { Card } from './card.component';
import 'rxjs/add/operator/debounceTime';

@Component({
  moduleId: module.id,
  selector: 'poker-room',
  directives: [CardHand, Card],
  templateUrl: '../views/poker-room.component.html',
  styleUrls: ['../styles/yapp.css']
})
export class PokerRoom {
  roomDB: FirebaseObjectObservable<any>;
  currentTicket: FirebaseObjectObservable<any>;
  currentVotes: FirebaseListObservable<any>;
  votingStatus: FirebaseObjectObservable<any>;
  roomId: string;
  tickets: any[] = [];

  votingActive = false;
  isAdmin = null;
  userKey = null;
  username = null;

  constructor(af: AngularFire,
            private router:Router,
            private routeParams:RouteParams){

    this.roomId = this.routeParams.get('roomId');
    this.username = this.routeParams.get('username');
    this.isAdmin = this.routeParams.get('adminKey');

    this.roomDB = af.database.object(`/room/${this.roomId}`);
    this.currentTicket = af.database.object(`/room/${this.roomId}/currentTicket`);
    this.currentVotes = af.database.list(`/room/${this.roomId}/currentVotes`);
    this.votingStatus = af.database.object(`/room/${this.roomId}/votingActive`);
    this.votingStatus.subscribe(status => {
        this.votingActive = status;
        console.log(status);
    })
  }

  endRound(event) {
      this.votingStatus.set(false);
  }

  onCardSelect(event) {
      console.log("YOOOOOOO");
      console.log(event);
  }
}