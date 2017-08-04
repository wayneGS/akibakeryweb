import { Component, OnInit } from '@angular/core';
import { AkiSettingsService } from '../../services/aki-settings.service';
// import slide in/out animation
import { slideInOutAnimation } from '../../_animations/index';

@Component({
  selector: 'app-testform',
  templateUrl: './testform.component.html',
  styleUrls: ['./testform.component.css'],
    // make slide in/out animation available to this component
    animations: [slideInOutAnimation],

  // attach the slide in/out animation to the host (root) element of this component
  host: { '[@slideInOutAnimation]': '' },
  styles: [
    'div.notamodal {width: auto;max-width: auto;}',
    'div.notamodal .form-control{ font-size:10pt;}',
    'div.notamodal .form-control select { font-size:10pt;}',
    'div.notamodal .form-control option { font-size:10pt;}',
    'div.notamodal label {font-size:8pt;}',
    'div.notamodal .form-group {margin-bottom: 0;margin-top: 0;}',
    'div.notamodal .modal-lg {width: 100%;max-width: 100%;}',
    'div.notamodal .table td {border-top:none;padding:0 0.75em 5px 0.75em}'
    ]

})
export class TestformComponent implements OnInit {

  public rowToEdit:any;
  public rowToEditIndex:number;
  public lk:any = {};
  public formTitle:string = "Test Title";
  constructor(public akiSettings: AkiSettingsService) { }

  ngOnInit() {
    console.log('selectedRow', this.akiSettings.selectedRow);

    this.rowToEdit = this.akiSettings.searchResults.find(rowToEdit => rowToEdit.registrationid == this.akiSettings.selectedRow);
    this.rowToEditIndex = this.akiSettings.searchResults.findIndex((element, index, array) => element.registrationid == this.akiSettings.selectedRow);
    console.log('rowToEdit', this.rowToEdit.title);
    console.log('rowToEditIndex', this.rowToEditIndex);

    this.lk.labels = this.akiSettings.getCache().get(`lookup_Labels`);
    this.lk.genres = this.akiSettings.getCache().get(`lookup_Genres`);
    this.lk.yesno = this.akiSettings.getCache().get(`lookup_YesNo`);
    this.lk.groups = this.akiSettings.getCache().get(`lookup_Groups`);
    this.lk.ownershiptypes = this.akiSettings.getCache().get(`lookup_OwnershipTypes`);
    this.lk.members = this.akiSettings.getCache().get(`lookup_Members`);

  }

  mapToRow(){
    this.rowToEdit = this.akiSettings.searchResults[this.rowToEditIndex];
    this.akiSettings.selectedRow = this.rowToEdit.registrationid;
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

}
