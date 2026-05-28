import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appPercentageValidation]',
})
export class PercentageValidation {
  constructor() {}

  @HostListener('input', ['$event'])

  oninput(event:Event){
    const input = event.target as HTMLInputElement;

    input.value = Math.min(100, Math.max(0, Math.abs(Number(input.value)))).toString();
  }
}
