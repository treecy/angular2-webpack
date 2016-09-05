import {Component, ViewEncapsulation} from '@angular/core';

import { BaCard } from 'ng2-blur-theme/theme/components';
import { BaCheckbox } from 'ng2-blur-theme/theme/components';

@Component({
  selector: 'report-search',
  encapsulation: ViewEncapsulation.None,
  directives: [BaCard, BaCheckbox],
  templateUrl: './search.component.html'
})

export class SearchComponent {
    isRemember: Boolean
}



