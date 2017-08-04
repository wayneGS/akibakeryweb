import { Component, OnInit, OnDestroy, Output, EventEmitter, ViewChild } from '@angular/core';
import { AkiSettingsService } from '../../services/aki-settings.service';
import { AkiroyaltyMemberRolesService } from '../../services/akiroyalty-memberroles.service';

import { DataGridGenericComponent } from "../../shared/datagridgeneric/datagridgeneric.component";
import { DataGridCellBtnEditComponent } from "../../shared/datagridgeneric/cell/btnedit.component";
import { DataGridCellBtnDelComponent } from "../../shared/datagridgeneric/cell/btndel.component";
import { DataGridCellBtnMemberComponent } from "../../shared/datagridgeneric/cell/btnmember.component";
import { DataGridCellDisplayFromLookupComponent } from "../../shared/datagridgeneric/cell/displayfromlookup.component";


@Component({
  selector: 'app-memberroles',
  templateUrl: './memberroles.component.html',
  styleUrls: ['./memberroles.component.css']
})

export class MemberRolesComponent implements OnInit, OnDestroy {
  @Output() refreshGridDataView = new EventEmitter();

  @ViewChild(DataGridGenericComponent)
   private myGrid: DataGridGenericComponent;

  public gridComponentSettings:any = {};
  public mygrid:any;

  constructor(public akiSettings: AkiSettingsService, public akiroyaltyMemberroles: AkiroyaltyMemberRolesService) { }

  ngOnInit() {
    this.akiSettings.enableSearch = false;
    this.akiSettings.currentGrid = this.gridComponentSettings.gridSearchName;

    this.gridComponentSettings.columnDefs = [
        {
            headerName: "Role",
            field: "role", //"id",
            width: 72,
            cellStyle: {'text-align':'right','padding-right':'4px'},
            //filter: 'text',
            suppressSizeToFit:true,
            suppressMovable:true
        },
        {
            headerName: "",
            field: "role", //"id",
            cellRendererFramework: DataGridCellBtnEditComponent,
            width: 32,
            suppressFilter: true,
            suppressSizeToFit:true,
            suppressMovable:true,
            cellStyle: {'text-align':'center',}
        },
        {
            headerName: "",
            field: "role", //"id",
            cellRendererFramework: DataGridCellBtnDelComponent,
            width: 32,
            suppressFilter: true,
            suppressSizeToFit:true,
            suppressMovable:true,
            cellStyle: {'text-align':'center',}
        }

    ];

    this.gridComponentSettings.restResourcePath = '/akidocumentation/memberroles';
    this.gridComponentSettings.routePathForSearch = 'configurations/memberroles/';
    this.gridComponentSettings.gridSearchName = 'configurationsMemberrolesGrid';
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
