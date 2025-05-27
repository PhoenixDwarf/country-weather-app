import {
  Component,
  effect,
  EventEmitter,
  inject,
  Input,
  linkedSignal,
  Output,
} from '@angular/core';
import { ListComponent } from '../../components/list/list.component';
import { Region } from '../../types/regiones.type';
import { NgClass } from '@angular/common';
import { rxResource } from '@angular/core/rxjs-interop';
import { CountryService } from '../../services/country.service';
import { of } from 'rxjs';
import { Country } from '../../interfaces/country.interface';
import {
  LanguageFrequency,
  OutputEvent,
} from '../../interfaces/output.interface';

@Component({
  selector: 'app-by-region-page',
  imports: [ListComponent, NgClass],
  templateUrl: './by-region.component.html',
})
export class ByRegionPageComponent {
  @Input() region: Region = 'Africa';
  @Output() onRegionChange = new EventEmitter<OutputEvent>();
  countryService = inject(CountryService);
  selectedRegion = linkedSignal<Region>(() => this.region);
  languageFrequency!: LanguageFrequency;
  output: OutputEvent = {};

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

  countriesEffect = effect(() => {
    const countries = this.regionResource.value();
    if (!countries || countries.length === 0) return;

    this.calculateLanguageFrequency(countries);

    this.onRegionChange.emit({
      ...this.output,
      languageFrequency: this.languageFrequency,
    });
  });

  private calculateLanguageFrequency(countries: Country[] | undefined): void {
    const langFrequency: LanguageFrequency = {};

    if (!countries) return;

    countries.forEach((country) => {
      if (!country.languages) return;

      Object.values(country.languages).forEach((language) => {
        if (language) {
          langFrequency[language] = (langFrequency[language] || 0) + 1;
        }
      });
    });

    // Order the languageFrequency by count descending
    const ordered = Object.entries(langFrequency)
      .sort((a, b) => b[1] - a[1])
      .reduce((acc, [lang, count]) => {
        acc[lang] = count;
        return acc;
      }, {} as LanguageFrequency);

    this.languageFrequency = ordered;
  }
}
