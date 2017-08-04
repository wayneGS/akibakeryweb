import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { AkiSettingsService } from '../../services/aki-settings.service';

import { ModalModule } from 'ngx-bootstrap/modal';
import { GridOptions } from "ag-grid";
import { DataGridCellBtnEditComponent } from "./cell/btnedit.component";
import { DataGridCellBtnDelComponent } from "./cell/btndel.component";
import { DataGridCellBtnMemberComponent } from "./cell/btnmember.component";
import { DataGridCellDisplayFromLookupComponent } from "./cell/displayfromlookup.component";

import { environment } from '../../../environments/environment';

import { Http, Response, RequestOptions, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
//import { Subject } from 'rxjs/Rx';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';


@Component({
  selector: 'app-datagrid-generic',
  templateUrl: './datagridgeneric.component.html',
  styleUrls: ['./datagridgeneric.component.css'],
  inputs:['queryParamFromSearch']

})

export class DataGridGenericComponent implements OnInit {

  @Input() gridComponentSettings:any;

  public gridOptions: GridOptions;
  private searchSubscription:any;
  private autoSearch: Boolean = false;

  constructor(public akiSettings: AkiSettingsService, private http: Http, private activeRoute: ActivatedRoute,
  private router: Router) {

  }


  ngOnInit() {
    this.gridOptions = <GridOptions>{};
    this.gridOptions.animateRows = true;
    this.gridOptions.enableFilter = true;
    this.gridOptions.enableSorting = true;


    this.gridOptions.overlayLoadingTemplate = `
      <div class="mb-0 d-flex align-items-center flex-column justify-content-center">
        <div class="progress" style="width: 30%">
          <div class="progress-bar progress-bar-striped bg-success progress-bar-animated" style="width: 100%">Searching...</div>
        </div>
      </div>`;
    this.gridOptions.overlayNoRowsTemplate = `<span class="ag-overlay-loading-center alert alert-info;">No results for query.</span>`;
    this.gridOptions.onGridReady = () => { if(this.akiSettings.allowSearch) this.gridOptions.api.showLoadingOverlay(); };
    this.gridOptions.rowSelection = 'single';

    this.gridOptions.suppressCellSelection = true;
    this.gridOptions.suppressTouch  = true;

    /*this.gridOptions.rowData = this.akiSettings.gridSearch[this.gridComponentSettings.gridSearchName].searchResults;*/
    this.gridOptions.rowData = this.akiSettings.searchResults;
    console.log('this.activeRoute.params')
    this.activeRoute.params
      .map(
        params => params['query']
      )
      .do(
        query => this.akiSettings.queryParamFromSearch = query
      )
      .subscribe(
        query => {
          this.loadData();
        }
      );

      this.autoSearch = this.gridComponentSettings.autoSearch || false;
      if(this.autoSearch) {
        this.loadData();
      }
  }

  ngOnDestroy() {
    if(this.searchSubscription != null) {
      this.searchSubscription.unsubscribe();
    }
  }

  public loadColumns() {
    return this.gridComponentSettings.columnDefs;
  }

  public refreshData(){
    /*this.gridOptions.api.setRowData(this.akiSettings.gridSearch[this.gridComponentSettings.gridSearchName].searchResults);*/
    this.gridOptions.api.setRowData(this.akiSettings.searchResults);
    this.gridOptions.api.refreshView();
  }
  public loadData() {
    if (this.autoSearch){
      console.log('Load Grid Data From Web Service Call');
      let url = this.akiSettings.restBaseUrl + this.gridComponentSettings.restResourcePath;
      console.log(url);
      if( this.gridOptions.api ) this.gridOptions.api.showLoadingOverlay();
      this.http
      .get(url, {headers: this.akiSettings.getHeaders()})
      .map(this.extractAkiData)
      .subscribe(
        serviceData => {
          /*this.akiSettings.gridSearch[this.gridComponentSettings.gridSearchName].searchResults = serviceData;*/
          this.akiSettings.searchResults = serviceData;
          this.gridOptions.api.setColumnDefs(this.loadColumns());
          /*this.gridOptions.api.setRowData(this.akiSettings.gridSearch[this.gridComponentSettings.gridSearchName].searchResults);*/
          this.gridOptions.api.setRowData(this.akiSettings.searchResults);
          this.gridOptions.api.refreshView();
          this.gridOptions.api.sizeColumnsToFit();
          /*if(this.akiSettings.gridSearch[this.gridComponentSettings.gridSearchName].searchResults.length==0) this.gridOptions.api.showNoRowsOverlay()*/
          if(this.akiSettings.searchResults.length==0) this.gridOptions.api.showNoRowsOverlay()
          else this.gridOptions.api.hideOverlay();

        },
        resp => {
          console.log(resp);
          alert('Error accessing the Rest server.');
          this.gridOptions.api.hideOverlay();
        }
      );
    }else if(this.akiSettings.queryParamFromSearch != undefined && this.akiSettings.queryParamFromSearch != '' && this.akiSettings.queryParamFromSearch.length > 0){
      console.log('Load Grid Data From Web Service Call');
      let url = this.akiSettings.restBaseUrl + this.gridComponentSettings.restResourcePath + this.akiSettings.queryParamFromSearch;
      console.log(url);
      if( this.gridOptions.api ) this.gridOptions.api.showLoadingOverlay();
      this.http
      .get(url, {headers: this.akiSettings.getHeaders()})
      .map(this.extractAkiData)
      .subscribe(
        serviceData => {
          /*this.akiSettings.gridSearch[this.gridComponentSettings.gridSearchName].searchResults = serviceData;*/
          this.akiSettings.searchResults = serviceData;
          this.gridOptions.api.setColumnDefs(this.loadColumns());
          /*this.gridOptions.api.setRowData(this.akiSettings.gridSearch[this.gridComponentSettings.gridSearchName].searchResults);*/
          this.gridOptions.api.setRowData(this.akiSettings.searchResults);
          this.gridOptions.api.refreshView();
          this.gridOptions.api.sizeColumnsToFit();
          /*if(this.akiSettings.gridSearch[this.gridComponentSettings.gridSearchName].searchResults.length==0) this.gridOptions.api.showNoRowsOverlay()*/
          if(this.akiSettings.searchResults.length==0) this.gridOptions.api.showNoRowsOverlay()
          else this.gridOptions.api.hideOverlay();

        },
        resp => {
          console.log(resp);
          alert('Error accessing the Rest server.');
          this.gridOptions.api.hideOverlay();
        }
      );
    }
  }

  private extractAkiData(response: Response) {
    // decode the json
    const jsonData = response.json();

    // extract data from python wrappers
    let listdata = [];
    let data = jsonData.data;

    for (let i = 0; i < data.length; i++) {
      listdata.push(data[i].attributes);
    }

    return listdata;
  }

}
