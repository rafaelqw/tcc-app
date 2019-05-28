import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { stringify } from '@angular/compiler/src/util';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Device } from '@ionic-native/device/ngx';
import { HomeService } from '../services/home.service';
import { Chart } from 'chart.js';
import { forEach } from '@angular/router/src/utils/collection';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public sensores : any = [];

  constructor(
    private menuCtrl: MenuController,
    private storage: Storage,
    private alertController: AlertController,
    private toastController: ToastController,
    private device: Device,
    private servHome: HomeService
  ) {
    this.initialize();
    //this.updateGraphics(60);
  }

  private async initialize(){
    this.menuCtrl.enable(true);
    await this.updateGraphics(60);
    if(await this.storage.get('notification')){
      await this.showAlertNotificacao();
    }
  }

  private async updateGraphics(periodo){
    await this.getSensores();
    await this.getDataGraphic(periodo);
  }

  private async showAlertNotificacao() {
    const alert = await this.alertController.create({
      header: 'Notificação!',
      message: 'Deseja receber notificações neste dispositivo: ' + this.device.model + ' ?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            this.saveReceiver(false);
          }
        }, {
          text: 'Sim',
          handler: () => {
            this.saveReceiver(true);
          }
        }
      ]
    });

    await alert.present();
  }

  private async saveReceiver(flg_notificacao = false){
    var receiver = {
      registration_id: await this.storage.get('tokenFCM'),
      device_name: this.device.model,
      id_usuario: await this.storage.get('id_usuario_logado'),
      flg_notificacao_ativa: flg_notificacao
    }

    this.servHome.saveReceiver(receiver).then(async result => {
      await this.showToast('Notificações ativas','success',1500);
      this.storage.set('notification',false);
    })
    .catch(async error => {
      if(flg_notificacao){
        await this.showToast('Não foi possivel ativar as notificações','danger',1500);
      }
      this.storage.set('notification',false);
    });
  }

  async getRandomColor() {
    var letters = '0123456789AB';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 12)];
    }
    return color;
  }

  private async showToast(message:string, color:string, duration:any){
    const toast = await this.toastController.create({
      message: message,
      showCloseButton: true,
      closeButtonText: 'OK',
      color: color,
      duration: duration
    });
    toast.present();
  }

  private async getSensores(){
    this.sensores = await this.servHome.getSensores();
    this.sensores = JSON.parse(this.sensores);
  }

  private async getDataGraphic(periodo){

    for (let i = 0; i < this.sensores.length; i++) {
      const sensor = this.sensores[i];

      var valores : any;
      valores = await this.servHome.getDataGraphic(sensor.id, periodo);
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
  }

}


