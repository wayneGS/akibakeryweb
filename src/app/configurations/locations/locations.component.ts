import { Component, OnInit, OnDestroy, Output, EventEmitter, ViewChild } from '@angular/core';
import { AkiSettingsService } from '../../services/aki-settings.service';
import { AkiroyaltyLocationsService } from '../../services/akiroyalty-locations.service';

import { DataGridGenericComponent } from "../../shared/datagridgeneric/datagridgeneric.component";
import { DataGridCellBtnEditComponent } from "../../shared/datagridgeneric/cell/btnedit.component";
import { DataGridCellBtnDelComponent } from "../../shared/datagridgeneric/cell/btndel.component";
import { DataGridCellBtnMemberComponent } from "../../shared/datagridgeneric/cell/btnmember.component";
import { DataGridCellDisplayFromLookupComponent } from "../../shared/datagridgeneric/cell/displayfromlookup.component";


@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})

export class LocationsComponent implements OnInit, OnDestroy {
  @Output() refreshGridDataView = new EventEmitter();

  @ViewChild(DataGridGenericComponent)
   private myGrid: DataGridGenericComponent;

  public gridComponentSettings:any = {};
  public mygrid:any;

  constructor(public akiSettings: AkiSettingsService, public akiroyaltyLocations: AkiroyaltyLocationsService) { }

  ngOnInit() {
    this.akiSettings.enableSearch = false;
    this.akiSettings.currentGrid = this.gridComponentSettings.gridSearchName;

    this.gridComponentSettings.columnDefs = [
        {
            headerName: "Code",
            field: "code", //"id",
            width: 72,
            cellStyle: {'text-align':'right','padding-right':'4px'},
            //filter: 'text',
            suppressSizeToFit:true,
            suppressMovable:true
        },
        {
            headerName: "Description",
            field: "location",//"name",
            filter: 'text',
            suppressMovable:true
        },
        {
            headerName: "",
            field: "code", //"id",
            cellRendererFramework: DataGridCellBtnEditComponent,
            width: 32,
            suppressFilter: true,
            suppressSizeToFit:true,
            suppressMovable:true,
            cellStyle: {'text-align':'center',}
        },
        {
            headerName: "",
            field: "code", //"id",
            cellRendererFramework: DataGridCellBtnDelComponent,
            width: 32,
            suppressFilter: true,
            suppressSizeToFit:true,
            suppressMovable:true,
            cellStyle: {'text-align':'center',}
        }

    ];

    this.gridComponentSettings.restResourcePath = '/akidocumentation/locations';
    this.gridComponentSettings.routePathForSearch = 'configurations/locations/';
    this.gridComponentSettings.gridSearchName = 'configurationsLocationssGrid';
    this.gridComponentSettings.autoSearch = true;
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
