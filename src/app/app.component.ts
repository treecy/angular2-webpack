import { Component } from '@angular/core';

import '../public/style/style.scss';
import { ng2BlurThemeComponent } from 'ng2-blur-theme';

@Component({
  selector: 'my-app',
  directives: [ng2BlurThemeComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent { }
