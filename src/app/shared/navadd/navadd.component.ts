import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { AkiSettingsService } from '../../services/aki-settings.service';

@Component({
    selector: 'nav-add',
    templateUrl: './navadd.component.html',
    styleUrls: ['./navadd.component.css']
})

export class NavAddComponent{

  constructor(public akiSettings: AkiSettingsService, private activatedRoute: ActivatedRoute, private router: Router ) {   }

  navigateForAdd(){
    console.log('Add for this route ' + this.activatedRoute.snapshot.url[0].path);
    this.akiSettings.addNewType = 'member';

  }

}
