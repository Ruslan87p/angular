import { Component, Input, OnInit, DoCheck, Output, EventEmitter } from '@angular/core';
import { ToggleService } from 'src/app/services/toggle.service';
import * as moment from 'moment'

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
    this.toggleSvc.isAscDescSortItems.subscribe((state) => {
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
    this.toggleSvc.isToggleView.subscribe((state) => {
      this.toggleView = state;
    });
    this.sortItems();
    this.checkField();
  }

}
