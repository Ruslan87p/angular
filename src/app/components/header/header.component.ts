import { Component, Output,EventEmitter, ViewChild, AfterViewChecked, AfterViewInit, Input } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ToggleService } from 'src/app/services/toggle.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements AfterViewChecked, AfterViewInit {

  searchword: string = ''; 
  @Output() search = new EventEmitter<String>();
  @Output() refresh = new EventEmitter<any>();
  @ViewChild('input', {static: false}) input;


  sortFlag = false;
  
  constructor(private apiSvc: ApiService, private toggleSvc: ToggleService) { }





  
  getAllItems() {
    return this.apiSvc.getData()
    .subscribe( data => {
      this.refresh.emit(data);
      this.apiSvc.sortData(data);
    })
  }


  isOnSort() {
    let toggleSort = (this.sortFlag = !this.sortFlag);
    this.toggleSvc.isAscDescSortItems.next(toggleSort);
  }

  isOnClear() {
    this.search.emit(this.input.nativeElement.value = '');
  }

  isOnRefresh() {
    this.getAllItems();
  }


  ngAfterViewInit() {
    this.toggleSvc.clickedItemTitle.subscribe((title) => {
      if (title) {
        this.input.nativeElement.value = title;
      }
    });
  }

  
  ngAfterViewChecked() {
    if(this.input.nativeElement) {
      this.search.emit(this.input.nativeElement.value);
    }
  }


}
