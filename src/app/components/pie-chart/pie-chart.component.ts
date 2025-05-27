import { Component, Input, OnChanges, signal } from '@angular/core';
import { ChartDataset, ChartOptions, Plugin } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { constants } from '../../constants/constants';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { RegionDropdownValues } from '../../interfaces/region-dropdown.interface';

@Component({
  selector: 'app-pie-chart',
  imports: [BaseChartDirective],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.css',
})
export class PieChartComponent implements OnChanges {
  @Input() data: RegionDropdownValues[] = [];

  // Pie
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      tooltip: { enabled: false },
      legend: {
        position: 'left',
        align: 'center',
        onClick: () => {},
        onHover: () => {},
        onLeave: () => {},
      },
      datalabels: {
        formatter: (value: number, context: any) => {
          const data = context.chart.data.datasets[0].data;
          const total = data.reduce((acc: number, val: number) => acc + val, 0);
          const percentage = ((value / total) * 100).toFixed(0) + '%';
          return percentage;
        },
        color: '#fff',
        font: {
          weight: 'normal',
          size: 12,
        },
        display: true,
        anchor: 'center',
        align: 'center',
      },
    },
  };

  public pieChartLabels = signal<string[]>([]);
  public pieChartDatasets = signal<ChartDataset<'pie', number[]>[]>([]);
  public pieChartPlugins: Plugin<'pie'>[] = [ChartDataLabels];

  ngOnChanges() {
    this.pieChartDatasets?.set([
      {
        data: this.data.map((region) => region.value),
        backgroundColor: [
          constants['color-primary-900'],
          constants['color-primary-800'],
          constants['color-primary-700'],
          constants['color-primary-600'],
          constants['color-primary-500'],
        ],
      },
    ]);
    this.pieChartLabels.set(this.data.map((region) => region.name));
  }
}
