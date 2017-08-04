import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { AkiSettingsService } from '../../services/aki-settings.service';

@Component({
    selector: 'nav-search',
    templateUrl: './navsearch.component.html',
    styleUrls: ['./navsearch.component.css']
})

export class NavSearchComponent{

  constructor(public akiSettings: AkiSettingsService, private activatedRoute: ActivatedRoute, private router: Router ) {   }


  validateSearch(){
    if(this.akiSettings.queryParamFromSearch.length > 2){
      this.akiSettings.allowSearch = true;
    } else {
      this.akiSettings.allowSearch = false;
    }
  }

  navigateForSearch(){
    this.validateSearch()
    if(this.akiSettings.allowSearch)
      if(this.activatedRoute.snapshot.url.length != undefined){
        let ulen = this.activatedRoute.snapshot.url.length;
        let p = '';
        if (ulen >= 2)
          p +=  this.activatedRoute.snapshot.url[0].path + '/' + this.activatedRoute.snapshot.url[1].path;
        else
          p +=  this.activatedRoute.snapshot.url[0].path + '/';

        this.router.navigate([p, this.akiSettings.queryParamFromSearch]);

      } else {
        this.router.navigate(['documentation/index/', this.akiSettings.queryParamFromSearch]);
      }
  }

}
