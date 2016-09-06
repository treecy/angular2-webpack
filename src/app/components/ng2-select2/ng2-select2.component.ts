import { Component, Directive, ElementRef, Input } from '@angular/core';

// declare var require:(moduleId:string) => any;
var jQuery = require("jquery");
var select2 = require("./select2/select2.js");

@Directive({selector: '[mySelect2]'})
class Select2Directive {
    
    constructor(el: ElementRef) {
        jQuery(el.nativeElement).select2();
    }
}

@Component({
    selector: 'ng2-select2',
    styleUrls: ['./select2/select2.css'],
    directives: [Select2Directive],
    template: `
        <select mySelect2>
            <ng-content></ng-content>
        </select>
        `
})

export class Select2Component {
    @Input()
    optionList: Object[]

    constructor() {}
}