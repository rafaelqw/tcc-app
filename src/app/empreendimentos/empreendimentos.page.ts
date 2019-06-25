import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { EmpreendimentosService } from '../services/empreendimentos.service'

@Component({
  selector: 'app-empreendimentos',
  templateUrl: './empreendimentos.page.html',
  styleUrls: ['./empreendimentos.page.scss'],
})
export class EmpreendimentosPage implements OnInit {
  public empreendimentos : any = [];

  constructor(
    private navCtrl: NavController,
    private storage: Storage,
    private servEmp: EmpreendimentosService
  ) { }
  
  async ngOnInit() {
    await this.loadEmpreendimentos();
  }

  async loadEmpreendimentos(){
    this.empreendimentos = await this.servEmp.getEmpreendimentosByIdUsu();
    this.empreendimentos = JSON.parse(this.empreendimentos);
  }

  async login(id_empreendimento){
    await this.storage.set('id_empreendimento', id_empreendimento);
    this.navCtrl.navigateRoot('/home');
  }
}
