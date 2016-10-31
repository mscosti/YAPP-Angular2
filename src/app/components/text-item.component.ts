import { Component, Input} from '@angular/core';
import { Control } from '@angular/common';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import 'rxjs/add/operator/debounceTime';

@Component({
  moduleId: module.id,
  selector: 'text-item',
  template: '<input type="text" [ngFormControl]="term"/> <button (click)="deleteItem()">Delete</button>'
})
export class TextItem {
  @Input() items: FirebaseListObservable<any[]>;
  @Input() key;
  term = new Control();

  constructor(){
    this.term.valueChanges.debounceTime(400).subscribe(term => this.update(term))
  }
  update(newText) {
    this.items.update(this.key, { text: newText });
  }
  deleteItem() {
    this.items.remove(this.key);
  }
}
