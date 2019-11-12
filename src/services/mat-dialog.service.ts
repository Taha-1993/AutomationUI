import { Injectable, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatDialogComponent } from '../components/common/mat-dialog/mat-dialog.component';
import { MatDialogModel } from '../models';

@Injectable({
  providedIn: 'root'
})
export class MatDialogService {
  confirmEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  private _dialog: MatDialogRef<MatDialogComponent, any>;
  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<MatDialogComponent>) { }

  showConfirmWindow(dialogModel: MatDialogModel): MatDialogRef<MatDialogComponent, any> {
    const height = dialogModel.height;
    try {
      dialogModel.height = dialogModel.height.includes('px') ? (Number(dialogModel.height.split('px')[0]) - 40) + 'px' : dialogModel.height;
    } catch {
      dialogModel.height = height;
    }
    if (dialogModel.dialogMessage !== 'File(s) already added' || this.dialog.openDialogs.length === 0) {
      this._dialog = this.dialog.open(MatDialogComponent, {
        height: dialogModel.height,
        width: dialogModel.width,
        disableClose: true,
        data: dialogModel
      });
    }
    return this._dialog;
  }
}
