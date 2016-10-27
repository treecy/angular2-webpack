import { NgModule }    from '@angular/core';
import { CommonModule }from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BaCard }               from 'ng2-blur-theme/theme/components';
import { BaCheckbox }           from 'ng2-blur-theme/theme/components';
import { Select2Component }     from 'app-components/ng2-select2';
import { RpDatepickerComponent }from 'app-components/rp-datepicker';

import { SearchComponent } from './search.component.ts';

@NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [SearchComponent, Select2Component, RpDatepickerComponent, BaCard],
    exports: [SearchComponent],
})
export class SearchModule {}
