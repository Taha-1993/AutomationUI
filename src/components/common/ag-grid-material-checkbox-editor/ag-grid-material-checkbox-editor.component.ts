import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';


@Component({
  selector: 'checkbox-cell',
  templateUrl: './ag-grid-material-checkbox-editor.component.html'
})
export class AGGridMaterialCheckboxEditorComponent implements ICellRendererAngularComp {
  private params: any;
  checked: boolean;

  agInit(params: any) {
    this.params = params;
    this.checked = this.params.value;
  }

  onChange(checked: boolean) {
    this.checked = checked;
  }

  refresh(params: any): boolean {
    return false;
  }
}
