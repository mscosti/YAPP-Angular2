import { Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import { Control } from '@angular/common';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Card } from './card.component';
import { availableCards } from '../models/available-cards';
import 'rxjs/add/operator/debounceTime';

@Component({
  moduleId: module.id,
  selector: 'card-hand',
  directives: [Card],
  templateUrl: '../views/card-hand.component.html',
  styleUrls: ['../styles/yapp.css']
})
export class CardHand implements OnInit{
  @Output() selectedCardChange: EventEmitter<any> = new EventEmitter;
  @Input() roomId;
  @Input() username;
  availableCards;
  
  userVoteKey = null;
  currentVotes: FirebaseListObservable<any>
  constructor(private af: AngularFire){
    //   this.currentVotes = af.database.list(`/room/${this.roomId}/currentVotes`);
    //   this.availableCards = availableCards;
  }
  
  ngOnInit(){
      this.currentVotes = this.af.database.list(`/room/${this.roomId}/currentVotes`);
      this.availableCards = availableCards;
  }
  
  selectCard(value){
      if (this.userVoteKey) {
          this.currentVotes.update(this.userVoteKey,{username: this.username, vote: value });
      }
      else {
          this.userVoteKey = this.currentVotes.push({username: this.username, vote: value }).key();
      }
      console.log(`selected card ${value}`);
      this.selectedCardChange.emit({
      value: value
    });
  }
}