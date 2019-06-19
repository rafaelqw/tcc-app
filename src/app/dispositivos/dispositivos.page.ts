import { Component, OnInit } from '@angular/core';
import { DispositivosService } from '../services/dispositivos.service'
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-dispositivos',
  templateUrl: './dispositivos.page.html',
  styleUrls: ['./dispositivos.page.scss'],
})
export class DispositivosPage implements OnInit {
  private dispositivos : any = [];
  constructor(
    private servDisp: DispositivosService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.loadDispositivos();
  }

  async loadDispositivos(){
    this.dispositivos = await this.servDisp.getDispositivos();
    this.dispositivos = JSON.parse(this.dispositivos);
  }

  async redirectSensores(id_dispositivo){
    this.navCtrl.navigateRoot('/sensores/'+ id_dispositivo);
  }
}
