import { Component } from '@angular/core';
import { Control } from '@angular/common';
import { RouteConfig, ROUTER_DIRECTIVES } from '@angular/router-deprecated';
import { TextItem } from './text-item.component';
import { Card } from './card.component';
import { Home } from './home.component';
import { CreateRoom } from './create-room.component';


import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  moduleId: module.id,
  selector: 'yapp',
  directives: [TextItem,ROUTER_DIRECTIVES],
  templateUrl: '../views/main.component.html',
  styleUrls: [ '../styles/yapp.css']
})
@RouteConfig([
  { 
    path: '/Home',
    name: 'Home',
    component: Home,
    useAsDefault: true
  },

  {path: '/CreateRoom',   name: 'CreateRoom',     component: CreateRoom},
  {path: '/Poker/:roomId', name: 'Poker', component: TextItem}
])
export class MainComponent {
  title = 'Yet Another Planning Poker';
  
  constructor(){ }
}
