import { Component, Input} from '@angular/core';
import { Control } from '@angular/common';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import 'rxjs/add/operator/debounceTime';

@Component({
  moduleId: module.id,
  selector: 'card-item',
  template: '<button type="button" class="card btn btn-default"> {{ value }}</button>',
  styleUrls: ['../styles/yapp.css']
})
export class Card {
  @Input() value;
  
  constructor(){
  }
}
