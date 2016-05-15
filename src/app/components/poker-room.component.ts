import { Component, Input} from '@angular/core';
import { Control } from '@angular/common';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { RouteParams, Router } from '@angular/router-deprecated';
import { Observable } from 'rxjs';
import { CardHand } from './card-hand.component';
// import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/debounceTime';

@Component({
  moduleId: module.id,
  selector: 'poker-room',
  directives: [CardHand],
  templateUrl: '../views/poker-room.component.html',
  styleUrls: ['../styles/yapp.css']
})
export class PokerRoom {
  roomId: string;
  tickets: any[] = [];
  constructor(af: AngularFire,
            private router:Router,
            private routeParams:RouteParams){
    
    this.roomId = this.routeParams.get('roomId');

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
  
  createEmptyTicket() {
    // this.tickets.push({name: "", room: this.roomId});
  }
  
  // TODO: figure out smarter way to sync ticketsDB instead of one big submit
  saveTicket(ticket) {
    console.log('hey');
  }
  
  submit() {
    // this.roomsDB.push(this.roomId);
    this.tickets.forEach(ticket => {
    //   this.ticketsDB.push(ticket);
    });
    this.router.navigate(['Poker',{ roomId: this.roomId}]);
  }
  
  onCardSelect(event) {
      console.log("YOOOOOOO")
      console.log(event);
  }
}