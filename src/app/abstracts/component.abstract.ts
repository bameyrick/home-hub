import { Directive, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { getLinkForRoute } from '@home-hub/common';
import { Subscription } from 'rxjs';
import { AppRoute } from '../../models';
import { Icon } from '../enums';

@Directive()
export abstract class ComponentAbstract implements OnInit, OnDestroy {
  public readonly AppRoute = AppRoute;
  public readonly Icon = Icon;
  public readonly getLinkForRoute = getLinkForRoute;
  protected abstract readonly baseClassName: string;

  protected readonly subscriptions = new Subscription();

  constructor(protected readonly elementRef: ElementRef) {}

  public ngOnInit(): void {
    this.elementRef.nativeElement.classList.add(this.baseClassName);
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
