import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ElementRef,
  ViewChild,
  Input,
  OnDestroy,
} from '@angular/core';

@Component({
  selector: 'app-lazy-loading-scroll',
  templateUrl: './lazy-loading-scroll.component.html',
  styleUrls: ['./lazy-loading-scroll.component.scss'],
})
export class LazyLoadingScrollComponent implements OnInit, OnDestroy {
  @Input() options = {};
  @Output() scrolled = new EventEmitter();
  @ViewChild('anchor', { static: true }) anchor: ElementRef<HTMLElement>;
  //! create observer
  private observer: IntersectionObserver;

  constructor(private host: ElementRef) {}
  // !to get accec to dom native element
  get element() {
    return this.host.nativeElement;
  }

  ngOnInit() {
    //!check thee position of the native element and fire the scroll event to the parent eleemnt
    const options = {
      root: this.isHostScrollable() ? this.host.nativeElement : null,
      ...this.options,
    };

    this.observer = new IntersectionObserver(([entry]) => {
      entry.isIntersecting && this.scrolled.emit();
    }, options);

    this.observer.observe(this.anchor.nativeElement);
  }
  //! check the scrollability of the element
  private isHostScrollable() {
    const style = window.getComputedStyle(this.element);

    return (
      style.getPropertyValue('overflow') === 'auto' ||
      style.getPropertyValue('overflow-y') === 'scroll'
    );
  }
  // ! destroy observable
  ngOnDestroy() {
    this.observer.disconnect();
  }
}
