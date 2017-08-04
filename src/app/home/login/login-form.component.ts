import { Component, OnInit } from '@angular/core';
import { AkiSettingsService } from '../../services/aki-settings.service';


@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})

export class LoginFormComponent implements OnInit {

  // for login form binding
  public credentials = {
    username: '',
    password: ''
  }
  public authInProgress=false;

  constructor(public akiSettings: AkiSettingsService) { }

  ngOnInit() { }

  authenticate(){
    // validate credentials
    this.authInProgress = true;
    this.authInProgress = this.akiSettings.login(this.credentials.username, this.credentials.password);

  }

}

/*

191.237.68.123/akiauthentication/signup

POST

{
  "username":"<email>",
  "password":"",
  "fullname":""
}


191.237.68.123/akiauthentication/authenticate

POST

{
  "username":"<email>",
  "password":""
}

//*/
