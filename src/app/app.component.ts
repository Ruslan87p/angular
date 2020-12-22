import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, RoutesRecognized } from '@angular/router';
import { Subscription } from 'rxjs';
import {ApiService} from './services/api.service';
import { ToggleService } from './services/toggle.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  products = [];
  search: string = '';
  isLoading = true;
  sub: Subscription;
  showList = false;
  sub1: Subscription;
  sub2: Subscription;

  
  constructor(private apiService: ApiService, private router: Router, private toggleSvc: ToggleService) {
    this.sub1 = this.apiService.getData()
    .subscribe(data =>{
      this.products = data;
      this.isLoading = false;
    })
  }


  ngOnInit() {
     this.sub2 = this.router.events.subscribe(val => {
      if (val instanceof RoutesRecognized) {
        if ( val.url === '' || val.url !== '/' ) {
          this.showList = true;
        } else {
          this.showList = false;
        }
      }
    });
  }



  filtered(items) {
    this.products = items;
  }

  
  refresh(data) {
    this.products = data;
  }



  searchWord(event) {
    if(event) {
      this.search = event;
    } else {
      this.search = '';
    }
  }

  


  ngOnDestroy() {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
  }


}
