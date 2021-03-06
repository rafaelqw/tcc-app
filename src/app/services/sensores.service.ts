import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { ConnectionConf } from 'config';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class SensoresService {
  private token: any;
  private id_usuario: number;
  private id_empreendimento: number;

  constructor(
    public http: Http,
    public requestOptions: RequestOptions,
    private storage: Storage
  ) {
    this.initialize();
   }

  // Busca o token, id_usuario e id_empreendimento no BD local do celular
  private async initialize(){
    this.token = await this.storage.get('token'); 
    this.id_usuario = await this.storage.get('id_usuario');
    this.id_empreendimento = await this.storage.get('id_empreendimento');
  }

  // Busca os sensores vinculados ao empreendimento via HTTP
  public async getSensores(){
    this.initialize();
    var headers = new Headers();
    headers.append('Content-Type', 'application/json' );
    headers.append('Device', "mobile");
    headers.append('Authorization', 'Bearer ' + this.token);
    let options = new RequestOptions({ headers: headers });
  
    return new Promise((resolve, reject) => {
      this.http.get(ConnectionConf.urlBase + 
        "sensor/empre/"+ this.id_empreendimento , options )
        .subscribe(
          result => {
            resolve(result['_body']);
          }, err => {
            reject(err['_body']);
          }
        )
    });
  }

  // Busca os sensor pelo id via HTTP
  public async getSensoresById(id){
    this.initialize();
    var headers = new Headers();
    headers.append('Content-Type', 'application/json' );
    headers.append('Device', "mobile");
    headers.append('Authorization', 'Bearer ' + this.token);
    let options = new RequestOptions({ headers: headers });
  
    return new Promise((resolve, reject) => {
      this.http.get(ConnectionConf.urlBase + 
        "sensor/id/"+ this.id_empreendimento + "/" + id, options )
        .subscribe(
          result => {
            resolve(result['_body']);
          }, err => {
            reject(err['_body']);
          }
        )
    });
  }

  // Busca os sensores vinculados a um dispostivo via HTTP
  public async getSensoresByDispositivo(id_dispositivo){
    this.initialize();
    var headers = new Headers();
    headers.append('Content-Type', 'application/json' );
    headers.append('Device', "mobile");
    headers.append('Authorization', 'Bearer ' + this.token);
    let options = new RequestOptions({ headers: headers });
  
    return new Promise((resolve, reject) => {
      this.http.get(ConnectionConf.urlBase + 
        "sensor/disp/"+ this.id_empreendimento + "/" + id_dispositivo, options )
        .subscribe(
          result => {
            resolve(result['_body']);
          }, err => {
            reject(err['_body']);
          }
        )
    });
  }

  // Busca os dados do sensor em um periodo de tempo
  public async getDataGraphic(sensor, periodo){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json' );
    headers.append('Device', "mobile");
    headers.append('Authorization', 'Bearer ' + this.token);
    let options = new RequestOptions({ headers: headers });
  
    return new Promise((resolve, reject) => {
      this.http.get(ConnectionConf.urlBase + 
        "registro-sensor/graphic/" + sensor + "/" + periodo , options )
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
