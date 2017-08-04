import { Component } from '@angular/core';
import { AkiSettingsService } from '../../../services/aki-settings.service';

@Component({
  selector: 'app-datagrid-cell-btn-edit',
  templateUrl: './btnedit.component.html',
  styleUrls: ['./btnedit.component.css']
})
export class DataGridCellBtnEditComponent {
  public params: any;
  constructor(public akiSettings: AkiSettingsService) { }

  agInit(params: any): void {
      this.params = params;
  }

  showGridRowDetail(s){
    this.akiSettings.selectedRow = s;
    //this.akiSettings.gridSearch[this.akiSettings.currentGrid].selectedRow=s;

    this.akiSettings.selectedBtnClicked = 'edit';
  }

}
