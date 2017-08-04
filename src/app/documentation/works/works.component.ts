import { Component, OnInit, OnDestroy } from '@angular/core';
import { AkiSettingsService } from '../../services/aki-settings.service';



import { DataGridCellBtnEditComponent } from "../../shared/datagridgeneric/cell/btnedit.component";
import { DataGridCellBtnDelComponent } from "../../shared/datagridgeneric/cell/btndel.component";
import { DataGridCellBtnMemberComponent } from "../../shared/datagridgeneric/cell/btnmember.component";
import { DataGridCellDisplayFromLookupComponent } from "../../shared/datagridgeneric/cell/displayfromlookup.component";



@Component({
  selector: 'app-works',
  templateUrl: './works.component.html',
  styleUrls: ['./works.component.css']
})

export class WorksComponent implements OnInit, OnDestroy {

  public gridComponentSettings:any = {};

  constructor(public akiSettings: AkiSettingsService) { }

  ngOnInit() {
    this.akiSettings.enableSearch = true;
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
            cellRendererFramework: DataGridCellBtnDelComponent,
            width: 32,
            suppressFilter: true,
            suppressSizeToFit:true,
            suppressMovable:true,
            cellStyle: {'text-align':'center',}
        }
    ];
    this.gridComponentSettings.restResourcePath = '/akiroyalty/registration/';
    this.gridComponentSettings.routePathForSearch = 'documentation/works/';
  }

  ngOnDestroy() {
    this.akiSettings.enableSearch = false;
    this.akiSettings.queryParamFromSearch = undefined;
    this.akiSettings.searchResults = [];
  }

}
