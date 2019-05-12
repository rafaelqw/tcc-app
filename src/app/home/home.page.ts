import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { stringify } from '@angular/compiler/src/util';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Device } from '@ionic-native/device/ngx';
import { HomeService } from '../services/home.service';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(
    private menuCtrl: MenuController,
    private storage: Storage,
    private alertController: AlertController,
    private toastController: ToastController,
    private device: Device,
    private servHome: HomeService
  ) {
    this.initialize();
  }

  async initialize(){
    this.menuCtrl.enable(true);
    if(await this.storage.get('notification')){
      await this.showAlertNotificacao();
    }
  }

  async showAlertNotificacao() {
    const alert = await this.alertController.create({
      header: 'Notificação!',
      message: 'Deseja receber notificações neste dispositivo: ' + this.device.model + ' ?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Sim',
          handler: () => {
            this.saveReceiver();
          }
        }
      ]
    });

    await alert.present();
  }

  async saveReceiver(){
    var receiver = {
      registration_id: await this.storage.get('tokenFCM'),
      device_name: this.device.model,
      id_usuario: await this.storage.get('id_usuario_logado'),
      flg_notificacao_ativa: true
    }

    this.servHome.saveReceiver(receiver).then(async result => {
      await this.showToast('Notificações ativas','success',1500);
      this.storage.set('notification',false);
    })
    .catch(async error => {
      await this.showToast('Não foi possivel ativar as notificações as','danger',1500);
      this.storage.set('notification',false);
    });
  }

  async showToast(message:string, color:string, duration:any){
    const toast = await this.toastController.create({
      message: message,
      showCloseButton: true,
      closeButtonText: 'OK',
      color: color,
      duration: duration
    });
    toast.present();
  }

}


