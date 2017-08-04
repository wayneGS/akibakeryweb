import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeComponent } from '../home/home.component';
import { ErrorComponent } from '../error/error.component';

import { IndexComponent } from '../documentation/index/index.component';
import { WorksComponent } from '../documentation/works/works.component';
import { MembersComponent } from '../documentation/members/members.component';
import { GenresComponent } from '../configurations/genres/genres.component';
import { OwnerTypesComponent } from '../configurations/ownershiptypes/ownertypes.component';
import { CountriesComponent } from '../configurations/countries/countries.component';

import { GroupsComponent } from '../configurations/groups/groups.component';

import { MemberRolesComponent } from '../configurations/memberroles/memberroles.component';
import { MemberStatusComponent } from '../configurations/memberstatus/memberstatus.component';
import { MemberTypesComponent } from '../configurations/membertypes/membertypes.component';
import { LocationsComponent } from '../configurations/locations/locations.component';
import { SongCommentCodesComponent } from '../configurations/songcommentcodes/songcommentcodes.component';
import { TerritoryCodesComponent } from '../configurations/territorycodes/territorycodes.component';
//{ path: 'configurations/territorycodes' , component: TerritoryCodesComponent},

@NgModule({
    imports: [
        RouterModule.forRoot([
          { path: 'home', component: HomeComponent},
          { path: 'documentation/index/:query' , component: IndexComponent},
          { path: 'documentation/index' , component: IndexComponent},
          { path: 'documentation/works/:query' , component: WorksComponent},
          { path: 'documentation/works' , component: WorksComponent},
          { path: 'documentation/members/:query' , component: MembersComponent},

          { path: 'configurations/genres' , component: GenresComponent},
          { path: 'configurations/ownertypes' , component: OwnerTypesComponent},
          { path: 'configurations/countries' , component: CountriesComponent},

          { path: 'configurations/groups' , component: GroupsComponent},
          { path: 'configurations/memberroles' , component: MemberRolesComponent},
          { path: 'configurations/memberstatus' , component: MemberStatusComponent},

          { path: 'configurations/membertypes' , component: MemberTypesComponent},
          { path: 'configurations/locations' , component: LocationsComponent},
          { path: 'configurations/songcommentcodes' , component: SongCommentCodesComponent},
          { path: 'configurations/locations' , component: LocationsComponent},
          { path: 'configurations/territorycodes' , component: TerritoryCodesComponent },
          
          { path: 'documentation' ,     redirectTo: 'documentation/index',pathMatch: 'full'},

          { path: '' , component: HomeComponent},
          { path: '**' , component: ErrorComponent }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}

