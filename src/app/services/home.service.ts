import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { ConnectionConf } from 'config';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private token: any;

  constructor(
    public http: Http,
    public requestOptions: RequestOptions,
    private storage: Storage
  ) { }

  public async saveReceiver(receiver){
    this.token = await this.storage.get('token'); 
    var headers = new Headers();
    headers.append('Content-Type', 'application/json' );
    headers.append('Device', "mobile");
    headers.append('Authorization', 'Bearer ' + this.token);
    let options = new RequestOptions({ headers: headers });
    
    return new Promise((resolve, reject) => {
      this.http.post(ConnectionConf.urlBase + "receiver", receiver, options )
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
