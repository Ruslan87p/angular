import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListItemComponent } from './list-item/list-item.component';
import { ImgUrlDirective } from '../derectives/img-url.directive';
import { SharedModule } from 'src/app/shared/shared/shared.module';


export const routesListItemsPage: Routes = <Routes>[
  {
    path: ':id',
    component: ListItemComponent,
  }
];


@NgModule({
  declarations: [
    ListItemComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routesListItemsPage),
  ]
})

export class ItemsModule { }
