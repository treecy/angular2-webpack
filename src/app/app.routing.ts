import { Routes, RouterModule } from '@angular/router';


import { SearchComponent } from './pages/search/search.component';
import { SumReportComponent } from './pages/sum-report/sum-report.component';
import { DailyReportComponent } from './pages/daily-report/daily-report.component';

const appRoutes: Routes = [{
    path: 'search',
    component: SearchComponent
}, {
    path: 'sumReport',
    component: SumReportComponent
}, {
    path: 'dailyReport',
    component: DailyReportComponent
}, {
    path: '',
    redirectTo: '/search',
    pathMatch: 'full'
}];

export const routing = RouterModule.forRoot(appRoutes);

