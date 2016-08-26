import { Routes, RouterModule } from '@angular/router';


import { SearchComponent } from './pages/search/search.component';

const appRoutes: Routes = [{
    path: 'search',
    component: SearchComponent
}, {
    path: '',
    redirectTo: '/search',
    pathMatch: 'full'
}];


//使用 RouterModule.forRoot 方法，导出包含了路由数组的 routing 常量。
//它返回一个配置好的路由模块，它将被加入到根 NgModule - AppModule 中。
export const routing = RouterModule.forRoot(appRoutes);

