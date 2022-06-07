import { Component, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { HomeApiService } from './home-api.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild('barChart') barChart;

  bars: any;
  colorArray: any;
  data: Map<string, number>;

  constructor(
    private homeApiService: HomeApiService,
    private messageService: MessageService
    ) {}

  ionViewDidEnter() {
    this.getData();
  }

  getData() {
    this.homeApiService
      .getData()
      .subscribe(
        (response) => {
          this.data = response;
          this.createBarChart();
        },
        () =>
          this.messageService.error('Erro ao buscar dados do dashboard', () =>
            this.getData()
          )
      );
  }

  createBarChart() {
    Chart.register(...registerables);

    this.bars = new Chart(this.barChart.nativeElement, {
      type: 'bar',
      data: {
        labels: ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"],
        datasets: [{
          data: [this.data[1], this.data[2], this.data[3], this.data[4], this.data[5], this.data[6], this.data[7], this.data[8], this.data[9], this.data[10], this.data[11], this.data[12]],
          backgroundColor: 'rgb(38, 194, 129)', 
          borderColor: 'rgb(38, 194, 129)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          ticks: {
            beginAtZero: true
          },
          yAxes: {
            suggestedMax: 10
          }
        }
      }
    });


    Chart.register(...registerables);
  }

}