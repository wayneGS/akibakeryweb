import { Component } from '@angular/core';

@Component({
  selector: 'app-datagrid-cell-btn-del',
  templateUrl: './btndel.component.html',
  styleUrls: ['./btndel.component.css']
})
export class DataGridCellBtnDelComponent {
  public params: any;

  agInit(params: any): void {
      this.params = params;
  }

  showGridRowDetail(s){
    console.log(s);
    confirm(`Delete item with ID ${s}? - TEST`);
  }

}
