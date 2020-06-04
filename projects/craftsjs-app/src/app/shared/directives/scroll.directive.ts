import { Directive, EventEmitter, Output, Input, AfterViewInit, ElementRef } from '@angular/core';

@Directive({
  selector: '[scroll]'
})
export class ScrollDirective implements AfterViewInit {

  @Input()
  eventName = 'onScroll';

  @Output()
  scrollBottom = new EventEmitter<string>();

  constructor(
    private elementRef: ElementRef
  ) { }

  ngAfterViewInit(): void {
    this.elementRef.nativeElement.addEventListener('scroll', () => {
      if (
        this.elementRef.nativeElement.offsetHeight +
        this.elementRef.nativeElement.scrollTop >=
        this.elementRef.nativeElement.scrollHeight
      ) {
        this.scrollBottom.emit(this.eventName);
      }
    });
  }
}
