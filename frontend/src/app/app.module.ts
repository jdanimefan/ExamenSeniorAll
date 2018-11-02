import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { UpdateComponent } from './update/update.component';
import { CreateComponent } from './create/create.component';
import { DeleteComponent } from './delete/delete.component';
import { SearchComponent } from './search/search.component';
import { DataTablesModule } from 'angular-datatables';
import { Appservice } from './_services/app.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// rutas
import {routing} from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    UpdateComponent,
    CreateComponent,
    DeleteComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    routing,
    DataTablesModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [Appservice],
  bootstrap: [AppComponent]
})
export class AppModule { }
