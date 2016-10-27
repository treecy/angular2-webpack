import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { BaCard } from 'ng2-blur-theme/theme/components';
import { LocalDataSource } from 'ng2-smart-table';

import { ReportService } from '../../services/report.service';
import { RpTableComponent, DataSourceClass }from 'app-components/rp-table';
import * as moment from 'moment';

@Component({
    selector: 'daily-report',
    directives: [BaCard, RpTableComponent],
    styleUrls: ['./daily-report.component.scss'],
    templateUrl: './daily-report.component.html'
})

export class DailyReportComponent implements OnInit {

    private reportTitle: string;
    private items: any[] = ['total_click_cost', 'click_cnt', 'avg_click_cost', 'conv_cnt', 'cpa'];
    private currentItem: string = 'total_click_cost';
    private source = new DataSourceClass();
    // private source: LocalDataSource = new LocalDataSource();
    private langJP = this.reportService.langJP;
    // private basicColums = {
    //     'user_status': { title: this.langJP['user_status'], valuePrepareFunction: (value) => { return this.langJP['user_status_' + value] } },
    //     'campaign_name': { title: this.langJP['campaign_name'] },
    //     'ad_style': { title: this.langJP['ad_style'], valuePrepareFunction: (value) => { return this.langJP['ad_style_' + value] } },
    //     'ad_group_name': { title: this.langJP['ad_group_name'] },
    //     'ad_id': { title: this.langJP['ad_id'], type: 'number' },
    //     'cpa': { title: this.langJP['cpa'], type: 'number' },
    //     'conv_cnt': { title: this.langJP['conv_cnt'], type: 'number' },
    //     'total_click_cost': { title: this.langJP['total_click_cost'], type: 'number' },
    //     'click_cnt': { title: this.langJP['click_cnt'], type: 'number' },
    //     'avg_click_cost': { title: this.langJP['avg_click_cost'], type: 'number' },
    // }

    private tableSettings = {
        hideSubHeader: true,
        actions: {
            add: false,
            edit: false,
            delete: false
        },
        pager: {
            perPage: 20
        },
        columns: [
            { key : 'user_status', title: this.langJP['user_status'], valuePrepareFunction: (value) => { return this.langJP['user_status_' + value] } },
            { key : 'campaign_name', title: this.langJP['campaign_name'] },
            { key : 'ad_style', title: this.langJP['ad_style'], valuePrepareFunction: (value) => { return this.langJP['ad_style_' + value] } },
            { key : 'ad_group_name', title: this.langJP['ad_group_name'] },
            { key : 'ad_id', title: this.langJP['ad_id'], type: 'number' },
            { key : 'cpa', title: this.langJP['cpa'], type: 'number' },
            { key : 'conv_cnt', title: this.langJP['conv_cnt'], type: 'number' },
            { key : 'total_click_cost', title: this.langJP['total_click_cost'], type: 'number' },
            { key : 'click_cnt', title: this.langJP['click_cnt'], type: 'number' },
            { key : 'avg_click_cost', title: this.langJP['avg_click_cost'], type: 'number' },
        ]
    };

    constructor(
        private reportService: ReportService,
        private router: Router) { }

    ngOnInit(): void {
        if (!this.reportService.reportList) {
            this.router.navigate(['/']);
        } else {

            let result = this.reportService.result;
            this.source.load(this.reportService.reportList);
            // this.resetColoums();
            this.reportTitle = `月間毎日レポート ${result.account.account_name} [${result.month.dateText} ~ ${result.month_end.dateText}]`;
        }


    }

    resetColoums(): void {
        var current = moment(this.reportService.result.month.date);
        var end = moment(this.reportService.result.month_end.date);
        var today = moment();
        var index = 1;
        var dColumns = {};


        while (current.unix() <= end.unix() && current.unix() < today.unix()) {
            dColumns[current.format('YYYY-MM-DD') + '.' + this.currentItem] = {
                title: current.format('MMMMDo ddd')
            };
            current.add(1, 'days');
        }
        dColumns = Object.assign({}, this.basicColums, dColumns);

        var newSettings = Object.assign({}, this.tableSettings, { columns: dColumns });
        this.tableSettings = newSettings;
        this.source.load(this.reportService.reportList);
    }

    itemChanged() {
        var columns = this.tableSettings['columns'];
        this.resetColoums();

    }
}