import { 
    Component, Directive, ElementRef,
    OnInit, OnChanges, AfterViewChecked, Output, Input, 
    ViewEncapsulation, EventEmitter} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

// declare var require:(moduleId:string) => any;
var jQuery = require("jquery");
import "./select2/select2.js";


@Directive({selector: '[mySelect2]'})

class Select2Directive implements AfterViewChecked {
    private select2Instance:any;
    
    constructor(private selectRef: ElementRef) {}

    ngAfterViewChecked(){
        var me = this;
        var container = me.selectRef.nativeElement;
        if(container.value != '' && !me.select2Instance){
            me.select2Instance = jQuery(container).select2({
                minimumResultsForSearch: Infinity
            }).on('select2:select', (event:any) =>{
                var evt = document.createEvent("HTMLEvents");
                evt.initEvent("change", false, true);
                container.dispatchEvent(evt);
            });
        }
    }
}

@Component({
    selector: 'ng2-select2',
    styleUrls: ['./select2/select2.css', './ng2-select2.component.scss'],
    directives: [Select2Directive],
    // providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
    encapsulation: ViewEncapsulation.None,
    template: `
        <select *ngIf="comShow"  mySelect2 
            [(ngModel)]="selectedIndex" 
            (ngModelChange)="onChanged()" 
            (select)="onChanged()">

            <ng-content></ng-content>
        </select>
        `
})

export class Select2Component implements OnChanges  {
    @Input() name:string;
    @Input() selectModel:any;
    @Input() selectData:any[];

    private comShow = false;
    public selectedIndex = "0";

    constructor() {}

    onChanged(){
        var newValue = this.selectData[this.selectedIndex];
        Object.assign(this.selectModel,newValue);
    }

    ngOnChanges() {
        if(this.selectData.length >0){
            this.comShow = true;
        }
    }


}