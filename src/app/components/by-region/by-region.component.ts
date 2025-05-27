import { Component, inject, Input, linkedSignal } from '@angular/core';
import { ListComponent } from '../../components/list/list.component';
import { Region } from '../../types/regiones.type';
import { NgClass } from '@angular/common';
import { rxResource } from '@angular/core/rxjs-interop';
import { CountryService } from '../../services/country.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-by-region-page',
  imports: [ListComponent, NgClass],
  templateUrl: './by-region.component.html',
})
export class ByRegionPageComponent {
  @Input() region: Region = 'Africa';

  countryService = inject(CountryService);
  selectedRegion = linkedSignal<Region>(() => this.region);

  regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ];

  selectRegion(region: Region) {
    this.selectedRegion.set(region);
  }

  regionResource = rxResource({
    request: () => ({ region: this.selectedRegion() }),
    loader: ({ request }) => {
      if (!request.region) return of([]);
      return this.countryService.searchByRegion(request.region);
    },
  });
}
