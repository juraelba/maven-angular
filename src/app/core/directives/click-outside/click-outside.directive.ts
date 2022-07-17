import { Directive, EventEmitter, Output, ElementRef, OnDestroy, OnInit } from '@angular/core';

@Directive({
  selector: '[appClickOutside]'
})
export class ClickOutsideDirective implements OnInit,OnDestroy {
  @Output() clickOutside: EventEmitter<null> = new EventEmitter();

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    document.addEventListener('click', (event: MouseEvent) => {
      this.click(event);
    }, true);
  }

  ngOnDestroy() {
    document.removeEventListener('click', this.click);
  }

  click(event: any) {
    if(!this.elementRef.nativeElement.contains(event.target)) {
      this.clickOutside.emit(null);
    } 
  }
}
