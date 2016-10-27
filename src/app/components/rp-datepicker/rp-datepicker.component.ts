import {Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation, ElementRef} from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/ja';

import { ReportService } from '../../services/report.service';

@Component({
    selector: 'rp-datepicker',
    encapsulation: ViewEncapsulation.None,
    template: `
        <div class="rp-datepicker">
            <input type="text" class="form-control" [placeholder]="title" [name]="name" readonly
                (click)="displayEndDatePicker = true"
                [value]="dateText"/>

            <datepicker name="datepicker" *ngIf = "displayEndDatePicker" class="datepicker-container"
                [(ngModel)]     ="dt" 
                [minDate]       ="minDate" 
                [showWeeks]     ="false" 
                (selectionDone) ="onSelected($event)"
                [datepickerMode]  ="mode" 
                [minMode]="mode">
            </datepicker>
        </div>
    `,
    styleUrls: ['./rp-datepicker.component.scss'],
    host: {
        '(document:mousedown)': 'documentClicked($event)'
    }
})

export class RpDatepickerComponent implements OnInit{
    @Input() public datepickerModel:any;
    @Input() public title:string='Click To Select Date';
    @Input() public mode:string;
    @Input() public name:string;

    @Output() onChanged = new EventEmitter<Object>();

    public dt:Date;
    public minDate:Date = void 0;
    private displayEndDatePicker:boolean = false;
    private dateText:string = '';

    constructor(private reportService: ReportService, private selfRef: ElementRef ) {
        let me = this;
        moment.locale('ja');
        (me.minDate = new Date()).setDate(me.minDate.getDate() - 1000);
        
    }

    ngOnInit(): void {
        this.title = this.datepickerModel.dateText || this.title;
        this.dt = this.datepickerModel.date || new Date();
    }

    onSelected(date:any): void {
        let dateText = moment(date).format('YYYY-MM-DD');

        this.displayEndDatePicker = false;
        this.dateText = dateText;
        this.datepickerModel.date = date;
        this.datepickerModel.dateText = dateText;
        this.onChanged.emit(date);
    }

    documentClicked(event:any): void{
        if(!this.selfRef.nativeElement.contains(event.target)){
            this.displayEndDatePicker = false;
        }
    }

}



