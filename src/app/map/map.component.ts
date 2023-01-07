import { AfterViewInit, Component, Input, OnChanges, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { TimeUnit, unitToMS } from '@qntm-code/utils';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import { useGeographic } from 'ol/proj';
import OSM from 'ol/source/OSM';
import { ComponentAbstract } from '../abstracts';

@Component({
  selector: 'home-hub-map',
  template: '',
  styleUrls: ['./map.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MapComponent extends ComponentAbstract implements OnChanges, AfterViewInit {
  protected readonly baseClassName = 'Map';

  @Input() public latLon?: [number, number];

  private map?: Map;

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['latLon'] && this.map) {
      this.animateToLocation();
    }
  }

  public ngAfterViewInit(): void {
    useGeographic();

    this.map = new Map({
      target: this.elementRef.nativeElement,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: this.lonLat,
        zoom: 1,
      }),
    });

    this.animateToLocation();
  }

  private animateToLocation(): void {
    this.map?.getView().animate({ zoom: 18, center: this.lonLat, duration: unitToMS(3, TimeUnit.Seconds) });
  }

  private get lonLat(): [number, number] {
    return Array.from(this.latLon || [0, 0]).reverse() as [number, number];
  }
}
