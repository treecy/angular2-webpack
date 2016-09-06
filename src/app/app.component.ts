import { Component } from '@angular/core';

import '../public/style/style.scss';
import { ng2BlurThemeComponent } from 'ng2-blur-theme';
import { BaContentTop } from 'ng2-blur-theme/theme/components';



@Component({
  selector: 'my-app',
  directives: [ng2BlurThemeComponent, BaContentTop],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent { 
    pageTitle:string = "YDN レポート"
}
