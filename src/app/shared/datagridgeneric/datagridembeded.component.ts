import { Component, OnInit, Input } from '@angular/core';
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
  selector: 'app-datagrid-embeded',
  templateUrl: './datagridgeneric.component.html',
  styleUrls: ['./datagridgeneric.component.css'],
  inputs:['queryParamFromSearch']

})

export class DataGridEmbededComponent implements OnInit {
  ngOnInit() {}
  public gridOptions: GridOptions;
/*
  @Input() gridComponentSettings:any;
  @Input() selectedRowParentGrid:string;
  private searchSubscription:any;

  constructor(public akiSettings: AkiSettingsService, private http: Http, private activeRoute: ActivatedRoute,
  private router: Router) {

  }


  ngOnInit() {
    this.akiSettings.gridSearch[this.gridComponentSettings.gridSearchName] = [];
    //this.gridComponentSettings.selectedRowParentGrid
    this.gridOptions = <GridOptions>{};
    this.gridOptions.animateRows = true;
    this.gridOptions.enableFilter = true;
    this.gridOptions.enableSorting = true;
    console.log('this.gridComponentSettings.gridSearchName', this.gridComponentSettings.gridSearchName);
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
    console.log('this.akiSettings.gridSearch', this.akiSettings.gridSearch);
    this.gridOptions.rowData = this.akiSettings.gridSearch[this.gridComponentSettings.gridSearchName].searchResults;

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
    this.gridOptions.api.setRowData(this.akiSettings.gridSearch[this.gridComponentSettings.gridSearchName].searchResults);
    this.gridOptions.api.refreshView();
  }
  public loadData() {
    if(this.akiSettings.queryParamFromSearch != undefined && this.akiSettings.queryParamFromSearch != ''){
      console.log('Load Grid Data From Web Service Call');
      let url = this.akiSettings.restBaseUrl + this.gridComponentSettings.restResourcePath + this.gridComponentSettings.parentGridSelectedRow;
      if( this.gridOptions.api ) this.gridOptions.api.showLoadingOverlay();
      this.http
      .get(url, {headers: this.akiSettings.getHeaders()})
      .map(this.extractAkiData)
      .subscribe(
        serviceData => {
          this.akiSettings.gridSearch[this.gridComponentSettings.gridSearchName].searchResults = serviceData;
          this.gridOptions.api.setColumnDefs(this.loadColumns());
          this.gridOptions.api.setRowData(this.akiSettings.gridSearch[this.gridComponentSettings.gridSearchName].searchResults);
          this.gridOptions.api.refreshView();
          this.gridOptions.api.sizeColumnsToFit();
          if(this.akiSettings.gridSearch[this.gridComponentSettings.gridSearchName].searchResults.length==0) this.gridOptions.api.showNoRowsOverlay()
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
*/
}
