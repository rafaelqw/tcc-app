import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { ToastController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { stringify } from '@angular/compiler/src/util';
import { AlertController } from '@ionic/angular';
import { Device } from '@ionic-native/device/ngx';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  //variables
  private email: string;
  private senha: string;
  private data: any;

  constructor(
    private navCtrl: NavController,
    private servLogin: LoginService,
    private toastController: ToastController,
    private menuCtrl: MenuController,
    private storage: Storage,
    private alertController: AlertController,
    private device: Device
  ) {
    this.menuCtrl.enable(false);
    this.initialize();
  }

  initialize(){
    this.email = "";
    this.senha = "";
    //this.showAlertNotificacao();
  }

  ngOnInit() {
    
  }

  // Faz a autenticação do Usuario
  async loginErrado() {
    this.storage.set('token',"123");
    this.storage.set('id_usuario_logado',1);
    this.storage.set('notification',true);
    this.email = null;
    this.senha = null;
    this.navCtrl.navigateRoot('/home');
  }

  async login(){
    if (this.email != "" && this.senha != "") {
      this.servLogin.login(this.email, this.senha)
        .then(async result => {
          this.data = JSON.parse(stringify(result));
          if (this.data.login) {
            await this.storage.set('token',this.data.token);
            await this.storage.set('id_usuario_logado',this.data.id_usuario);
            await this.storage.set('notification',this.data.notification);
            this.email = null;
            this.senha = null;
            await this.showToast(this.data.msg,'success',1500);
            this.navCtrl.navigateRoot('/home');
          }
          else {
            await this.showToast(this.data.msg,'danger',1500);
          }
        })
        .catch(err => {
        })
    }
    else if(this.email == "" && this.senha != ""){
      await this.showToast("Preencha o Email",'danger',1500);
    }
    else if(this.email != "" && this.senha == ""){
      await this.showToast("Preencha a senha",'danger',1500);
    }
    else {
      await this.showToast("Preencha os dados de login",'danger',1500);
    }
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

  async showAlertNotificacao() {
    const alert = await this.alertController.create({
      header: 'Notificação!',
      message: 'Deseja receber notificações neste celular?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Sim',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }

}
