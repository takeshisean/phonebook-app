import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { PhoneBookService } from '../services/phonebook.service'
import { PhoneTypeDT } from '../models/phonebook.model';
import { MyPhoneBookValidators } from '../shared/validators';

@Component({
    selector: 'dialog-add-contact',
    templateUrl: 'dialog.addcontact.html'
})
export class AddContactDialog implements OnInit, OnDestroy {
    allSub: Subscription[] = [];
    phoneTypeData: PhoneTypeDT[];
    errorMessage: string = '';
    loading: boolean = false;
    addNewContactForm: FormGroup;

    constructor(public dialogRef: MatDialogRef<AddContactDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private phoneBookService: PhoneBookService,
        public snackBar: MatSnackBar) { }

    ngOnInit() {
        this.addNewContactForm = new FormGroup({
            lastName: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.maxLength(50)]),
            firstName: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.maxLength(50)]),
            number: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.maxLength(20), MyPhoneBookValidators.numberOnly]),
            phoneType: new FormControl({ value: '', disabled: false }, [Validators.required])
        });

        let getAllPhoneType_sub = this.phoneBookService.getAllPhoneType()
            .subscribe(
                (value) => {
                    if (value.status === 204) {

                    } else if (value.status === 200) {
                        if (typeof (value.body) === 'string') {
                            // this.openSnackBar(value.body, '');
                        } else if (typeof (value.body) === 'object') {
                            this.phoneTypeData = value.body;
                        }
                    } else {
                    }
                },
                (error) => {
                    this.errorMessage = <any>error;
                    // this.loading = false;
                    this.openSnackBar(this.errorMessage, '');
                });

        //Adds into array for each subscribe
        this.allSub.push(getAllPhoneType_sub);
    }

    onSave() {
        let cfm = confirm("Are you sure you want to add new contact?");

        if (cfm) {
            this.loading = true;

            let contactDetail = {
                lastName: this.addNewContactForm.get('lastName')!.value,
                firstName: this.addNewContactForm.get('firstName')!.value,
                number: this.addNewContactForm.get('number')!.value,
                phoneTypeId: this.addNewContactForm.get('phoneType')!.value
            }

            let save_sub = this.phoneBookService.insertContact(contactDetail)
                .subscribe(
                    (value) => {
                        this.loading = false;
                        if (value.status === 204) {
                            this.openSnackBar('Error adding new contact.', '');
                        } else if (value.status === 210) {
                            let responseMessage = <any>value.body;
                            this.openSnackBar(responseMessage.message, '');
                        } else if (value.status === 200) {
                            if (typeof (value.body) === 'string') {
                                // this.openSnackBar(value.body, '');
                            } else if (typeof (value.body) === 'object') {
                                this.dialogRef.close('Add successful');
                            }
                        } else {
                            this.openSnackBar('Error adding new contact.', '');
                        }
                    },
                    (error) => {
                        this.loading = false;
                        this.errorMessage = <any>error;
                        this.openSnackBar(this.errorMessage, '');
                    });

            //Adds into array for each subscribe
            this.allSub.push(save_sub);
        } else {
            this.loading = false;
        }
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