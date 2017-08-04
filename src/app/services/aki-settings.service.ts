import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { environment } from '../../environments/environment';

import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
//import { Subject } from 'rxjs/Rx';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { LocalStorageService } from 'angular-2-local-storage';

// Class for lookup data item
class GenericLookup {
  id:number;
  name:string;
}

class GridSearch {
  searchResults: any = [];
  selectedRow: any;
  selectedBtnClicked: any;
}


@Injectable()
export class AkiSettingsService implements CanActivate {


  /*****************************************************************************
  * App Settings
  ****************************************************************************/

  public appFullName: string;
  public appShortName: string;
  public appVersion: number;
  public restBaseUrl: string;
  public authenticationUrl: string;


  /*****************************************************************************
  * App Lookup Rest Urls
  ****************************************************************************/

  public lookupsRestUrls = [
    {name:'Labels', uri:'/akiroyalty', resource:'/labellist'},
    {name:'Genres', uri:'/akidocumentation', resource:'/genretypes'},
    {name:'Groups', uri:'/akidocumentation', resource:'/groups'},
    {name:'YesNo', uri:'/akidocumentation', resource:'/yesno'},
    {name:'OwnershipTypes', uri:'/akidocumentation', resource:'/ownershiptypes'},
    {name:'Members', uri:'/akiroyalty', resource:'/memberlist'}
  ];


  /*****************************************************************************
  * User Settings
  ****************************************************************************/

  public isRegistered: boolean = true;
  public isAuthenticated: boolean = false;
  public lookupsLoaded: boolean = false;

  public akiUser: any;
  public akiToken: any;


  /*****************************************************************************
  * Shared Search Query Params
  ****************************************************************************/

  public queryParamFromSearch: any;


  public enableSearch: boolean = false;
  public allowSearch: boolean = false;
  public currentGrid: string = '';

  // TODO Move these into component init to be a property on gridSearch
  // i.e. gridSearch.registration.searchResults etc
  public searchResults: any = [];
  public selectedRow: any;
  public selectedBtnClicked: any;
  public addNewType: string = '';



  constructor(private router: Router, private http: Http, private localStorageService: LocalStorageService) {

    //get config values in environment file
    this.appFullName = environment.appFullName;
    this.appShortName = environment.appShortName;
    this.appVersion = environment.version;

    this.restBaseUrl = environment.restBaseUrl;
    this.authenticationUrl = environment.authenticationUrl;
    this.akiToken = '';
    this.loadAllLookups();
  }

  /*****************************************************************************
  * Methods for authentication
  ****************************************************************************/
  public register(fullname: string, username:string, password: string){
    let data = {'fullname': fullname,'username': username, 'email': username, 'password':password};

    let authData = this.http
    .post(`${this.authenticationUrl}/signup`, data)
    .subscribe(
      resp => {
        console.log('subscribe', resp.json());
        return true;

      },
      error => {
        console.log(error.json());
        alert('User Registration Failed.');
        return false;
      }

    );
    //*/
    return false;
  }

  public login(username: string, password: string): boolean {
    //* FOR DEV TESTING ONLY
    if(username=='test' && password=='test'){
      this.isAuthenticated = true;
      this.akiUser = {username:'test'};
      //btoa creates a base-64 encoded ASCII string, atob() decodes
      this.akiToken = btoa('testuser' + ':' + 'testpasswd');

      // save to cache
      this.localStorageService.set('akiToken', this.akiToken);
      this.localStorageService.set('akiUser', this.akiUser);

      // navigate to default route for authenticated user
      //this.router.navigate(['default']);
      return true;
    }
    /*/
    let data = {'username': username, 'password':password};

    let authData = this.http
    .post(`${this.authenticationUrl}/authenticate`, data)
    .subscribe(
      resp => {
        console.log('subscribe', resp.json().token);
        this.isAuthenticated = true;
        this.akiUser = {username:username};
        this.akiToken = resp.json().token;
        // save to cache
        this.localStorageService.set('akiToken', this.akiToken);
        this.localStorageService.set('akiUser', this.akiUser);

        // navigate to default route for authenticated user
        //this.router.navigate(['default']);
        return true;

      },
      error => {
        console.log(error.json());
        alert('Invalid Credentials');
        return false;
      }

    );
    //*/
    return false;
  }

  public logout(){
    this.isAuthenticated = false;
    this.akiUser = undefined;
    this.akiToken = undefined;

    // clear cache
    this.localStorageService.remove('akiToken');
    this.localStorageService.remove('akiUser');
    this.clearAllLookups();

    // navigate to home
    this.router.navigate(['']);
  }

  // Method to guard routes
  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;
    return this.verifyLogin(url);
  }

  public verifyLogin(url: string): boolean {
    if (this.isAuthenticated) {
      return true;
    }

    //this.router.navigate(['/']);

    return false;
  }


  public verifyUser() {
    // used when F5/reload done
    this.akiToken = this.localStorageService.get('akiToken');
    this.akiUser = this.localStorageService.get('akiUser');

    if ( this.akiUser && this.akiToken ) {
      this.isAuthenticated = true;
      //this.router.navigate(['/default']);
    } else {
      this.logout();
    }
  }




  /*****************************************************************************
  * Convinience/util Methods
  ****************************************************************************/

  public getCache() {
    return this.localStorageService;
  }

  public getHeaders(){
    // access standard request headers
    let headers = new Headers();
    // append headers for Authorization
    headers.append('Accept', 'application/json');
    headers.append('Authorization', `Bearer ${this.akiToken}`);

    return headers;
  }


  /*****************************************************************************
  * Methods for lookups
  ****************************************************************************/

  private extractAkiGenericLookupData(response: Response): GenericLookup[] {
    // decode the json
    const jsonData = response.json();

    // extract data from python wrappers
    let gl: GenericLookup;
    let listdata = [];
    let data = jsonData.data;

    // normalise lookups to id:'',name:'' format
    for (let i = 0; i < data.length; i++) {
      if(data[i].hasOwnProperty('id') && data[i].attributes.hasOwnProperty('name'))
        gl = {id:data[i].id, name: data[i].attributes.name};

      else if(data[i].hasOwnProperty('id') && data[i].attributes.hasOwnProperty('description'))
        gl = {id:data[i].id, name: data[i].attributes.description};

      else if(data[i].attributes.hasOwnProperty('code') && data[i].attributes.hasOwnProperty('description'))
        gl = {id:data[i].attributes.code, name: data[i].attributes.description};

      else if(data[i].attributes.hasOwnProperty('groupid') && data[i].attributes.hasOwnProperty('maingroupname'))
        gl = {id:data[i].attributes.groupid, name: data[i].attributes.maingroupname};

      else if(data[i].hasOwnProperty('id') && !data[i].attributes.hasOwnProperty('name'))
        gl = {id:data[i].id, name: data[i].attributes.id};

      else if(data[i].attributes.hasOwnProperty('code') && !data[i].attributes.hasOwnProperty('description'))
        gl = {id:data[i].code, name: data[i].attributes.code};

      listdata.push(gl);
    }

    return listdata;
  }

  private extractAkiAuthenticationData(response: Response): GenericLookup[] {
    // decode the json
    const jsonData = response.json();
    console.log('response', response);
    console.log('jsonData', jsonData);
    console.log('jsonData._body.token', jsonData._body.token);
    return jsonData._body.json().token;
  }



  public getLookupData(lookup:string): Observable<GenericLookup[]> {

    let lookupData = this.http
    .get(`${this.restBaseUrl}${lookup}`, {headers: this.getHeaders()})
    .map(this.extractAkiGenericLookupData);

    return lookupData;
  }

  public loadAllLookups(){
    let i = this.lookupsRestUrls.length;
    for(let lookup of this.lookupsRestUrls){
      if(this.getCache().get(`lookup_${lookup.name}`)){
        console.log(`${lookup.name} exists in cache`);
        i--;
        if(i==0){this.lookupsLoaded=true;}
      } else {
        this
        .getLookupData(lookup.uri + lookup.resource)
        .subscribe(
          lookupdata => {
            this.getCache().set(`lookup_${lookup.name}`, lookupdata);
            console.log(`loaded ${lookup.name} from service`);
            i--;
            if(i==0){this.lookupsLoaded=true;}
          },
          resp => {
            console.log(resp);
            i--;
            if(i==0){this.lookupsLoaded=true;}
          }
        );
      }
    }
  }

  public clearAllLookups(){
    let i = this.lookupsRestUrls.length;
    for(let lookup of this.lookupsRestUrls){
      if(this.getCache().get(`lookup_${lookup.name}`)){
        this.getCache().remove(`lookup_${lookup.name}`);
      }
      i--;
    }
  }

}
