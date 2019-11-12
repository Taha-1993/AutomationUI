import { GridOptions, ColDef } from 'ag-grid';
import { AGGridMaterialCheckboxEditorComponent } from '../common/ag-grid-material-checkbox-editor/ag-grid-material-checkbox-editor.component';

export const executionColumnDefinition = () => {
  const columnDefs: ColDef[] = [
    {
      headerName: '',
      field: 'isChecked',
      width: 50,
      cellStyle: { 'text-align': 'center' },
      cellEditorFramework: AGGridMaterialCheckboxEditorComponent,
      suppressMenu: true,
      suppressSorting: true,
      suppressSizeToFit: true,
      suppressResize: true
    },
    {
      headerName: 'App Name',
      field: 'ApplicationName',
      cellStyle: { 'text-align': 'center' }
    },
    {
      headerName: 'Suite Name',
      field: 'SuiteName',
      cellStyle: { 'text-align': 'center' }
    },
    {
      headerName: 'Description',
      field: 'SuiteDescription',
      cellStyle: { 'text-align': 'center' }
    },
    {
      headerName: 'Status',
      field: 'ExecutionStatus',
      cellStyle: { 'text-align': 'center' }
    }
  ];
};

export const getGridOptions = (isEditor: boolean): GridOptions => {
  return {
    enableSorting: true,
    enableFilter: true,
    enableColResize: true,
    headerHeight: 55,
    rowSelection: 'single',
    rowGroupPanelShow: 'always',
    groupDefaultExpanded: -1,
    columnTypes: {
      dimension: {
        enableRowGroup: true,
        enablePivot: true
      }
    },
    autoGroupColumnDef: {
      headerName: ' ',
      width: 130,
      suppressMenu: true
    },
    context: {
      isEditor: isEditor
    },
    overlayLoadingTemplate: `<span class="ag-overlay-loading-center">No Data Found.</span>`,
    overlayNoRowsTemplate: `<span class="ag-overlay-loading-center">List is empty.</span>`
  };
};
