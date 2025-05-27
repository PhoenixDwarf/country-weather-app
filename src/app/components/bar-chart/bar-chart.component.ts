import { Component, Input, OnChanges, signal } from '@angular/core';
import { ChartDataset, ChartOptions, Plugin } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { LanguageFrequency } from '../../interfaces/output.interface';
import { constants } from '../../constants/constants';

@Component({
  selector: 'app-bar-chart',
  imports: [BaseChartDirective],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.css',
})
export class BarChartComponent implements OnChanges {
  @Input() data: LanguageFrequency = {};

  public barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        display: false,
      },
    },
    indexAxis: 'y',
    scales: {
      x: {
        beginAtZero: true,
        grid: { display: false },
      },
      y: {
        grid: { display: false },
      },
    },
  };

  public barChartLabels = signal<string[]>([]);
  public barChartDatasets = signal<ChartDataset<'bar', number[]>[]>([]);
  public barChartPlugins: Plugin<'bar'>[] = [ChartDataLabels];

  ngOnChanges() {
    this.barChartLabels.set(Object.keys(this.data));
    this.barChartDatasets.set([
      {
        data: Object.values(this.data),
        backgroundColor: [
          constants['color-primary-900'],
          constants['color-primary-800'],
          constants['color-primary-700'],
          constants['color-primary-600'],
        ],
      },
    ]);
  }
}
