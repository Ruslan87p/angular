import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit {

  data;
  
  constructor(private apiService: ApiService,
              private router: Router,
              private route: ActivatedRoute,) { }



  getItemById(): void {
    this.route.params.subscribe(itemId => {
      const id = itemId.id;
      this.apiService.getItemById(id)
        .subscribe(
          (item) => {
            if (item) {
              this.data = item;
            }
          });
    });
  }

  back() {
    this.router.navigate(['']);
  }


  ngOnInit() {
    this.getItemById();
  }

}
