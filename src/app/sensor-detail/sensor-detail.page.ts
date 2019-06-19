import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SensoresService } from '../services/sensores.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-sensor-detail',
  templateUrl: './sensor-detail.page.html',
  styleUrls: ['./sensor-detail.page.scss'],
})
export class SensorDetailPage implements OnInit {
  private sensor : any;
  public id_sensor: any; 
  constructor(
    private servSensor: SensoresService,
    private activatedRoute: ActivatedRoute
  ) { }

  async ngOnInit() {
    this.id_sensor = await this.activatedRoute.snapshot.paramMap.get('id');
    await this.loadSensor(this.id_sensor);
  }
  
  // Busca o sensor que foi selecionado na tela de sensores
  private async loadSensor(id){
    this.sensor = await this.servSensor.getSensoresById(id);
    this.sensor = JSON.parse(this.sensor);
    console.log(this.sensor);
    this.sensor = this.sensor[0];
    await this.getDataGraphic(60);
  }

  // Busca os dados do sensor e monta o grafico dele
  private async getDataGraphic(periodo){
    const sensor = this.sensor;

    var valores : any;
    valores = await this.servSensor.getDataGraphic(sensor.id, periodo);
    valores = JSON.parse(valores);
    
    var labels = []; 
    var datas = [];
    valores.reverse();
    await valores.forEach(element => {
        labels.push(element.label);
        datas.push(element.data);
    });

    // Line 
    var idChart = 'chart-' + sensor.id;
    var ctxPie = (<any>document.getElementById(idChart)).getContext('2d');
    var chart = new Chart(ctxPie, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{ 
            data: datas,
            label: sensor.nome,
            borderColor: await this.getRandomColor(),
            fill: false
          }
        ]
      }
    });
  }

  // Gera um cor randomica
  private async getRandomColor() {
    var letters = '0123456789AB';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 12)];
    }
    return color;
  }

}
