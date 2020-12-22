import { Component, Input, OnInit, DoCheck, ChangeDetectionStrategy } from '@angular/core';
import { ToggleService } from 'src/app/services/toggle.service';
import * as moment from 'moment'
import { Subscription } from 'rxjs';

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
  sub1: Subscription;
  sub2: Subscription;
  
  constructor(private toggleSvc: ToggleService) { 
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


  sortItems() {
    this.sub1 = this.toggleSvc.isAscDescSortItems.subscribe((state) => {
      this.list = this.list
        .sort((ItemPos2: any, ItemPos1: any) => {
          let pos1: any = moment(ItemPos1.Year, "YYYY/MM/DD");
          pos1.format('YYYY/MM/DD');
          let pos2: any = moment(ItemPos2.Year, "YYYY/MM/DD");
          pos2.format('YYYY/MM/DD');
            if (state) {
              return pos1 - pos2;
          } else {
              return pos2 - pos1;
          }
      })
      .map( item => {
        let date = moment(item.Year, "YYYY/MM/DD").format('YYYY/MM/DD');
        item.Year = date;
        return item;
      })
    }); 




  }


  ngOnInit() {
    this.sub2 = this.toggleSvc.isToggleView.subscribe((state) => {
      this.toggleView = state;
    });
    this.sortItems();
    this.checkField();
  }

  ngOnDestroy() {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
  }

}
