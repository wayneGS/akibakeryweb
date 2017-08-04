import { Component, Input } from '@angular/core';
import { AkiSettingsService } from '../../../services/aki-settings.service';

@Component({
  selector: 'app-datagrid-cell-display-percentage',
  templateUrl: './displaypercentage.component.html',
  styleUrls: ['./displaypercentage.component.css']
})
export class DataGridCellDisplayPercentageComponent {
  public params: any;

  agInit(params: any): void {
      this.params = params;
  }

}
