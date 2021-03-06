import { Component, OnInit } from '@angular/core';
import { ConfiguracaoService } from '../services/configuracao.service'

@Component({
  selector: 'app-configuracao',
  templateUrl: './configuracao.page.html',
  styleUrls: ['./configuracao.page.scss'],
})
export class ConfiguracaoPage implements OnInit {
  
  public notification: boolean;
  public receiver: any;
  constructor(
    private servConfig: ConfiguracaoService
  ) { 
    
  }

  async ngOnInit() {
    this.receiver = await this.servConfig.getReceiver();
    this.receiver = JSON.parse(this.receiver);
    this.notification = this.receiver.flg_notificacao_ativa;
  }

  // Altera o a configuração do dispositivo se ele pode receber notificações
  public async notificationChange(){
    this.receiver.flg_notificacao_ativa = this.notification;
    await this.servConfig.putReceiver(this.receiver);
  }

}
