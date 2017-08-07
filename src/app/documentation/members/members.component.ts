import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { AkiSettingsService } from '../../services/aki-settings.service';

import { DataGridGenericComponent } from "../../shared/datagridgeneric/datagridgeneric.component";
import { DataGridCellBtnEditComponent } from "../../shared/datagridgeneric/cell/btnedit.component";
import { DataGridCellBtnDelComponent } from "../../shared/datagridgeneric/cell/btndel.component";
import { DataGridCellBtnMemberComponent } from "../../shared/datagridgeneric/cell/btnmember.component";
import { DataGridCellDisplayFromLookupComponent } from "../../shared/datagridgeneric/cell/displayfromlookup.component";
import { DataGridCellDisplayPercentageComponent } from "../../shared/datagridgeneric/cell/displaypercentage.component";


@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css'],
})

export class MembersComponent implements OnInit, OnDestroy {
  @ViewChild(DataGridGenericComponent)
  private myGrid: DataGridGenericComponent;

  public gridComponentSettings:any = {};
  public rowToEdit:any;
  public rowToEditIndex:number;
  public lk:any = {};

  constructor(public akiSettings: AkiSettingsService) { }

  ngOnInit() {

    this.akiSettings.currentGrid = this.gridComponentSettings.gridSearchName;

    this.gridComponentSettings.columnDefs = [
        {
            headerName: "Performer ID",
            field: "performerid", //"id",
            width: 72,
            cellStyle: {'text-align':'right','padding-right':'4px'},
            filter: 'number',
            suppressSizeToFit:true,
            suppressMovable:true
        },
        {
            headerName: "Instrument",
            field: "instrument",//"name",
            filter: 'text',
            suppressMovable:true
        },
        {
            headerName: "User",
            field: "userid",//"name",
            filter: 'text',
            suppressMovable:true
        },
        {
            headerName: "Performer",
            field: "performerid",//"name",
            cellRendererFramework: DataGridCellDisplayFromLookupComponent,
            filter: 'text',
            suppressMovable:true
        },
        {
            headerName: "Percent Amount",
            field: "percentamount",
            //cellRendererFramework: DataGridCellDisplayPercentageComponent,
            filter: 'number',
            editable: true,
            suppressMovable:true
        },
        {
            headerName: "",
            field: "performerid", //"id",
            cellRendererFramework: DataGridCellBtnEditComponent,
            width: 32,
            suppressFilter: true,
            suppressSizeToFit:true,
            suppressMovable:true,
            cellStyle: {'text-align':'center',}
        },
        {
            headerName: "",
            field: "performerid", //"id",
            cellRendererFramework: DataGridCellBtnDelComponent,
            width: 32,
            suppressFilter: true,
            suppressSizeToFit:true,
            suppressMovable:true,
            cellStyle: {'text-align':'center',}
        }
    ];
    this.gridComponentSettings.restResourcePath = '/akidocumentation/workmemberdetails/';
    this.gridComponentSettings.routePathForSearch = 'documentation/members/';
    this.gridComponentSettings.gridSearchName = 'documentationMembersGrid';

    this.akiSettings.searchResults= [];
    this.akiSettings.selectedRow = "";
    this.akiSettings.selectedBtnClicked = "";

    console.log(this.akiSettings.searchResults);
  }

  ngOnDestroy() { }

  mapToRow(){
    /*this.rowToEdit = this.akiSettings.searchResults[this.rowToEditIndex];
    this.akiSettings.selectedRow = this.rowToEdit.registrationid;*/
  }

  selectPreviousRow() {
    if(this.rowToEditIndex > 0){
      this.rowToEditIndex--;
      this.mapToRow();
    }
  }

  selectNextRow() {
    if(this.rowToEditIndex < this.akiSettings.searchResults.length){
      this.rowToEditIndex++;
      this.mapToRow();
    }
  }


  onSubmit(){
    console.log('Submit Change')
    this.deSelectRow();
  }

  deSelectRow(){
    console.log('click to close');
    this.akiSettings.selectedRow = false;
  }

  // add custom rows to grid
  addRowsToGrid(){
    let totalPercentageAmount=0;
    for(let i=0; i<this.akiSettings.searchResults.length; i++){
      totalPercentageAmount += this.akiSettings.searchResults[i].percentamount;
    }
    let summaryRow = {percentamount:totalPercentageAmount};
    this.akiSettings.searchResults.push(summaryRow);
    console.log('this.akiSettings.searchResults', this.akiSettings.searchResults);
    this.myGrid.refreshView();
  }
}
