import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { fakeBackendProvider } from './core/services/fake-backend';
import { AccountService } from './core/services/account.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableComponent } from './table/table.component';
import { MaterialModule } from './material-module';
import { LoadingComponent } from './loading/loading.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CreateComponent } from './account/create/create.component';
import { UpdateComponent } from './account/update/update.component';
import { DeleteComponent } from './account/delete/delete.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    InfiniteScrollModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [AppComponent, TableComponent, LoadingComponent, CreateComponent, UpdateComponent, DeleteComponent],
  bootstrap: [AppComponent],
  providers: [
    // provider used to create fake backend,
    AccountService,
    fakeBackendProvider
  ]
})
export class AppModule {
}
