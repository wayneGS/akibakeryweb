import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AkiSettingsService } from '../../../services/aki-settings.service';

@Component({
  selector: 'app-datagrid-cell-btn-member',
  templateUrl: './btnmember.component.html',
  styleUrls: ['./btnmember.component.css']
})
export class DataGridCellBtnMemberComponent {
  public params: any;
  constructor(public akiSettings: AkiSettingsService, private router: Router) { }

  agInit(params: any): void {
      this.params = params;
  }

  showGridRowDetail(s){
    console.log('button param', s);
    this.akiSettings.selectedRow = s;
    this.akiSettings.selectedBtnClicked = 'member';
    this.akiSettings.queryParamFromSearch = s;
    this.router.navigate(['documentation/members/'+s]);

  }

}
