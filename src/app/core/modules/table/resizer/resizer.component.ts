import { Component, OnInit, HostListener, ElementRef, Output, EventEmitter, Input, OnDestroy, HostBinding } from '@angular/core';
import { Column } from '@models/table.model';
import * as R from 'ramda';
import { fromEvent, Subject } from 'rxjs';
import { tap, switchMap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-resizer',
  templateUrl: './resizer.component.html',
  styleUrls: ['./resizer.component.scss']
})
export class ResizerComponent implements OnInit, OnDestroy {
  @Input() column: Column;
  @Input() columns: Column[];

  @Output() resizeEnd: EventEmitter<number> = new EventEmitter()

  position: number | null;
  clientXPosition: number |  null;
  hostInitialPosition: number;

  mouseUp$ = new Subject<null>();
  unsubscribe$ = new Subject<null>();

  constructor(private elementRef: ElementRef) {}

  @HostBinding('style.position') hostPosition: string;
  @HostBinding('style.height') hostHeight: string;
  @HostBinding('style.left') hostLeft: string;
  @HostBinding('style.cursor') hostCursor: string;
  
  @HostListener('document:mouseup', ['$event'])
  onMouseUp(event: MouseEvent) {
    event.stopPropagation();

    if(this.position) {
      const diff = this.position - (this.clientXPosition || 0);

      this.resizeEnd.emit(diff);
    }

    this.mouseUp$.next(null);
    this.mouseUp$.complete();

    this.position = null;
    this.clientXPosition = null;
    this.hostPosition = '';
    this.hostHeight = '100%';
  }

  ngOnInit() {
    this.hostCursor = 'col-resize';

    fromEvent<MouseEvent>(this.elementRef.nativeElement, 'mousedown')
      .pipe(
        takeUntil(this.unsubscribe$),
        tap((event: MouseEvent) => { 
          this.clientXPosition = event.clientX;

          this.hostPosition = 'absolute';
          this.hostHeight = '100vh';
          this.hostInitialPosition = this.getResizerLeftPostion();
          this.hostLeft = `${ this.hostInitialPosition }px`;
          this.hostCursor = 'default';
        }),
        switchMap(() => {
          return fromEvent<MouseEvent>(document, 'mousemove')
            .pipe(
              takeUntil(this.mouseUp$),
              takeUntil(this.unsubscribe$),
              tap((event: MouseEvent) => event.preventDefault()),
            )
        })
      )
      .subscribe((event: MouseEvent) => {
        this.position = event.clientX;

        const diff = event.clientX - (this.clientXPosition || 0);
        const cursorPosition = diff + this.hostInitialPosition;

        this.hostLeft = `${ cursorPosition - 1 }px`;
      })
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }

  getResizerLeftPostion(): number {
    return R.compose<Column[][], number, Column[], number>(
      R.reduce<Column, number>((sum, { width }) => sum + width, 0),
      (index) => R.slice(0, index + 1, this.columns),
      R.findIndex(R.propEq('id', this.column.id))
    )(this.columns)
  }
}
