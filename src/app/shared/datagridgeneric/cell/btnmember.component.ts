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

  idToRowNum(s) {
    for(let i=0; i < this.akiSettings.searchResults.length; i++){
      if(this.akiSettings.searchResults[i].registrationid == s){
          return this.akiSettings.searchResults[i];
      }
    }
  }

  showGridRowDetail(s){
    console.log('button param', s);
    this.akiSettings.selectedRow = s;
    this.akiSettings.selectedBtnClicked = 'member';
    this.akiSettings.queryParamFromSearch = s;
    let works = {
      id:s,
      title: this.idToRowNum(s).title
    };
    this.akiSettings.works = works;

    console.log('this.akiSettings.works', this.akiSettings.works);
    this.router.navigate(['documentation/members/'+s]);

  }

}
