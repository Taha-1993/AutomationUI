import { GridOptions, ColDef } from 'ag-grid';
import { AGGridMaterialCheckboxEditorComponent } from '../../common/ag-grid-material-checkbox-editor/ag-grid-material-checkbox-editor.component';
import { dateTimeFormatter } from '../../../utils';

export const getExecutionColumnDefinition = () => {
  const columnDefs: ColDef[] = [
    {
      headerName: '',
      field: '',
      width: 1,
      // pinned: 'left',
      suppressMenu: true,
      suppressSorting: true,
      suppressSizeToFit: true,
      cellStyle: { 'text-align': 'center' },
      cellRenderer: params => {
        return `<div class="grid-actions" style="margin-left: 5px; margin-top: 1px;">
          <i class="material-icons cursor-pointer" style="display: ${params.node.data && params.node.data.ExecutionStatusDescription !== 'In Progress' ? 'inline-block' : 'none'}" title="Execute" data-action-type="execute">play_arrow</i>
        </div>`;
      }
    },
    {
      headerName: 'Project ID',
      field: 'ProjectID',
      hide: true,
      cellStyle: { 'text-align': 'center' }
    },
    {
      headerName: 'Project Name',
      field: 'ProjectName',
      enableRowGroup: true,
      cellStyle: { 'text-align': 'center' }
    },
    {
      headerName: 'Suite Type ID',
      field: 'SuiteTypeID',
      hide: true,
      cellStyle: { 'text-align': 'center' }
    },
    {
      headerName: 'Suite Type Name',
      field: 'SuiteTypeName',
      enableRowGroup: true,
      cellStyle: { 'text-align': 'center' }
    },
    {
      headerName: 'Suite Type Description',
      field: 'SuiteTypeDescription',
      enableRowGroup: true,
      cellStyle: { 'text-align': 'center' }
    },
    {
      headerName: 'Execution Start Time',
      field: 'ExecutionStartTime',
      enableRowGroup: true,
      cellRenderer: dateTimeFormatter,
      cellStyle: { 'text-align': 'center' }
    },
    {
      headerName: 'Execution End Time',
      field: 'ExecutionEndTime',
      enableRowGroup: true,
      cellRenderer: dateTimeFormatter,
      cellStyle: { 'text-align': 'center' }
    },
    {
      headerName: 'Run Time (HH:MM:SS)',
      field: 'ExecutionRunTime',
      enableRowGroup: true,
      cellStyle: { 'text-align': 'center' }
    },
    {
      headerName: 'Execution Status ID',
      field: 'ExecutionStatusID',
      hide: true,
      cellStyle: { 'text-align': 'center' }
    },
    {
      headerName: 'Execution Status Description',
      field: 'ExecutionStatusDescription',
      enableRowGroup: true,
      cellStyle: { 'text-align': 'center' }
    },
    {
      headerName: 'Username',
      field: 'Username',
      hide: true,
      cellStyle: { 'text-align': 'center' }
    }
  ];

  return columnDefs;
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
