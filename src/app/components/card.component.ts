import { Component, Input} from '@angular/core';
import { Control } from '@angular/common';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import 'rxjs/add/operator/debounceTime';

@Component({
  moduleId: module.id,
  selector: 'card-item',
  templateUrl: '../views/card.component.html',
  styleUrls: ['../styles/yapp.css']
})
export class Card {
  value;
  
  constructor(){
    this.value = 1
  }
}
