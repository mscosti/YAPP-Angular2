import { Component, Input} from '@angular/core';
import { Control } from '@angular/common';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';
import { RouteParams, Router } from '@angular/router-deprecated';
import { Observable } from 'rxjs';
// import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/debounceTime';

@Component({
  moduleId: module.id,
  selector: 'text-item',
  templateUrl: '../views/create-room.component.html'
})
export class CreateRoom {
  roomId: string;
  roomDB: FirebaseObjectObservable<any>;
  roomsDB: FirebaseListObservable<any>;
  roomUsersDB: FirebaseListObservable<any>;
  ticketsDB: FirebaseListObservable<any>;
  currentTicket: any;
  tickets: any[];
  username: string;
  constructor(af: AngularFire,
            private router:Router,
            private routeParams:RouteParams){
              
    this.roomId = this.ID();
    this.roomDB = af.database.object(`/room/${this.roomId}`);
    this.roomUsersDB = af.database.list(`/room/${this.roomId}/users`)
    this.roomsDB = af.database.list('/rooms');
    this.ticketsDB = af.database.list(`/room/${this.roomId}/tickets`);
    this.tickets = [{name: "", room: this.roomId}];
    this.currentTicket = {name: "", room: this.roomId};
  }
  
  createEmptyTicket() {
    this.tickets.push({name: "", room: this.roomId});
  }
  
  // TODO: figure out smarter way to sync ticketsDB instead of one big submit
  saveTicket(ticket) {
    this.tickets.push(ticket);
    this.currentTicket = {name: "", room: this.roomId};
    console.log(ticket);
  }
  
  // TODO: Learn AngularFire2 / Firebase...... 
  submit() {
    var adminKey = this.roomUsersDB.push({name: this.username}).key();
    var firstTicket = null;
    this.tickets.forEach(ticket => {
      var key = this.ticketsDB.push(ticket).key();
      if (!firstTicket) {
        firstTicket = key;
      }
    });
    this.roomDB.update({
      admin: adminKey,
      currentTicket: firstTicket,
      votingActive: true
    });
    this.router.navigate(['Poker',{ roomId: this.roomId, username: this.username, adminKey: adminKey}]);
  }
  
  ID() {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return '_' + Math.random().toString(36).substr(2, 4);
};
}