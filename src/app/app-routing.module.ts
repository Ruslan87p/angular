import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


// const routes: Routes = [
//   {
//     path: '',
//     loadChildren: () => import('./components/list-items/items.module').then(m => m.ItemsModule),
//   },
// ];

@NgModule({
  imports: [RouterModule.forRoot([])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
