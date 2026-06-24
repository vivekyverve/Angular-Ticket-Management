import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appPercentageValidation]',
})
export class PercentageValidation {
  constructor(private ngControl : NgControl) {}

  @HostListener('input', ['$event'])

  oninput(event:Event){
    const input = event.target as HTMLInputElement;

    const value = Math.min(100, Math.max(0, Math.abs(Number(input.value))));

    input.value = value.toString();

    this.ngControl.control?.setValue(value,{emitEvent: false})
  }
}
