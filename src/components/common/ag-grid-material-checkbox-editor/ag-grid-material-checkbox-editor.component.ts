import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'checkbox-cell',
  templateUrl: './ag-grid-material-checkbox-editor.component.html'
})
export class AGGridMaterialCheckboxEditorComponent implements ICellRendererAngularComp {
  private params: any;
  checked: boolean;
  isCheckBoxEnabled: boolean;
  isGroup: boolean;

  agInit(params: any) {
    this.params = params;
    this.isCheckBoxEnabled = params.node.data && params.node.data.ExecutionStatusDescription !== 'In Progress';
    this.isGroup = params.node.group;
    // this.checked = this.params.value;
  }

  onChange(checked: boolean) {
    this.checked = this.params.node.data.IsChecked = checked;
    // this.params.node.setDataValue(this.params.colDef, this.checked);
  }

  refresh(params: any): boolean {
    return false;
  }
}
