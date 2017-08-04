import { Injectable } from '@angular/core';
import { AkiSettingsService } from './aki-settings.service';

import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
//import { Subject } from 'rxjs/Rx';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';



@Injectable()
export class AkiroyaltySongCommentCodesService {


  /*****************************************************************************
  * Service Settings
  ****************************************************************************/

  public restResourcePath: string = '/akidocumentation';
  public resource: string = '/ownershiptypes';

  constructor(public akiSettings: AkiSettingsService, private http: Http) {}

  /*****************************************************************************
  * Service CRUD
  ****************************************************************************/

  private getRestPathUri():string {
    return this.restResourcePath + this.resource;
  }

  private extractAkiData(response: Response) {
    // decode the json
    const jsonData = response.json();

    // extract data from python wrappers
    let akidata = [];
    let data = jsonData.data;

    // normalise lookups to id:'',name:'' format
    for (let i = 0; i < data.length; i++) {
      let item  = {id:data[i].code, name: data[i].attributes.description};
      akidata.push(item);
    }

    return akidata;
  }

  private wrapAkiData(attributes: any) {
    // decode the json
  //  const jsonData = item.json();

    // put data in python wrappers
    let akidata = {
      data: {
        attributes
      }
    };

    return akidata;
  }


  public getItem(id:string) {

    let lookupData = this.http
    .get(`${this.akiSettings.restBaseUrl}${this.getRestPathUri()}`, {headers: this.akiSettings.getHeaders()})
    .map(this.extractAkiData);

    return lookupData;
  }

  public postItem(item) {
    let data = this.wrapAkiData(item);
    return this.http
    .post(`${this.akiSettings.restBaseUrl}${this.getRestPathUri()}`, data, {headers: this.akiSettings.getHeaders()})
    .map(this.extractAkiData);
  }

  public putItem(item) {
    let id = item.registrationid;
    let data = this.wrapAkiData(item);
    return this.http
    .put(`${this.akiSettings.restBaseUrl}${this.getRestPathUri()}/${id}`, data, {headers: this.akiSettings.getHeaders()})
    .map(this.extractAkiData);
  }


  public deleteItem(id:string) {

    let lookupData = this.http
    .delete(`${this.akiSettings.restBaseUrl}${this.getRestPathUri()}`, {headers: this.akiSettings.getHeaders()});

    //return lookupData;
  }


}
