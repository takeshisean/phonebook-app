import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material.module';

//Services
import { PhoneBookService } from '../services/phonebook.service';

//Dialog
import { AddContactDialog } from '../app/dialog.addcontact';


@NgModule({
  declarations: [
    AppComponent,
    AddContactDialog
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    // FlexLayoutModule,
    HttpModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [
    PhoneBookService
  ],
  entryComponents: [
    AddContactDialog
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
