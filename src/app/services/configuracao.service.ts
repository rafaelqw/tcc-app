import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ConnectionConf } from 'config';
import { Http, RequestOptions, Headers } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracaoService {

  private token: any;
  private id_usuario: number;
  private registration_id: any;

  constructor(
    public http: Http,
    public requestOptions: RequestOptions,
    private storage: Storage
  ) { }

  async initialize(){
    this.token = await this.storage.get('token'); 
    this.id_usuario = await this.storage.get('id_usuario');
    this.registration_id = await this.storage.get('tokenFCM');
  }

  async getReceiver(){
    await this.initialize();
    this.registration_id = "fbhtJl14WqU:APA91bFKngMmxYKNfShpGWGSBX95hYpGiiHMUciZnIFVJ1MgNpgqRtKeG5bbLCLKfA082gLFFJu1gU1ZiW9H8ifbTSnpHhwRPE0I46lEc_ikAxE-akMip61k9OBhN_nH4UyKyT1zu5t-";
    var headers = new Headers();
    headers.append('Content-Type', 'application/json' );
    headers.append('Device', "mobile");
    headers.append('Authorization', 'Bearer ' + this.token);
    let options = new RequestOptions({ headers: headers });
  
    return new Promise((resolve, reject) => {
      this.http.get(ConnectionConf.urlBase + 
        "receiver/" + this.id_usuario + "/" + this.registration_id , options )
        .subscribe(
          result => {
            resolve(result['_body']);
          }, err => {
            reject(err['_body']);
          }
        )
    });
  }

  async putReceiver(body){
    await this.initialize();
    this.registration_id = "fbhtJl14WqU:APA91bFKngMmxYKNfShpGWGSBX95hYpGiiHMUciZnIFVJ1MgNpgqRtKeG5bbLCLKfA082gLFFJu1gU1ZiW9H8ifbTSnpHhwRPE0I46lEc_ikAxE-akMip61k9OBhN_nH4UyKyT1zu5t-";
    var headers = new Headers();
    headers.append('Content-Type', 'application/json' );
    headers.append('Device', "mobile");
    headers.append('Authorization', 'Bearer ' + this.token);
    let options = new RequestOptions({ headers: headers });
    
    
    return new Promise((resolve, reject) => {
      this.http.put(ConnectionConf.urlBase + 
        "receiver", body , options )
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
