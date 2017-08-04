import { Component, OnInit } from '@angular/core';
import { AkiSettingsService } from '../../services/aki-settings.service';
import { Router } from '@angular/router';
import { AppRoutingModule } from '../../shared/app.routing';

@Component({
    selector: 'nav-bar-top',
    templateUrl: './navbartop.component.html',
    styleUrls: ['./navbartop.component.css'],
    providers: [AppRoutingModule]
})

export class NavBarTopComponent implements OnInit {

  public topRightLinkText = 'Register';

  constructor(public akiSettings: AkiSettingsService, private router: Router) {
    akiSettings.verifyUser();
  }

  ngOnInit() { }

  registerUser(){
    this.topRightLinkText = 'Register';
    if(this.akiSettings.isRegistered) {
      this.topRightLinkText = 'Login';
    }
    this.akiSettings.isRegistered = !this.akiSettings.isRegistered;
  }

  logout() {
    this.akiSettings.logout();
  }

}
