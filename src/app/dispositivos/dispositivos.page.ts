import { Component, OnInit } from '@angular/core';
import { DispositivosService } from '../services/dispositivos.service'
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-dispositivos',
  templateUrl: './dispositivos.page.html',
  styleUrls: ['./dispositivos.page.scss'],
})
export class DispositivosPage implements OnInit {
  public dispositivos : any = [];
  constructor(
    private servDisp: DispositivosService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.loadDispositivos();
  }

  // Busco os Dispositivos vinculados ao empreendimento
  private async loadDispositivos(){
    this.dispositivos = await this.servDisp.getDispositivos();
    this.dispositivos = JSON.parse(this.dispositivos);
  }

  // Redireciona para a tela de Sensores com o id do dispositivo selecionado pelo usuario
  public async redirectSensores(id_dispositivo){
    this.navCtrl.navigateRoot('/sensores/'+ id_dispositivo);
  }
}
