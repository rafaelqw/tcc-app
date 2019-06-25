import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { ConnectionConf } from 'config';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class EmpreendimentosService {
  private token: any;
  private id_usuario: number;
  private id_empreendimento: number;

  constructor(
    public http: Http,
    public requestOptions: RequestOptions,
    private storage: Storage
  ) { }

  // Busca o token, id_usuario e id_empreendimento no BD local do celular
  private async initialize(){
    this.token = await this.storage.get('token'); 
    this.id_usuario = await this.storage.get('id_usuario');
    //this.id_empreendimento = await this.storage.get('id_empreendimento');
  }

  // Busca os sensor pelo id via HTTP
  public async getEmpreendimentosByIdUsu(){
    await this.initialize();
    var headers = new Headers();
    headers.append('Content-Type', 'application/json' );
    headers.append('Device', "mobile");
    headers.append('Authorization', 'Bearer ' + this.token);
    let options = new RequestOptions({ headers: headers });
  
    return new Promise((resolve, reject) => {
      this.http.get(ConnectionConf.urlBase + 
        "empreendimento/id_usuario/"+ this.id_usuario, options )
        .subscribe(
          result => {
            resolve(result['_body']);
          }, err => {
            reject(err['_body']);
          }
        )
    });
  }
}

