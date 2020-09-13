import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChartComponent } from './chart/chart.component';
import {ChartsModule} from 'ng2-charts';
import { HttpModule } from '@angular/http';
import { GlobalService } from './services/GlobalServices';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { ButtonsModule } from 'ngx-bootstrap/buttons'
// import { HttpClientModule } from '@angular/common/http';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap'
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
// import {NgxUiLoaderModule} from 'ngx-ui-loader';
import { NgxSpinnerModule } from "ngx-spinner";
@NgModule({
  declarations: [
    AppComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    ChartsModule,
    HttpModule,
    NgbTypeaheadModule,
    // NgbModule.forRoot(),
    // ButtonsModule.forRoot(),
    BrowserAnimationsModule,
    // NgxUiLoaderModule,
    NgxSpinnerModule
  ],
  providers: [GlobalService],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
