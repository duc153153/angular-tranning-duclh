import { Component, OnInit, VERSION } from '@angular/core';
import { AccountService } from './core/services/account.service';
import { Observable, Subject } from 'rxjs';
import { Account, createAccount, createParamSearch } from './core/model/account.model';
import { finalize, takeUntil } from 'rxjs/operators';
import { Accounts } from './core/data/account';
import * as faker from 'faker';
import { MatDialog } from '@angular/material/dialog';
import { CreateComponent } from './account/create/create.component';
import { UpdateComponent } from './account/update/update.component';
import { DeleteComponent } from './account/delete/delete.component';

export interface IPaginator {
  rs: Account[];
  total: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  name = 'Angular ' + VERSION.major;
  account: Account[] = [];
  unSubscribeAll: Subject<any>;
  isOpenAddAccount = false;
  isOpenEditAccount = false;
  selectedAccount: Account | undefined;
  searchStr = '';
  total!: number;
  columns = ['_id',
    'account_number',
    'balance',
    'age',
    'firstname',
    'lastname',
    'gender',
    'address',
    'employer',
    'email',
    'city',
    'state',
    'option'
  ];
  defaultQuery = {
    last_name: this.searchStr,
    start: 0,
    limit: 25
  };
  isLoading = false;
  isLoaded = false;
  pageModeList = ['paging', 'scroll'];
  pageMode!: string;

  constructor(
    private accountService: AccountService,
    private dialog: MatDialog
    ) {
    // read data from file to localstorage
    this.unSubscribeAll = new Subject<any>();
    this.loadDataToLocal();
    this.pageMode = this.pageModeList[0];
  }

  ngOnInit(): void {
    this.getAllAccount();
  }

  loadDataToLocal(): void {
    localStorage.setItem('accounts', JSON.stringify(Accounts));
  }


  getAllAccount(query = {}): void {
    console.log(query);
    console.log(createParamSearch({ ...this.defaultQuery, ...query }));
    this.isLoading = true;
    this.accountService.getAccounts(createParamSearch({ ...this.defaultQuery, ...query }))
      .pipe(takeUntil(this.unSubscribeAll))
      .pipe(finalize(() => {
        this.isLoading = false;
      }))
      .subscribe((resp: IPaginator) => {
        console.log(resp.rs);
        this.account = resp.rs;
        this.total = resp.total;
      }, (err: Error) => {
        this.account = [];
      });
  }

  openAddAccount(): void {
    this.isOpenAddAccount = true;
  }

  openEdit(acc: Account): void {
    this.selectedAccount = acc;
    this.isOpenEditAccount = true;
  }

  saveEdit(): void {
    const editedAccount = createAccount({
      balance: parseInt(faker.finance.amount(0, 99999), 0),
      age: 25,
      lastname: faker.name.lastName(),
      firstname: faker.name.lastName(),
      city: this.selectedAccount?.city,
      account_number: this.selectedAccount?.account_number,
      address: this.selectedAccount?.address,
      email: this.selectedAccount?.email,
      employer: this.selectedAccount?.employer,
      gender: 'F',
      state: this.selectedAccount?.state,
      _id: this.selectedAccount?._id
    });

    this.accountService.editAccount(editedAccount)
      .pipe(takeUntil(this.unSubscribeAll))
      .subscribe((resp: Account[]) => {
        this.getAllAccount();
        this.isOpenEditAccount = false;
      }, (err: Error) => {
        this.account = [];
      });
  }

  saveNew(): void {
    const newAccount = createAccount({
      balance: parseInt(faker.finance.amount(0, 99999), 0),
      age: 25,
      lastname: faker.name.lastName(),
      firstname: faker.name.lastName(),
      city: faker.address.city(),
      account_number: faker.finance.account(),
      address: faker.address.streetAddress(),
      email: faker.internet.email(),
      employer: faker.name.lastName(),
      gender: 'F',
      state: faker.address.stateAbbr()
    });

    this.accountService.addAccount(newAccount)
      .pipe(takeUntil(this.unSubscribeAll))
      .subscribe((resp: Account[]) => {
        this.getAllAccount();
        this.isOpenAddAccount = false;
      }, (err: Error) => {
        this.account = [];
      });
  }

  search(): void {
    this.getAllAccount();
  }

  changePageMode(mode: string): void {
    this.pageMode = mode;
    this.getAllAccount();
  }

  openCreateDialog(): void {
    this.dialog.open(CreateComponent, {
      width: '600px'
    }).afterClosed().subscribe((result) => {
      if (result) {
        this.getAllAccount();
      }
    });
  }

  openUpdateDialog(account: Account): void {
    this.dialog.open(UpdateComponent, {
      width: '600px',
      data: account
    }).afterClosed().subscribe((result) => {
      if (result) {
        this.getAllAccount();
      }
    });
  }

  openDeleteDialog(account: Account): void {
    this.dialog.open(DeleteComponent, {
      width: '600px',
      data: account
    }).afterClosed().subscribe((result) => {
      if (result) {
        this.getAllAccount();
      }
    });
  }

   do(action: any): void {
     if (action.name === 'delete') { return this.openDeleteDialog(action.account); }
     if (action.name === 'update') { return this.openUpdateDialog(action.account); }
   }
}
