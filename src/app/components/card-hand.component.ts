import { Component, Input} from '@angular/core';
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
  selectedCard;
  availableCards;
  constructor(){
      this.availableCards = availableCards;
  }
}