import { Component, Input} from '@angular/core';
import { Control } from '@angular/common';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { RouteParams, Router } from '@angular/router-deprecated';
import { Observable } from 'rxjs';
import { CardHand } from './card-hand.component';
import { Card } from './card.component';
// import { Http, Response, Headers } from '@angular/http';
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
  roomId: string;
  tickets: any[] = [];
  
  isAdmin = false;
  userKey = null;
  username = null;
  
  constructor(af: AngularFire,
            private router:Router,
            private routeParams:RouteParams){
    
    this.roomId = this.routeParams.get('roomId');
    this.username = this.routeParams.get('username');
    
    this.roomDB = af.database.object(`/room/${this.roomId}`);
    this.currentTicket = af.database.object(`/room/${this.roomId}/currentTicket`);
    this.currentVotes = af.database.list(`/room/${this.roomId}/currentVotes`);
    // good job matt, we're only at step two and your data structure already
    // turned out to not be ideal.....
    af.database.list('/tickets').forEach(tix => {
        tix.forEach( ticket => {
            if (ticket.room === this.roomId) {
                this.tickets.push(ticket);
            }
        })
    });
  }
  
  onCardSelect(event) {
      console.log("YOOOOOOO");
      console.log(event);
      
  }
}