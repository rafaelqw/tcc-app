import { Component, OnInit } from '@angular/core';
import { SensoresService } from '../services/sensores.service';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-sensores',
  templateUrl: './sensores.page.html',
  styleUrls: ['./sensores.page.scss'],
})
export class SensoresPage implements OnInit {
  public sensores : any = [];
  public id_disposito: any; 

  constructor(
    private servSensor: SensoresService,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController
  ) { }

  async ngOnInit() {
    this.id_disposito = await this.activatedRoute.snapshot.paramMap.get('id_disp');
    if(this.id_disposito != null){
      this.getSensoresByDispostivo();
    }
    else{
      this.getSensores();
    }
  }

  // Busca os dados dos sensores
  private async getSensores(){
    this.sensores = await this.servSensor.getSensores();
    this.sensores = JSON.parse(this.sensores);
  }

  // Busca os dados dos sensores de um dispositivo especifico
  private async getSensoresByDispostivo(){
    this.sensores = await this.servSensor.getSensoresByDispositivo(this.id_disposito);
    this.sensores = JSON.parse(this.sensores);
  }

  // Redireciona para a tela de Detalhes do Sensor com o id do sensor selecionado pelo usuario
  public async redirectSensores(id_sensor){
    this.navCtrl.navigateRoot('/sensor-detail/'+ id_sensor);
  }
}
