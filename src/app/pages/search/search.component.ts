import {Component, ViewEncapsulation} from '@angular/core';

import { BaCard } from 'ng2-blur-theme/theme/components';
import { BaCheckbox } from 'ng2-blur-theme/theme/components';

import { Select2Component } from '../../components/ng2-select2';

@Component({
  selector: 'report-search',
  encapsulation: ViewEncapsulation.None,
  directives: [BaCard, BaCheckbox, Select2Component],
  templateUrl: './search.component.html'
})

export class SearchComponent {
    optionList: Object[] = [{
        "account_id": "1111",
        "account_name": "test1"
    },{
        "account_id": "2222",
        "account_name": "test2"
    }]
}



