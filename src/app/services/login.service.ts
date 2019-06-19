import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { ConnectionConf } from 'config';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  constructor(
    public http: Http,
    public requestOptions: RequestOptions,
    private storage: Storage
  ) { }
  
  // Faz a verificação do login do usuario via HTTP
  public async login(email:string, senha:string) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json' );
    headers.append('Device', "mobile");
    let options = new RequestOptions({ headers: headers });

    let body = { 
      email: email, 
      senha: senha,
      tokenFCM: await this.storage.get('tokenFCM')
    };

    return new Promise((resolve, reject) => {
      this.http.post(ConnectionConf.urlBase + "autenticacao", body, options )
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
