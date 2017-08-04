import { Component } from '@angular/core';

@Component({
  selector: 'app-datagrid-cell-red',
  templateUrl: './datagridcellred.component.html',
  styleUrls: ['./datagridcellred.component.css']
})
export class DatagridcellredComponent {
  private params: any;

  agInit(params: any): void {
      this.params = params;
  }

  hello(s){
    console.log(s);
  }

}
