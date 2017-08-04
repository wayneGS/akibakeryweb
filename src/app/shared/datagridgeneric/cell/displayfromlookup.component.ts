import { Component, Input } from '@angular/core';
import { AkiSettingsService } from '../../../services/aki-settings.service';

@Component({
  selector: 'app-datagrid-cell-display-from-lookup',
  templateUrl: './displayfromlookup.component.html',
  styleUrls: ['./displayfromlookup.component.css']
})
export class DataGridCellDisplayFromLookupComponent {
  public params: any;
  public displayValue: any;
  @Input() lookup: string;
  constructor(public akiSettings: AkiSettingsService) { }

  agInit(params: any): void {
      this.params = params;
      this.displayValue = this.akiSettings.getCache().get(`lookup_Labels`)[params.value] || {name:''};
  }

}
