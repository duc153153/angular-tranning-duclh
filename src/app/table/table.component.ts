import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnChanges {
  @Input() rows!: any[];
  @Input() columns!: string[];
  @Input() isLoading!: boolean;
  @Input() totalRows!: number;
  @Input() pagingMode!: string;
  @Output() isLoaded = new EventEmitter();
  @Output() updateAccount = new EventEmitter();
  dataSource = new MatTableDataSource<Account>();
  position = 0;
  limit = 25;
  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.rows) {
      // tslint:disable-next-line:max-line-length
      this.dataSource.data = this.pagingMode === 'paging' ? changes.rows.currentValue : [...this.dataSource.data, ...changes.rows.currentValue];
      console.log(this.dataSource.data.length);
    }
  }

  ngOnInit(): void {
  }

  changePage(page: PageEvent): void {
    this.position = page.pageIndex;
    this.limit = page.pageSize;
    this.isLoaded.emit({
      start: page.pageIndex,
      limit: page.pageSize
    });
  }

  takeMore(): void {
    this.isLoaded.emit({
      start: this.position + 1,
      limit: this.limit
    });
  }

  action(name: string, account: Account): void {
    this.updateAccount.emit({ name, account });
  }
}
