import { Country } from '../interfaces/country.interface';
import { RESTCountry } from '../interfaces/rest-countries.interfaces';

export class CountryMapper {
  static mapRestCountryToCountry(country: RESTCountry): Country {
    return {
      cca2: country.cca2,
      flag: country.flag,
      flagSvg: country.flags.svg,
      name: country.translations['spa'].common ?? country.name.common,
      capital: country.capital?.length
        ? country.capital.join(',')
        : 'No tiene capital',
      population: country.population,
      region: country.region,
      subregion: country.subregion ?? 'No tiene subregion',
    };
  }

  static mapRestCountryArrayToCountryArray(
    restCountries: RESTCountry[]
  ): Country[] {
    return restCountries.map(CountryMapper.mapRestCountryToCountry);
  }
}
