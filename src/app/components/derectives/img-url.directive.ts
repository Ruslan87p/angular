import { Directive, Input } from '@angular/core';

@Directive({
  selector: 'img[src]',
  host: {
    '(error)':'SetDefaultUrl()',
    '[src]':'src'
   }
})
export class ImgUrlDirective {

  @Input() src:string;
  SetDefaultUrl() {
    this.src = 'assets/image/no-image.png';
  }

}
