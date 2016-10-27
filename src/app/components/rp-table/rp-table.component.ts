import { Component, OnInit, OnChanges, Input, Pipe, PipeTransform } from '@angular/core';
import { DataSourceClass } from './data-source';


@Pipe({ name: 'cellDisplay' })
class CellDisplayPipe implements PipeTransform {
    transform(value, option) {
        console.log(value,option);
        return value;
    }
}


@Component({
    selector: 'rp-table',
    templateUrl: './rp-table.component.html',
    styleUrls: ['./rp-table.component.scss'],
    directives: [CellDisplayPipe],
})

export class RpTableComponent implements OnInit {
    @Input() dataSource:DataSourceClass;
    @Input() tableOption={};

    private data: Object[];
    private defaultOption;
    private _option;
    private pageBlock: Object[];
    private totalItems: number;

    public currentPage = 1;
    public perPage = 20;

    constructor() {
        this.defaultOption = {
            paging: {
                itemsPerPage: 20,
                maxSize: 10
            }
        };
    }

    ngOnInit() {
        this._option = Object.assign(this.defaultOption,this.tableOption);
        this.data = this.dataSource.tableData;
        this.totalItems = this.data.length;
        this.pageBlock = this.data.slice(0, this._option.paging.itemsPerPage);
    }

    private getPageBlock(page){
        var start = (page - 1) * this._option.paging.itemsPerPage;
        var end = page * this._option.paging.itemsPerPage;
        this.pageBlock = this.data.slice(start, end);
    }

    pageNumChange(){
        if(this.currentPage == 1){
            this._option.paging.itemsPerPage = this.perPage;
            this.getPageBlock(1);
        }else {
            this.currentPage = 1;
        }
        
    }

    pageChanged(event) {
        this._option.paging.itemsPerPage = this.perPage;
        this.getPageBlock(event.page);
    }

    sort(id) {
        this.data.sort((a, b) => {
            if (a[id] > b[id]) {
                return 1;
            }
            if (a[id] < b[id]) {
                return -1;
            }
            return 0;
        });
        this.currentPage = 1;
        this.getPageBlock(this.currentPage);
    }

}

