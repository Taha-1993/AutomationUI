import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatSelect } from '@angular/material';
import { ICellEditorParams } from 'ag-grid';
import { AgEditorComponent } from 'ag-grid-angular';

@Component({
  selector: 'app-ag-grid-material-select-editor',
  templateUrl: './ag-grid-material-select-editor.component.html'
})
export class AgGridMaterialSelectEditorComponent implements OnInit, AgEditorComponent, AfterViewInit {
  columnWidth: string;
  values: [ string ];
  params: ICellEditorParams;
  value: string;
  @ViewChild('select', { read: MatSelect }) select: MatSelect;

  constructor() { }

  ngOnInit() { }

  ngAfterViewInit() {
    this.select.open();
  }

  isPopup(): boolean {
    return true;
  }

  isCancelBeforeStart(): boolean {
    return false;
  }

  isCancelAfterEnd(): boolean {
    return false;
  }

  agInit(params: any): void {
    this.params = params;
    this.columnWidth = params.column.actualWidth + 'px';
    this.values = params.values;
    this.value = params.value;
  }

  getValue(): string {
    return this.value;
  }

  onSelectChange(e): void {
    this.params.stopEditing();
  }
}
