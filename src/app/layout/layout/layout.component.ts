import { Component, OnInit, signal } from '@angular/core';
import { PieChartComponent } from '../../components/pie-chart/pie-chart.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RegionDropdownValues } from '../../interfaces/region-dropdown.interface';
import { DataWarningComponent } from '../../components/data-warning/data-warning.component';
import { ByRegionPageComponent } from '../../components/by-region/by-region.component';

@Component({
  selector: 'app-layout',
  imports: [
    PieChartComponent,
    MultiSelectModule,
    ReactiveFormsModule,
    DataWarningComponent,
    ByRegionPageComponent,
  ],
  templateUrl: './layout.component.html',
})
export default class LayoutComponent implements OnInit {
  // Pie Chart

  pieFormGroup!: FormGroup;

  regionDrodownValues: RegionDropdownValues[] = [
    { name: 'Asia', value: 60 },
    { name: 'África', value: 16 },
    { name: 'Europa', value: 10 },
    { name: 'América Latina y el Caribe', value: 8 },
    { name: 'Norteamérica y Oceanía', value: 6 },
  ];

  pieChartRegions = signal<RegionDropdownValues[]>(this.regionDrodownValues);

  ngOnInit() {
    this.setupPieForm();
  }

  setupPieForm(): void {
    this.pieFormGroup = new FormGroup({
      selectedRegions: new FormControl<RegionDropdownValues[] | null>(
        this.regionDrodownValues
      ),
    });

    this.pieFormGroup
      .get('selectedRegions')
      ?.valueChanges.subscribe((selectedRegions) => {
        if (selectedRegions) this.pieChartRegions.set(selectedRegions);
      });
  }
}
