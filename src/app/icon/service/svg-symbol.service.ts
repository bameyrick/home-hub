import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AssetPath } from '../../enums';

@Injectable({
  providedIn: 'root',
})
export class SvgSymbolService {
  constructor(http: HttpClient) {
    http.get(AssetPath['assets/symbols.svg'], { responseType: 'text' }).subscribe(result => {
      const parsedResult = new DOMParser().parseFromString(result, 'text/xml');
      const svgElement = parsedResult.getElementsByTagName('svg')[0];

      // Don't interfere with display
      svgElement.setAttribute('style', 'display: none');

      document.head.appendChild(svgElement);
    });
  }
}
