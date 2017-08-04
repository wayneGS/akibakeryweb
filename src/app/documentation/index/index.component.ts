import { Component, OnInit, OnDestroy, Output, EventEmitter, ViewChild } from '@angular/core';
import { AkiSettingsService } from '../../services/aki-settings.service';
import { AkiroyaltyRegistrationService } from '../../services/akiroyalty-registration.service';

import { DataGridGenericComponent } from "../../shared/datagridgeneric/datagridgeneric.component";
import { DataGridCellBtnEditComponent } from "../../shared/datagridgeneric/cell/btnedit.component";
import { DataGridCellBtnDelComponent } from "../../shared/datagridgeneric/cell/btndel.component";
import { DataGridCellBtnMemberComponent } from "../../shared/datagridgeneric/cell/btnmember.component";
import { DataGridCellDisplayFromLookupComponent } from "../../shared/datagridgeneric/cell/displayfromlookup.component";


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})

export class IndexComponent implements OnInit, OnDestroy {
  @Output() refreshGridDataView = new EventEmitter();

  @ViewChild(DataGridGenericComponent)
   private myGrid: DataGridGenericComponent;

  public gridComponentSettings:any = {};
  public mygrid:any;

  constructor(public akiSettings: AkiSettingsService, public akiroyaltyRegistration: AkiroyaltyRegistrationService) { }

  ngOnInit() {
    this.akiSettings.enableSearch = true;
    this.akiSettings.currentGrid = this.gridComponentSettings.gridSearchName;

    this.gridComponentSettings.columnDefs = [
        {
            headerName: "ID",
            field: "registrationid", //"id",
            width: 72,
            cellStyle: {'text-align':'right','padding-right':'4px'},
            filter: 'number',
            suppressSizeToFit:true,
            suppressMovable:true
        },
        {
            headerName: "Writer",
            field: "tempwriter",//"name",
            filter: 'text',
            suppressMovable:true
        },
        {
            headerName: "Catalogue",
            field: "catno",//"name",
            filter: 'text',
            suppressMovable:true
        },
        {
            headerName: "Name",
            field: "title",//"name",
            filter: 'text',
            suppressMovable:true
        },
        {
            headerName: "Label",
            field: "labelid",//"name"
            cellRendererFramework: DataGridCellDisplayFromLookupComponent,
            filter: 'text',
            suppressMovable:true
        },
        {
            headerName: "",
            field: "registrationid", //"id",
            cellRendererFramework: DataGridCellBtnMemberComponent,
            width: 32,
            suppressFilter: true,
            suppressSizeToFit:true,
            suppressMovable:true,
            cellStyle: {'text-align':'center',}
        },
        {
            headerName: "",
            field: "registrationid", //"id",
            cellRendererFramework: DataGridCellBtnEditComponent,
            width: 32,
            suppressFilter: true,
            suppressSizeToFit:true,
            suppressMovable:true,
            cellStyle: {'text-align':'center',}
        },
        {
            headerName: "",
            field: "registrationid", //"id",
            cellRendererFramework: DataGridCellBtnDelComponent,
            width: 32,
            suppressFilter: true,
            suppressSizeToFit:true,
            suppressMovable:true,
            cellStyle: {'text-align':'center',}
        }
    ];
    this.gridComponentSettings.restResourcePath = '/akiroyalty/registration/';
    this.gridComponentSettings.routePathForSearch = 'documentation/index/';
    this.gridComponentSettings.gridSearchName = 'documentationIndexGrid';

    this.akiSettings.searchResults= [];
    this.akiSettings.selectedRow = "";
    this.akiSettings.selectedBtnClicked = "";

  }

  ngOnDestroy() {
    this.akiSettings.enableSearch = false;
    this.akiSettings.queryParamFromSearch = undefined;
    //this.akiSettings.gridSearch.documentationIndexGrid.searchResults = [];
    this.akiSettings.searchResults = [];
  }

  doGridDataViewRefresh( item ){
    this.myGrid.refreshData();
    console.log('doGridDataViewRefresh', item);
  }

}
