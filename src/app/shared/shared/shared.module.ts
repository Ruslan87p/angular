import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImgUrlDirective } from 'src/app/components/derectives/img-url.directive';



@NgModule({
  declarations: [
    ImgUrlDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ImgUrlDirective
  ]
})
export class SharedModule { }
