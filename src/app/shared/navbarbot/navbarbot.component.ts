import { Component, OnInit } from '@angular/core';
import { AkiSettingsService } from '../../services/aki-settings.service';

@Component({
  selector: 'nav-bar-bot',
  templateUrl: './navbarbot.component.html',
  styleUrls: ['./navbarbot.component.css']
})
export class NavBarBotComponent implements OnInit {

  constructor(public akiSettings: AkiSettingsService) { }

  ngOnInit() { }

}
