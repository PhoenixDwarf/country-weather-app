import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { CountryMapper } from '../mappers/country.mapper';
import { RESTCountry } from '../interfaces/rest-countries.interfaces';
import { Country } from '../interfaces/country.interface';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private readonly http = inject(HttpClient);
  private readonly queryCacheCapital = new Map<string, Country[]>();
  private readonly queryCacheCountry = new Map<string, Country[]>();
  private readonly queryCacheAlphaCode = new Map<string, Country | null>();

  searchByCapital(query: string): Observable<Country[]> {
    query = query.toLocaleLowerCase();

    if (this.queryCacheCapital.has(query)) {
      return of(this.queryCacheCapital.get(query) ?? []);
    }

    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`).pipe(
      map(CountryMapper.mapRestCountryArrayToCountryArray),
      tap((countries) => this.queryCacheCapital.set(query, countries)),
      catchError((err) => {
        return throwError(
          () =>
            new Error(
              `No se encontro un pais por capital con el termino "${query}"`
            )
        );
      })
    );
  }

  searchByCountry(query: string): Observable<Country[]> {
    query = query.toLocaleLowerCase();

    if (this.queryCacheCountry.has(query)) {
      return of(this.queryCacheCountry.get(query) ?? []);
    }

    return this.http.get<RESTCountry[]>(`${API_URL}/name/${query}`).pipe(
      map(CountryMapper.mapRestCountryArrayToCountryArray),
      tap((countries) => this.queryCacheCountry.set(query, countries)),
      catchError((err) => {
        return throwError(
          () =>
            new Error(
              `No se encontro un pais por nombre con el termino "${query}"`
            )
        );
      })
    );
  }

  searchCountryByAlphaCode(code: string): Observable<Country | null> {
    if (this.queryCacheAlphaCode.has(code)) {
      return of(this.queryCacheAlphaCode.get(code) ?? null);
    }

    return this.http.get<RESTCountry[]>(`${API_URL}/alpha/${code}`).pipe(
      map(CountryMapper.mapRestCountryArrayToCountryArray),
      map((countries) => countries.at(0) ?? null),
      tap((country) => this.queryCacheAlphaCode.set(code, country)),
      catchError((err) => {
        return throwError(
          () => new Error(`No se encontro un pais con el código "${code}"`)
        );
      })
    );
  }

  searchByRegion(region: string): Observable<Country[]> {
    if (this.queryCacheCountry.has(region)) {
      return of(this.queryCacheCountry.get(region) ?? []);
    }

    return this.http.get<RESTCountry[]>(`${API_URL}/region/${region}`).pipe(
      map(CountryMapper.mapRestCountryArrayToCountryArray),
      tap((countries) => this.queryCacheCountry.set(region, countries)),
      catchError((err) => {
        return throwError(() => new Error(`No se encontro la region`));
      })
    );
  }
}
