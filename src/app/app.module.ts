import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { LocalStorageModule } from 'angular-2-local-storage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './start/app.component';

// APPLICATION Services
import { AkiSettingsService } from './services/aki-settings.service';
import { AkiroyaltyRegistrationService } from './services/akiroyalty-registration.service';
import { AkidocumentationWorkmemberdetailsService } from './services/akidocumentation-workmemberdetails.service';
import { AkiroyaltyGenreService } from './services/akiroyalty-genre.service';
import { AkiroyaltyOwnerTypesService } from './services/akiroyalty-ownertypes.service';
import { AkiroyaltyCountriesService } from './services/akiroyalty-countries.service';
import { AkiroyaltyGroupsService } from './services/akiroyalty-groups.service';
import { AkiroyaltyMemberRolesService } from './services/akiroyalty-memberroles.service';
import { AkiroyaltyMemberStatusService } from './services/akiroyalty-memberstatus.service';
import { AkiroyaltyMemberTypesService } from './services/akiroyalty-membertypes.service';
import { AkiroyaltySongCommentCodesService } from './services/akiroyalty-songcommentcodes.service';
import { AkiroyaltyLocationsService } from './services/akiroyalty-locations.service';

import { AkiroyaltyTerritoryCodesService } from './services/akiroyalty-territorycodes.service';



// NAVIGATION Components
import { NavBarTopComponent } from './shared/navbartop/navbartop.component';
import { NavBarBotComponent } from './shared/navbarbot/navbarbot.component';
import { NavSearchComponent } from './shared/navsearch/navsearch.component';
import { NavAddComponent } from './shared/navadd/navadd.component';

// UI Components
import { AgGridModule } from "ag-grid-angular/main";
import { DataGridGenericComponent } from './shared/datagridgeneric/datagridgeneric.component';
import { DataGridEmbededComponent } from './shared/datagridgeneric/datagridembeded.component';
import { DataGridCellBtnEditComponent } from './shared/datagridgeneric/cell/btnedit.component';
import { DataGridCellBtnDelComponent } from './shared/datagridgeneric/cell/btndel.component';
import { DataGridCellBtnMemberComponent } from './shared/datagridgeneric/cell/btnmember.component';
import { DataGridCellDisplayFromLookupComponent } from "./shared/datagridgeneric/cell/displayfromlookup.component";
import { DataGridCellDisplayPercentageComponent } from "./shared/datagridgeneric/cell/displaypercentage.component";

import { RegistationFormComponent } from './shared/forms/registrationform.component';
import { RegistationAddFormComponent } from './shared/forms/registrationaddform.component';
import { MemberFormComponent } from './shared/forms/memberform.component';
import { GenreFormComponent } from './shared/forms/configurationsforms/genreform.component';
import { OwnerTypesFormComponent } from './shared/forms/configurationsforms/ownertypesform.component';
import { CountriesFormComponent } from './shared/forms/configurationsforms/countriesform.component';
import { GroupsFormComponent } from './shared/forms/configurationsforms/groupsform.component';
import { MemberRolesFormComponent } from './shared/forms/configurationsforms/memberrolesform.component';
import { MemberStatusFormComponent } from './shared/forms/configurationsforms/memberstatusform.component';
import { MemberTypesFormComponent } from './shared/forms/configurationsforms/membertypesform.component';
import { SongCommentCodesFormComponent } from './shared/forms/configurationsforms/songcommentcodesform.component';
import { LocationsFormComponent } from './shared/forms/configurationsforms/locationsform.component';
import { TerritoryCodesFormComponent } from './shared/forms/configurationsforms/territorycodesform.component';





import { ModalModule } from 'ngx-bootstrap/modal';


// HOMEPAGE Components
import { HomeComponent } from './home/home.component';
import { LoginFormComponent } from './home/login/login-form.component';
import { RegisterFormComponent } from './home/register/register-form.component';


// DOCUMENTATION Components
import { IndexComponent } from './documentation/index/index.component';
import { MembersComponent } from './documentation/members/members.component';
import { WorksComponent } from './documentation/works/works.component';


// CONFIGURATION Components
import { GenresComponent } from './configurations/genres/genres.component';
import { OwnerTypesComponent } from './configurations/ownershiptypes/ownertypes.component';
import { CountriesComponent } from './configurations/countries/countries.component';
import { GroupsComponent } from './configurations/groups/groups.component';
import { MemberStatusComponent } from './configurations/memberstatus/memberstatus.component';
import { MemberRolesComponent } from './configurations/memberroles/memberroles.component';
import { MemberTypesComponent } from './configurations/membertypes/membertypes.component';
import { SongCommentCodesComponent } from './configurations/songcommentcodes/songcommentcodes.component';
import { LocationsComponent } from './configurations/locations/locations.component';
import { TerritoryCodesComponent } from './configurations/territorycodes/territorycodes.component';
 



// 404 NOT FOUND component
import { ErrorComponent } from './error/error.component';


// APPLICATION routes
import { AppRoutingModule } from './shared/app.routing';


interface Array<T> {
    find(predicate: (search: T) => boolean) : T;
}

@NgModule({
  declarations: [
    AppComponent,
    NavBarTopComponent,
    NavBarBotComponent,
    NavSearchComponent,
    NavAddComponent,
    HomeComponent,
    LoginFormComponent,
    RegisterFormComponent,
    ErrorComponent,
    IndexComponent,
    MembersComponent,
    WorksComponent,
    DataGridGenericComponent,
    DataGridEmbededComponent,
    DataGridCellBtnEditComponent,
    DataGridCellBtnDelComponent,
    DataGridCellBtnMemberComponent,
    DataGridCellDisplayFromLookupComponent,
    DataGridCellDisplayPercentageComponent,
    MemberFormComponent,
    RegistationFormComponent,
    RegistationAddFormComponent,
    GenresComponent,
    GenreFormComponent,
    OwnerTypesComponent,
    OwnerTypesFormComponent,
    CountriesComponent,
    CountriesFormComponent, 
    GroupsComponent, 
    GroupsFormComponent,    
    MemberRolesComponent,
    MemberRolesFormComponent,
    MemberStatusComponent,
    MemberStatusFormComponent,
    MemberTypesComponent, 
    MemberTypesFormComponent,
    SongCommentCodesComponent, 
    SongCommentCodesFormComponent,
    LocationsComponent,
    LocationsFormComponent,
    TerritoryCodesComponent,
    TerritoryCodesFormComponent  
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ModalModule.forRoot(),
    LocalStorageModule.withConfig({
      prefix: 'app-root',
      storageType: 'localStorage'
      }),
    AgGridModule.withComponents([
      DataGridCellBtnEditComponent,
      DataGridCellBtnDelComponent,
      DataGridCellBtnMemberComponent,
      DataGridCellDisplayFromLookupComponent
      ])
  ],
  providers: [
    AkiSettingsService,
    AkiroyaltyRegistrationService,
    AkidocumentationWorkmemberdetailsService,
    AkiroyaltyGenreService,
    AkiroyaltyOwnerTypesService,
    AkiroyaltyCountriesService,
    AkiroyaltyGroupsService,
    AkiroyaltyMemberStatusService,
    AkiroyaltyMemberRolesService,
    AkiroyaltyMemberTypesService,
    AkiroyaltySongCommentCodesService,
    AkiroyaltyLocationsService,
    AkiroyaltyTerritoryCodesService 
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
