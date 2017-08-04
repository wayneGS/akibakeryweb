import { Component, OnInit, Output, EventEmitter } from '@angular/core';
// imports for ngform
import { FormBuilder, Validators } from '@angular/forms';


import { AkiSettingsService } from '../../services/aki-settings.service';
import { AkiroyaltyRegistrationService } from '../../services/akiroyalty-registration.service';
// import slide in/out animation
import { slideInOutAnimation } from '../../_animations/index';

@Component({
  selector: 'app-registration-add-form',
  templateUrl: './registrationaddform.component.html',
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
export class RegistationAddFormComponent implements OnInit {
  @Output() saveData = new EventEmitter();

  public rowToEdit:any;
  public rowToEditIndex:number;
  public lk:any = {};
  public formTitle:string = "Test Title";
  public submitting:boolean = false;

  constructor(public akiSettings: AkiSettingsService, public akiroyaltyRegistrationService: AkiroyaltyRegistrationService) { }

  ngOnInit() {

    this.lk.labels = this.akiSettings.getCache().get(`lookup_Labels`);
    this.lk.genres = this.akiSettings.getCache().get(`lookup_Genres`);
    this.lk.yesno = this.akiSettings.getCache().get(`lookup_YesNo`);
    this.lk.groups = this.akiSettings.getCache().get(`lookup_Groups`);
    this.lk.ownershiptypes = this.akiSettings.getCache().get(`lookup_OwnershipTypes`);
    this.lk.members = this.akiSettings.getCache().get(`lookup_Members`);

  }

  onSubmit(item){
    this.submitting = true;
    console.log('Add New')
    //USE SERVICE TO SAVE AND THEN TAKE RETURNED ROW AND ADD to grid data then emit event to trigger grid refresh
    this.akiroyaltyRegistrationService
      .postItem(item)
      .subscribe(data => {
          console.log(data);
          // this.akiSettings.searchResults[this.rowToEditIndex] = returnedSavedRow;
          // this.saveData.emit(this.akiSettings.searchResults[this.rowToEditIndex]);
          alert('SAVED');
          this.submitting = false;
          this.akiSettings.addNewType = '';
      }, error => {
          this.submitting = false;
          console.log(this.submitting);
          alert(`Could Not Save Changes to ${this.rowToEdit.registrationid} ${this.rowToEdit.title}`);
      });
  }

  close(){
    this.akiSettings.addNewType = '';
  }


}
