import { Component, input } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'country-list',
  imports: [DecimalPipe, RouterLink, TableModule],
  templateUrl: './list.component.html',
})
export class ListComponent {
  countries = input.required<Country[]>();
  errorMessage = input<string | unknown>();
  isLoading = input<boolean>(false);
  isEmpty = input<boolean>(false);
}
