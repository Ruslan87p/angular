import { Component, Input, OnInit, DoCheck, ChangeDetectionStrategy } from '@angular/core';
import { ToggleService } from 'src/app/services/toggle.service';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.css']
})
export class ListItemsComponent implements OnInit, DoCheck {

  @Input() list;
  @Input() search;
  @Input() refresh;
  @Input() showList;


  searchText: string;
  toggleView: boolean;
  sub2: Subscription;
  
  constructor(private toggleSvc: ToggleService, private apiSvc: ApiService) { 
  }


  isClickedTitle(title) {
    this.toggleSvc.clickedItemTitle.next(title);
  }
  

  checkField() {
    this.searchText = this.search;
  }


  ngDoCheck() {
    this.checkField();
  }


  sortItems(items) {
    return this.apiSvc.sortData(items);
  }


  ngOnInit() {
    this.sub2 = this.toggleSvc.isToggleView.subscribe((state) => {
      this.toggleView = state;
    });
    this.sortItems(this.list);
    this.checkField();
  }

  ngOnDestroy() {
    this.sub2.unsubscribe();
  }

}
