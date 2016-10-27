import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { BaCard }          from 'ng2-blur-theme/theme/components';
import { BaCheckbox }      from 'ng2-blur-theme/theme/components';
import { Select2Component }from 'app-components/ng2-select2';
import { RpDatepickerComponent }from 'app-components/rp-datepicker';


import { ReportService }   from '../../services/report.service';

import * as moment from 'moment';


@Component({
  selector: 'report-search',
  directives: [BaCard, BaCheckbox, Select2Component, RpDatepickerComponent],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent implements OnInit {

    public accounts: Object[]=[];
    public beginLoad = false;
    public fileValue = '';

    private fileUploadEl:any;
    private fileErrorMsg:string;

    constructor( 
        private reportService: ReportService,
        private router: Router 
    ) {}

    ngOnInit(): void {
        this.getAccounts();
    }

    getAccounts(): void {
        this.reportService.getAccount()
            .then(json => {
                var accounts = json.data.list;
                this.accounts = accounts;
                this.reportService.result.account = accounts[0];
            })
    }

    monthChangeCallback(value:any): void{
        var _mdate = moment(value);
        var date = _mdate.month(_mdate.month()+1).date(0);
        var result = this.reportService.result;
        result.month_end['date'] = date;
        result.month_end['dateText'] = date.format('YYYY-MM-DD');

    }

    fileChangeCallback(event:any): void {
        if( event.target.files && event.target.files[0] ){
            this.reportService.result.client_file = event.target.files[0];
            this.fileErrorMsg;
        }
        this.fileUploadEl = event.target;
    }

    submit(): void{
        let goto = '';
        this.beginLoad = true;

        if (this.reportService.result.type == '1'){
            goto = '/sumReport';
        }else {
            goto = '/dailyReport';
        }
        this.reportService.reportSubmit()
            .then((json)=>{
                this.beginLoad = false;
                if(json.code == 0){
                    this.router.navigate([goto])
                }else if(json.code == 2){
                    this.fileUploadEl.value = '';
                    this.fileErrorMsg = "CSV データフォーマットが正しくないです、確認してください。"
                }
                
            });
    }

}



