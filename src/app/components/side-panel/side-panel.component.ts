import { Component, Input, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { ToggleService } from 'src/app/services/toggle.service';

@Component({
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidePanelComponent implements OnInit {

  @Input() list;
  movie = null;
  series = null;
  game = null;
  @Output() filteredList = new EventEmitter();
  all;
  toggleView: boolean;

  constructor(private toggleSvc: ToggleService) { 

  }

  showFilteredByType(items) {
    this.filteredList.emit(items);
  }

  ngOnInit() {
    this.all = this.list;
    this.movie = this.list.filter( (item) => item.Type === 'movie');
    this.series = this.list.filter( (item) => item.Type === 'series');
    this.game = this.list.filter( (item) => item.Type === 'game');
  }

  cnahgeView() {
    this.toggleView = !this.toggleView;
    this.toggleSvc.isToggleView.next(this.toggleView);
  }
}
