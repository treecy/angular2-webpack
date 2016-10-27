import { Injectable, EventEmitter }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { langJp } from './lang-jp';

import 'rxjs/add/operator/toPromise';
import * as moment from 'moment';


interface Result {
    account?: any
    type: string
    month: any
    month_end:any
    report_start: any
    report_end: any
    client_file?: any
}

@Injectable()
export class ReportService{

    private accountUrl = '/api/account/list';
    private reportUrl = 'api/report/submit';
    public langJP = langJp;
    public accounts:Object[];

    public result:Result = {
        account: {},
        type: '1',
        month: {},
        month_end: {},
        report_start: {},
        report_end: {}
    };

    public reportList: Object[];

    // global event
    public bodyClicked$: EventEmitter<Object>;

    constructor (private http: Http) {
        this.bodyClicked$ = new EventEmitter();
    }

    getAccount (): Promise<any> {
        return this.http.get(this.accountUrl)
            .toPromise()
            .then(this.handleResponse)
            .catch(this.handleError);
    }

    reportSubmit(): Promise<any>{
        var formData = new FormData();                
        formData.append('type', this.result['type']);
        formData.append('account_id', this.result['account'].account_id);
        if(this.result['type'] == '1'){
            formData.append('report_start', this.result['report_start'].dateText);
            formData.append('report_end', this.result['report_end'].dateText);
            formData.append('client_file', this.result['client_file']);
        }else{
            formData.append('report_start', this.result['month'].dateText);
            formData.append('report_end', this.result['month_end'].dateText);
        }

        return this.http.post(this.reportUrl,formData)
            .toPromise()
            .then(this.handleResponse)
            .then(json => {
                if(json.code == 0){ this.reportList = json.data.list}
                return json;
            })
            .catch(this.handleError);
    }

    bodyClicked(event): void{
        this.bodyClicked$.emit(event);
    }

    private handleResponse(response){
        let jsonData = response.json();

        if (jsonData.code != 0){
            // failed handler
        }

        return jsonData;
        
    }

    private handleError() {}

}