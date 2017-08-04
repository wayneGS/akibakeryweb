import { Component, OnInit } from '@angular/core';
import { AkiSettingsService } from '../../services/aki-settings.service';
// import slide in/out animation
import { slideInOutAnimation } from '../../_animations/index';

@Component({
  selector: 'register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css'],
  // make slide in/out animation available to this component
  animations: [slideInOutAnimation],

// attach the slide in/out animation to the host (root) element of this component
host: { '[@slideInOutAnimation]': '' }
})
export class RegisterFormComponent implements OnInit {

  constructor(public akiSettings: AkiSettingsService) { }

  ngOnInit() { }

}
