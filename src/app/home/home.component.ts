import { Component, OnInit  } from '@angular/core';
import { AkiSettingsService } from '../services/aki-settings.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
  })
  export class HomeComponent {

    constructor(public akiSettings: AkiSettingsService) { }

    ngOnInit() { }

    }
