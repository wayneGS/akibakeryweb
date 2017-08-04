import { Component, OnInit, Output, EventEmitter } from '@angular/core';
// imports for ngform
import { FormBuilder, Validators } from '@angular/forms';


import { AkiSettingsService } from '../../services/aki-settings.service';
import { AkiroyaltyRegistrationService } from '../../services/akiroyalty-registration.service';
// import slide in/out animation
import { slideInOutAnimation } from '../../_animations/index';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registrationform.component.html',
  styleUrls: ['./registrationform.component.css'],
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
export class RegistationFormComponent implements OnInit {
  @Output() saveData = new EventEmitter();

  public rowToEdit:any;
  public rowToEditIndex:number;
  public lk:any = {};
  public formTitle:string = "Test Title";
  public submitting:boolean = false;

  constructor(public akiSettings: AkiSettingsService, public akiroyaltyRegistrationService: AkiroyaltyRegistrationService) { }

  ngOnInit() {
    /*console.log('selectedRow', this.akiSettings.gridSearch);*/

    /*console.log('selectedRow', this.akiSettings.gridSearch[this.akiSettings.currentGrid].selectedRow);*/
    console.log('selectedRow', this.akiSettings.selectedRow);

    /*this.rowToEdit = this.akiSettings.gridSearch[this.akiSettings.currentGrid].searchResults.find(rowToEdit => rowToEdit.registrationid == this.akiSettings.gridSearch[this.akiSettings.currentGrid].selectedRow);*/
    this.rowToEdit = this.akiSettings.searchResults.find(rowToEdit => rowToEdit.registrationid == this.akiSettings.selectedRow);
    /*this.rowToEditIndex = this.akiSettings.gridSearch[this.akiSettings.currentGrid].searchResults.findIndex((element, index, array) => element.registrationid == this.akiSettings.gridSearch[this.akiSettings.currentGrid].selectedRow);*/
    this.rowToEditIndex = this.akiSettings.searchResults.findIndex((element, index, array) => element.registrationid == this.akiSettings.selectedRow);
    console.log('rowToEdit', this.rowToEdit);
    console.log('rowToEditIndex', this.rowToEditIndex);

    this.lk.labels = this.akiSettings.getCache().get(`lookup_Labels`);
    this.lk.genres = this.akiSettings.getCache().get(`lookup_Genres`);
    this.lk.yesno = this.akiSettings.getCache().get(`lookup_YesNo`);
    this.lk.groups = this.akiSettings.getCache().get(`lookup_Groups`);
    this.lk.ownershiptypes = this.akiSettings.getCache().get(`lookup_OwnershipTypes`);
    this.lk.members = this.akiSettings.getCache().get(`lookup_Members`);

  }

  mapToRow(){
    /*this.rowToEdit = this.akiSettings.gridSearch[this.akiSettings.currentGrid].searchResults[this.rowToEditIndex];*/
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
    /*if(this.rowToEditIndex < this.akiSettings.gridSearch[this.akiSettings.currentGrid].searchResults.length){*/
    if(this.rowToEditIndex < this.akiSettings.searchResults.length){
      this.rowToEditIndex++;
      this.mapToRow();
    }
  }

  onSubmit(item){
    this.submitting = true;
    console.log('Submit Change')
    console.log('this.akiSettings.searchResults[this.rowToEditIndex]', this.akiSettings.searchResults[this.rowToEditIndex]);
    console.log('item',item);
    console.log('this.akiSettings.searchResults[this.rowToEditIndex] after merge', this.akiSettings.searchResults[this.rowToEditIndex]);
    //USE SERVICE TO SAVE AND THEN TAKE RETURNED ROW AND REPLACE then emit event to trigger grid refresh
    item.registrationid = this.akiSettings.searchResults[this.rowToEditIndex].registrationid;

    this.akiroyaltyRegistrationService
      .putItem(item)
      .subscribe(data => {
          console.log(data);
          // this.akiSettings.searchResults[this.rowToEditIndex] = returnedSavedRow;
          // this.saveData.emit(this.akiSettings.searchResults[this.rowToEditIndex]);
          alert(`Saved Changes to ${this.rowToEdit.registrationid} ${this.rowToEdit.title}`);

      }, error => {
          this.submitting = false;
          console.log(this.submitting);
          alert(`Could Not Save Changes to ${this.rowToEdit.registrationid} ${this.rowToEdit.title}`);
      });
  }

  deSelectRow(){
    console.log('click to close');
    /*this.akiSettings.gridSearch[this.akiSettings.currentGrid].selectedRow = false;*/
    this.submitting = false;
    this.akiSettings.selectedRow = false;
  }

}
