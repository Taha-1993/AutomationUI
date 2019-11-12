import { Component, OnInit, Inject, Injectable, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs/Subject';
import { takeUntil, filter } from 'rxjs/operators';
import { MatDialogModel } from '../../../models';

@Injectable()
@Component({
  selector: 'app-mat-confirm-dialog',
  templateUrl: './mat-dialog.component.html',
  styleUrls: ['./mat-dialog.component.css']
})
export class MatDialogComponent implements OnInit, OnDestroy {
  ngUnsubscribe: Subject<void>;

  constructor(
    public dialogRef: MatDialogRef<MatDialogComponent>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public dialogModel: MatDialogModel) {
    this.ngUnsubscribe = new Subject<void>();
  }

  ngOnInit() {
    this.router.events.pipe(
      takeUntil(this.ngUnsubscribe),
      filter(event => event instanceof NavigationEnd)).subscribe(() => {
        if (this.router.url.includes('error-page')) {
          this.dialogRef.close();
        }
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
