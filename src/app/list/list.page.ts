import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import * as HighCharts from 'highcharts';
import { from } from 'rxjs';
import { ChartsModule } from 'ng2-charts';
import * as asd from 'chartjs-plugin-streaming';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})

export class ListPage implements OnInit {
  private selectedItem: any;
  private icons = [
    'flask',
    'wifi',
    'beer',
    'football',
    'basketball',
    'paper-plane',
    'american-football',
    'boat',
    'bluetooth',
    'build'
  ];
  public items: Array<{ title: string; note: string; icon: string }> = [];
  constructor(
    
  ) {
    for (let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }
  }

  initialize(){
    
    this.useAnotherOneWithWebpack();
  }

  ngOnInit() {
    this.useAnotherOneWithWebpack();
  }
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }

  useAnotherOneWithWebpack() {
    var backColor = [
      'rgba(255, 99, 132, 0.7)',
      'rgba(54, 162, 235, 0.7)',
      'rgba(255, 206, 86, 0.7)',
      'rgba(75, 192, 192, 0.7)',
      'rgba(153, 102, 255, 0.7)',
      'rgba(255, 159, 64, 0.7)'
    ]

    var borderColor = [
      'rgba(255, 39, 85, 1)',
      'rgba(21, 139, 219, 1)',
      'rgba(255, 194, 46, 1)',
      'rgba(75, 192, 192, 1)',
      'rgba(153, 102, 255, 1)',
      'rgba(255, 159, 64, 1)'
    ]

    // Bar
    var ctxBar = (<any>document.getElementById('chart-bar')).getContext('2d');
    var chart1 = new Chart(ctxBar, {
        // The type of chart we want to create
        type: 'line',
        // The data for our dataset
        data: {
            labels: ["January", "February"],

            datasets:[]
        }
    });

    // Line
    var ctxLine = (<any>document.getElementById('chart-line')).getContext('2d');
    var chart2 = new Chart(ctxLine, {
      type: 'line',
      data: {
        labels: ['1500','1600','1700','1750','1800','1850'],
        datasets: [{ 
            data: [1286,114,106,1106,107,111],
            label: "Africa",
            borderColor: "#3e95cd",
            fill: false
          }
        ]
      }
    });

    // Pie
    var ctxPie = (<any>document.getElementById('chart-pie')).getContext('2d');
    var chart3 = new Chart(ctxPie, {
        // The type of chart we want to create
        type: 'pie',
        // The data for our dataset
        data: {
            labels: ["January", "February", "March"],

            datasets: [{
              label: "My First dataset",
              backgroundColor: backColor,
              borderColor: borderColor,
              data: [20, 30, 45],
              borderWidth: 1
            }]
       }
    });

    // Line 2
    var ctxPie = (<any>document.getElementById('chart-line-2')).getContext('2d');
    var chart4 = new Chart(ctxPie, {
      type: 'line',
      data: {
        labels: ['00:00','00:30','01:00','01:30','02:00','02:30','03:00','03:30','04:00','04:30','05:00','05:30','06:00',
                 '06:30','07:00','07:30','08:00','08:30','09:00','09:30','10:00','10:30','11:00','11:30','12:00'],
        datasets: [{ 
            data: [1286,114,106,1106,107,111,1286,114,106,1106,107,111,123,1286,114,106,1106,107,111,1286,114,106,1106,107,111],
            label: "sensor",
            borderColor: "#3e95cd",
            fill: false
          }
        ]
      }
    });
  }
}
