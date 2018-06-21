import { NgModule } from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatDialogModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatSnackBarModule
} from '@angular/material';

@NgModule({
    imports: [
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatOptionModule,
        MatSelectModule,
        MatDialogModule,
        MatTableModule,
        MatSortModule,
        MatIconModule,
        MatSnackBarModule
    ],
    exports: [
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatOptionModule,
        MatSelectModule,
        MatDialogModule,
        MatTableModule,
        MatSortModule,
        MatIconModule,
        MatSnackBarModule
    ]
})
export class MaterialModule { }
