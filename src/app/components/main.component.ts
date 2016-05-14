import { Component } from '@angular/core';
import { Control } from '@angular/common';
import { TextItem } from './text-item.component';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  moduleId: module.id,
  selector: 'yapp',
  directives: [TextItem],
  templateUrl: '../views/main.component.html',
  styleUrls: ['../styles/yapp.css']
})
export class MainComponent {
  title = 'Yet Another Planning Poker';
  term = new Control();
  items: FirebaseListObservable<any[]>;
  
  constructor(af: AngularFire){
    this.items = af.database.list('/items');
    this.items.subscribe(object => console.log(object));
  }
  add(newName) {
    this.items.push({ text: newName });
  }
  deleteEverything() {
    this.items.remove();
  }
}
