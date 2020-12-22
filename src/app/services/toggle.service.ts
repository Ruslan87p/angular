import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToggleService {

  isToggleView: BehaviorSubject<any> = new BehaviorSubject(false);
  isAscDescSortItems: BehaviorSubject<any> = new BehaviorSubject(false);

  clickedItemTitle: BehaviorSubject<any> = new BehaviorSubject('');

  
  constructor() { }
}
