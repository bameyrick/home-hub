import { Directive, ElementRef, NgZone, OnDestroy, OnInit } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { ComponentAbstract } from './component.abstract';

@Directive()
export abstract class IsVisbileComponentAbstract extends ComponentAbstract implements OnInit, OnDestroy {
  private intersectionObserver?: IntersectionObserver;

  protected readonly visible$ = new ReplaySubject<boolean>(1);

  constructor(elementRef: ElementRef, protected readonly ngZone: NgZone) {
    super(elementRef);
  }

  public override ngOnInit(): void {
    super.ngOnInit();

    this.ngZone.runOutsideAngular(() => {
      this.intersectionObserver = new IntersectionObserver(entries => entries.forEach(entry => this.visible$.next(entry.isIntersecting)));

      this.intersectionObserver.observe(this.elementRef.nativeElement);
    });
  }

  public override ngOnDestroy(): void {
    this.intersectionObserver?.disconnect();

    super.ngOnDestroy();
  }
}
