import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { BaCard } from 'ng2-blur-theme/theme/components';
import { LocalDataSource } from 'ng2-smart-table';

import { ReportService } from '../../services/report.service';


@Component({
    selector: 'report-table',
    directives: [BaCard],
    styleUrls: ['./sum-report.component.scss'],
    templateUrl: './sum-report.component.html'
})

export class SumReportComponent implements OnInit {

    public accounts: Object[] = [];
    private reportList : Object[] = [];
    private langJP = this.reportService.langJP;
    private source: LocalDataSource = new LocalDataSource();
    private reportTitle:string;
    private settings = {
        hideSubHeader: true,
        actions: {
            add: false,
            edit: false,
            delete: false
        },
        pager: {
            perPage: 20
        },
        columns: {
            'user_status'      : { 
                title : this.langJP['user_status' ],
                sort  : false,
                valuePrepareFunction: (value)=>{return this.langJP['user_status_' + value]}
            },
            'campaign_name'    : { 
                title : this.langJP['campaign_name'],
                sort  : false
            },
            'ad_style'         : { 
                title: this.langJP['ad_style'],
                valuePrepareFunction: (value)=>{return this.langJP['ad_style_' + value]}
            },
            'ad_group_name'    : { title: this.langJP['ad_group_name'], sort: false},
            'ad_id'            : { title: this.langJP['ad_id']},
            'cpa'              : { title: this.langJP['cpa'],sortDirection:'desc'},
            'conv_cnt'         : { title: this.langJP['conv_cnt']},
            'client_cv'        : { title: this.langJP['client_cv']},
            'total_click_cost' : { title: this.langJP['total_click_cost']},
            'imps'             : { title: this.langJP['imps']},
            'click_cnt'        : { title: this.langJP['click_cnt']},
            'click_rate'       : { title: this.langJP['click_rate'], valuePrepareFunction: (value)=>{return value+'%'}},
            'avg_click_cost'   : { title: this.langJP['avg_click_cost']},
            'avg_deliver_rank' : { title: this.langJP['avg_deliver_rank']},
            'ad_headline'      : { title: this.langJP['ad_headline']},
            'ad_description'   : { title: this.langJP['ad_description']},
            'ad_description2'  : { title: this.langJP['ad_description2']},
        }
    };

    constructor(
        private reportService: ReportService,
        private router: Router ) {}

    ngOnInit(): void {
        if(!this.reportService.reportList){
            this.router.navigate(['/']);
        }else{
            var result = this.reportService.result;
            this.source.load(this.reportService.reportList);
            this.reportTitle = `集計期間レポート ${result.account.account_name} [${result.report_start.dateText} ~ ${result.report_end.dateText}]`;
        }
        
    }

    prepareFun(value:any){
        console.log(arguments);
    }

}
