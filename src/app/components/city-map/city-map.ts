import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
  signal,
} from '@angular/core';
import * as L from 'leaflet';
import { CITIES } from './cities';
import { City } from './city.model';

@Component({
  imports: [],
  selector: 'app-city-map',
  styleUrl: './city-map.css',
  templateUrl: './city-map.html',
})
export class CityMap implements AfterViewInit, OnDestroy {
  @ViewChild('mapContainer', { static: true }) private mapContainer!: ElementRef<HTMLDivElement>;

  /** City currently hovered/clicked, shown in the info panel. */
  protected readonly selectedCity = signal<City | null>(null);

  private map: L.Map | undefined;

  /** Fallback bounding box roughly covering the state of Hesse, used if the border GeoJSON fails to load. */
  private static readonly HESSEN_BOUNDS: L.LatLngBoundsExpression = [
    [49.38, 7.75],
    [51.65, 10.25],
  ];

  /** Path to the official Hesse state border outline, served from `public/`. */
  private static readonly HESSEN_BORDER_URL = 'hessen.geojson';

  ngAfterViewInit(): void {
    this.map = L.map(this.mapContainer.nativeElement, {
      // Fixed view: all panning/zooming interactions are disabled.
      zoomControl: false,
      dragging: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      touchZoom: false,
      boxZoom: false,
      keyboard: false,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(this.map);

    this.map.fitBounds(CityMap.HESSEN_BOUNDS);
    this.addCityMarkers();
    this.loadHessenBorder();
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }

  /** Draws a bold black outline of Hesse's actual state border and fits the view to it. */
  private loadHessenBorder(): void {
    fetch(CityMap.HESSEN_BORDER_URL)
      .then((response) => response.json())
      .then((geojson: GeoJSON.GeoJsonObject) => {
        if (!this.map) {
          return;
        }
        const border = L.geoJSON(geojson, {
          style: {
            color: '#000000',
            weight: 3,
            fill: false,
          },
        }).addTo(this.map);
        this.map.fitBounds(border.getBounds());
      })
      .catch(() => {
        // Border outline is a visual enhancement only; keep the fallback bounds/view on failure.
      });
  }

  private addCityMarkers(): void {
    if (!this.map) {
      return;
    }
    for (const city of CITIES) {
      const marker = L.circleMarker([city.lat, city.lng], {
        radius: 9,
        color: '#1d4ed8',
        weight: 2,
        fillColor: '#3b82f6',
        fillOpacity: 0.8,
      }).addTo(this.map);

      // Hover shows a quick tooltip with the city name.
      marker.bindTooltip(city.name, { direction: 'top', offset: [0, -8] });

      // Click shows a popup with the full city information and updates the side panel.
      marker.bindPopup(this.popupHtml(city));

      marker.on('mouseover', () => {
        marker.setStyle({ radius: 12, fillOpacity: 1 });
      });
      marker.on('mouseout', () => {
        marker.setStyle({ radius: 9, fillOpacity: 0.8 });
      });
      marker.on('click', () => this.selectedCity.set(city));
    }
  }

  private popupHtml(city: City): string {
    return `
      <div class="city-popup">
        <h3>${city.name}</h3>
      </div>
    `;
  }
}
