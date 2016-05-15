import { Component, Input, Output, EventEmitter} from '@angular/core';
import { Control } from '@angular/common';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
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
export class CardHand {
  @Output() selectedCardChange: EventEmitter<any> = new EventEmitter;
  availableCards;
  constructor(){
      this.availableCards = availableCards;
  }
  
  selectCard(value){
      console.log(`selected card ${value}`);
      this.selectedCardChange.emit({
      value: value
    });
  }
}