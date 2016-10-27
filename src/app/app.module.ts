import { NgModule }               from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserModule }          from '@angular/platform-browser';
import { FormsModule }            from '@angular/forms';
import { HttpModule, JsonpModule }from '@angular/http';

import { AppComponent }           from './app.component';
import { SearchComponent }        from './pages/search/search.component';
import { SumReportComponent } from './pages/sum-report/sum-report.component';
import { DailyReportComponent } from './pages/daily-report/daily-report.component';
import { routing }                from './app.routing';
import { ReportService }          from './services/report.service';
import { DatepickerModule, ButtonsModule } from 'ng2-bootstrap/ng2-bootstrap';
import { Ng2SmartTableModule } from 'ng2-smart-table';


@NgModule({
    imports      : [BrowserModule, FormsModule, HttpModule, JsonpModule, DatepickerModule,ButtonsModule, routing, Ng2SmartTableModule],
    declarations : [AppComponent, SearchComponent, SumReportComponent, DailyReportComponent],
    
    providers    : [
        {provide: LocationStrategy, useClass: HashLocationStrategy}, 
        ReportService
    ],

    bootstrap    : [AppComponent]
})

export class AppModule {}
