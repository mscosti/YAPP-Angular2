import { Component } from '@angular/core';
import { Control } from '@angular/common';
import { RouteParams, Router } from '@angular/router-deprecated';
import { TextItem } from './text-item.component';
import { Card } from './card.component';

import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  moduleId: module.id,
  selector: 'yapp',
  directives: [TextItem],
  templateUrl: '../views/home.component.html',
  styleUrls: [ '../styles/yapp.css']
})
export class Home {
  title = 'Yet Another Planning Poker';
  term = new Control();
  items: FirebaseListObservable<any[]>;

  constructor(af: AngularFire,
        private router:Router,
        private routeParams:RouteParams){
    this.items = af.database.list('/items');
    this.items.subscribe(object => console.log(object));
  }

  goToLogin() {
      this.router.navigate(['CreateRoom']);
  }

  add(newName) {
    this.items.push({ text: newName });
  }
  deleteEverything() {
    this.items.remove();
  }
}
