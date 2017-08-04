import { Component, OnInit, OnDestroy, Output, EventEmitter, ViewChild } from '@angular/core';
import { AkiSettingsService } from '../../services/aki-settings.service';
import { AkiroyaltySongCommentCodesService } from '../../services/akiroyalty-songcommentcodes.service';

import { DataGridGenericComponent } from "../../shared/datagridgeneric/datagridgeneric.component";
import { DataGridCellBtnEditComponent } from "../../shared/datagridgeneric/cell/btnedit.component";
import { DataGridCellBtnDelComponent } from "../../shared/datagridgeneric/cell/btndel.component";
import { DataGridCellBtnMemberComponent } from "../../shared/datagridgeneric/cell/btnmember.component";
import { DataGridCellDisplayFromLookupComponent } from "../../shared/datagridgeneric/cell/displayfromlookup.component";


@Component({
  selector: 'app-songcommentcodes',
  templateUrl: './songcommentcodes.component.html',
  styleUrls: ['./songcommentcodes.component.css']
})

export class SongCommentCodesComponent implements OnInit, OnDestroy {
  @Output() refreshGridDataView = new EventEmitter();

  @ViewChild(DataGridGenericComponent)
   private myGrid: DataGridGenericComponent;

  public gridComponentSettings:any = {};
  public mygrid:any;

  constructor(public akiSettings: AkiSettingsService, public akiroyaltySongcommentcodes: AkiroyaltySongCommentCodesService) { }

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
            field: "description",//"name",
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

    this.gridComponentSettings.restResourcePath = '/akidocumentation/songcommentcodes';
    this.gridComponentSettings.routePathForSearch = 'configurations/songcommentcodes/';
    this.gridComponentSettings.gridSearchName = 'configurationsSongcommentcodessGrid';
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
