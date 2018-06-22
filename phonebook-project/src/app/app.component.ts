import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { PhoneBookService } from '../services/phonebook.service';
import { MatDialog, MAT_DIALOG_DATA, MatSort, MatTableDataSource, MatSnackBar } from '@angular/material';
import { PhoneBookDT } from '../models/phonebook.model';
import { AddContactDialog } from '../app/dialog.addcontact';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  allSub: Subscription[] = [];
  phoneBookColumns = ['lastname', 'firstname', 'phonetype', 'number'];
  phoneBookData: PhoneBookDT[];
  phoneBookDataSource = new MatTableDataSource<PhoneBookDT>(this.phoneBookData);
  @ViewChild(MatSort) sort: MatSort;
  selectedSearchType: string;
  searchTypeData = [
    { value: 'lastName', viewValue: 'Last Name' },
    { value: 'firstName', viewValue: 'First Name' },
    { value: 'number', viewValue: 'Number' },
    { value: '', viewValue: 'All' }
  ];
  searchText: string;
  errorMessage: string = '';
  title = 'my phone book app';
  constructor(private phoneBookService: PhoneBookService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar) { }

  // ngAfterViewInit() {
  //   this.phoneBookDataSource.sort = this.sort;
  // }

  ngOnInit() {
    let getAllContact_sub = this.phoneBookService.getAllContact()
      .subscribe(
        (value) => {
          // if (value.status === 204) {

          // } else if (value.status === 200) {
          //   if (typeof (value.body) === 'string') {
          //     this.phoneBookData = [];
          //     this.phoneBookDataSource = new MatTableDataSource<PhoneBookDT>(this.phoneBookData);
          //     // this.openSnackBar(value.body, '');
          //   } else if (typeof (value.body) === 'object') {
          //     this.phoneBookData = value.body;
          //     let sortData = this.phoneBookData.sort((a, b) => a.lastName < b.lastName ? -1 : a.lastName > b.lastName ? 1 : 0);
          //     // console.log(sortData, this.phoneBookData);
          //     this.phoneBookDataSource = new MatTableDataSource<PhoneBookDT>(sortData);
          //   }
          // } else {

          // }

          this.phoneBookData = value;
          this.sortByLastName('asc');
          // let sortData = this.phoneBookData.sort((a, b) => a.lastName < b.lastName ? -1 : a.lastName > b.lastName ? 1 : 0);
          // this.phoneBookDataSource = new MatTableDataSource<PhoneBookDT>(sortData);
        },
        (error) => {
          this.errorMessage = <any>error;
          // this.loading = false;
          this.openSnackBar(this.errorMessage, '');
        });

    //Adds into array for each subscribe
    this.allSub.push(getAllContact_sub);
  }

  sortData(event) {
    switch (event.active) {
      case 'lastname':
        this.sortByLastName(event.direction);
        break;
      case 'firstname':
        this.sortByFirstName(event.direction);
        break;
      case 'phonetype':
        this.sortByPhoneType(event.direction);
        break;
      default:
        break;
    }
  }

  sortByLastName(sortOrder) {
    if (sortOrder === 'asc') {
      let sortData = this.phoneBookData.sort(
        (a, b) => a.lastName.toLowerCase() < b.lastName.toLowerCase() ? -1 :
          a.lastName.toLowerCase() > b.lastName.toLowerCase() ? 1 : 0);
      this.phoneBookDataSource = new MatTableDataSource<PhoneBookDT>(sortData);
    }
    else if (sortOrder === 'desc') {
      let sortData = this.phoneBookData.sort(
        (a, b) => b.lastName.toLowerCase() < a.lastName.toLowerCase() ? -1 :
          b.lastName.toLowerCase() > a.lastName.toLowerCase() ? 1 : 0);
      this.phoneBookDataSource = new MatTableDataSource<PhoneBookDT>(sortData);
    } else {
    }
  }

  sortByFirstName(sortOrder) {
    if (sortOrder === 'asc') {
      let sortData = this.phoneBookData.sort(
        (a, b) => a.firstName.toLowerCase() < b.firstName.toLowerCase() ? -1 :
          a.firstName.toLowerCase() > b.firstName.toLowerCase() ? 1 : 0);
      this.phoneBookDataSource = new MatTableDataSource<PhoneBookDT>(sortData);
    }
    else if (sortOrder === 'desc') {
      let sortData = this.phoneBookData.sort(
        (a, b) => b.firstName.toLowerCase() < a.firstName.toLowerCase() ? -1 :
          b.firstName.toLowerCase() > a.firstName.toLowerCase() ? 1 : 0);
      this.phoneBookDataSource = new MatTableDataSource<PhoneBookDT>(sortData);
    } else {
    }
  }

  sortByPhoneType(sortOrder) {
    if (sortOrder === 'asc') {
      let sortData = this.phoneBookData.sort(
        (a, b) => a.phoneType.type.toLowerCase() < b.phoneType.type.toLowerCase() ? -1 :
          a.phoneType.type.toLowerCase() > b.phoneType.type.toLowerCase() ? 1 : 0);
      this.phoneBookDataSource = new MatTableDataSource<PhoneBookDT>(sortData);
    }
    else if (sortOrder === 'desc') {
      let sortData = this.phoneBookData.sort(
        (a, b) => b.phoneType.type.toLowerCase() < a.phoneType.type.toLowerCase() ? -1 :
          b.phoneType.type.toLowerCase() > a.phoneType.type.toLowerCase() ? 1 : 0);
      this.phoneBookDataSource = new MatTableDataSource<PhoneBookDT>(sortData);
    } else {
      // console.log('other');
    }
  }

  searchOnClick() {
    switch (this.selectedSearchType) {
      case 'lastName':
        this.searchContactByLastName();
        break;
      case 'firstName':
        this.searchContactByFirstName();
        break;
      case 'number':
        this.searchContactByNumber();
        break;
      default:
        this.searchAllContacts();
        break;
    }
  }

  searchContactByFirstName() {
    let getContactByNumber_sub = this.phoneBookService.getContactByFirstName(this.searchText)
      .subscribe(
        (value) => {
          this.phoneBookData = [];
          this.phoneBookDataSource = new MatTableDataSource<PhoneBookDT>(this.phoneBookData);

          if (!value && value !== null) {
            this.phoneBookData.push(value);
            this.sortByLastName('asc');
          }
        },
        (error) => {
          this.errorMessage = <any>error;
          // this.loading = false;
          this.openSnackBar(this.errorMessage, '');
        });

    //Adds into array for each subscribe
    this.allSub.push(getContactByNumber_sub);
  }

  searchContactByLastName() {
    let getContactByNumber_sub = this.phoneBookService.getContactByLastName(this.searchText)
      .subscribe(
        (value) => {
          this.phoneBookData = [];
          this.phoneBookDataSource = new MatTableDataSource<PhoneBookDT>(this.phoneBookData);

          if (!value && value !== null) {
            this.phoneBookData.push(value);
            this.sortByLastName('asc');
          }
        },
        (error) => {
          this.errorMessage = <any>error;
          // this.loading = false;
          this.openSnackBar(this.errorMessage, '');
        });

    //Adds into array for each subscribe
    this.allSub.push(getContactByNumber_sub);
  }

  searchContactByNumber() {
    let getContactByNumber_sub = this.phoneBookService.getContactByNumber(this.searchText)
      .subscribe(
        (value) => {
          this.phoneBookData = [];
          this.phoneBookDataSource = new MatTableDataSource<PhoneBookDT>(this.phoneBookData);

          if (!value && value !== null) {
            this.phoneBookData.push(value);
            this.sortByLastName('asc');
          }
        },
        (error) => {
          this.errorMessage = <any>error;
          // this.loading = false;
          this.openSnackBar(this.errorMessage, '');
        });

    //Adds into array for each subscribe
    this.allSub.push(getContactByNumber_sub);
  }

  searchAllContacts() {
    let getAllContact_sub = this.phoneBookService.getAllContact()
      .subscribe(
        (value) => {
          // if (value.status === 204) {

          // } else if (value.status === 200) {
          //   if (typeof (value.body) === 'string') {
          //     this.phoneBookData = [];
          //     this.phoneBookDataSource = new MatTableDataSource<PhoneBookDT>(this.phoneBookData);
          //     // this.openSnackBar(value.body, '');
          //   } else if (typeof (value.body) === 'object') {
          //     this.phoneBookData = value.body;
          //     this.phoneBookDataSource = new MatTableDataSource<PhoneBookDT>(this.phoneBookData);

          //     // this.phoneBookDataSource.sort = this.sort;
          //   }
          // } else {

          // }

          this.phoneBookData = value;
          this.sortByLastName('asc');
        },
        (error) => {
          this.errorMessage = <any>error;
          // this.loading = false;
          this.openSnackBar(this.errorMessage, '');
        });

    //Adds into array for each subscribe
    this.allSub.push(getAllContact_sub);
  }

  addContact(): void {
    let dialogRef = this.dialog.open(AddContactDialog, {
      width: '60%',
      disableClose: true,
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'Add successful') {
        this.openSnackBar('New contact added.', '');
        this.searchAllContacts();
      }
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  ngOnDestroy() {
    for (let sub of this.allSub) {
      sub.unsubscribe();
    }
  }
}
