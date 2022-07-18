import { Directive, EventEmitter, Output, ElementRef, HostListener, OnDestroy, OnInit } from '@angular/core';

@Directive({
  selector: '[appClickOutside]'
})
export class ClickOutsideDirective {
  @Output() clickOutside: EventEmitter<null> = new EventEmitter();

  constructor(private elementRef: ElementRef) { }

  @HostListener('document:click', ['$event'])
  click(event: MouseEvent) {
    if(!this.elementRef.nativeElement.contains(event.target)) {
      this.clickOutside.emit(null);
    } 
  }
}
