import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appEstimatedHoursValidation]',
})
export class EstimatedHoursValidation {
  constructor() {}

  @HostListener('input' , ['$event'])

  oninput(event:Event){
    const input = event.target as HTMLInputElement;
    
    input.value = Math.min(400, (Math.abs(Number(input.value)))).toString();

    // input.value = Math.abs(Number(input.value)).toString();
  }
}
