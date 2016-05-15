import { Component, Input} from '@angular/core';
import { Control } from '@angular/common';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { RouteParams, Router } from '@angular/router-deprecated';
// import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/debounceTime';

@Component({
  moduleId: module.id,
  selector: 'text-item',
  templateUrl: '../views/create-room.component.html'
})
export class CreateRoom {
  roomId: string;
  roomsDB: FirebaseListObservable<any>;
  ticketsDB: FirebaseListObservable<any>;
  tickets: any[]
  constructor(af: AngularFire,
            private router:Router,
            private routeParams:RouteParams){
    this.roomId = this.ID();
    this.roomsDB = af.database.list('/rooms');
    this.ticketsDB = af.database.list('/tickets');
    this.tickets = [{name: "", room: this.roomId}];
  }
  
  createEmptyTicket() {
    this.tickets.push({name: "", room: this.roomId});
  }
  
  // TODO: figure out smarter way to sync ticketsDB instead of one big submit
  saveTicket(ticket) {
    console.log('hey');
  }
  
  submit() {
    this.roomsDB.push(this.roomId);
    this.tickets.forEach(ticket => {
      this.ticketsDB.push(ticket);
    });
    this.router.navigate(['Poker',{ roomId: this.roomId}]);
  }
  
  ID() {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return '_' + Math.random().toString(36).substr(2, 4);
};
}