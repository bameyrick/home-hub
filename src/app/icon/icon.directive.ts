import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, Inject, Input, OnChanges } from '@angular/core';
import { Icon } from '../enums';
import { IconPlacement } from './icon-placement';
import { SvgSymbolService } from './service/svg-symbol.service';

const NS_SVG = 'http://www.w3.org/2000/svg';
const NS_XLINK = 'http://www.w3.org/1999/xlink';

@Directive({
  selector: '[icon]',
})
export class IconDirective implements OnChanges {
  /**
   * Populates the icon by name
   */
  @Input('icon') public set iconName(value: Icon | string | undefined | null) {
    if (value && Object.values(Icon).includes(value as Icon)) {
      this.name = value as Icon;

      this.useElement.setAttributeNS(NS_XLINK, 'href', `#${value}`);
    } else {
      this.name = undefined;
    }
  }

  /**
   * Gets the current icon name
   */
  public get iconName(): Icon | string | undefined | null {
    return this.name;
  }

  /**
   * Whether the icon should at the start or end of the element
   */
  @Input() public iconPlacement: IconPlacement = IconPlacement.Before;

  /**
   * Class to add to the icon
   */
  @Input() public iconClass?: string;

  /**
   * The SVG use element
   */
  private readonly useElement = this.document.createElementNS(NS_SVG, 'use');

  /**
   * The element with the [icon] directive tag, that the svg is being injected into
   */
  private readonly element = this.elementRef.nativeElement as HTMLElement;

  /**
   * The name of the selected icon
   */
  private name?: Icon | null;

  /**
   * Reference to the created svg element
   */
  private svg?: SVGElement;

  constructor(
    @Inject(DOCUMENT) private readonly document: Document,
    private readonly elementRef: ElementRef,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _iconService: SvgSymbolService
  ) {}

  public ngOnChanges(): void {
    if (this.name) {
      if (!this.svg) {
        this.svg = document.createElementNS(NS_SVG, 'svg');
        this.svg.appendChild(this.useElement);
      }

      this.svg.setAttribute('class', '');

      if (this.iconClass) {
        this.iconClass.split(' ').forEach(cls => this.svg?.classList.add(cls));
      }

      if (this.iconPlacement === IconPlacement.Before) {
        this.element.insertBefore(this.svg, this.element.firstChild);
      } else {
        this.element.appendChild(this.svg);
      }
    } else {
      this.svg?.remove();
    }
  }
}
