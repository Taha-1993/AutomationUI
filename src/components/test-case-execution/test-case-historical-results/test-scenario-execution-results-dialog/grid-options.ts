import { GridOptions, ColDef } from 'ag-grid';
import { dateTimeFormatter } from '../../../../utils';

export const getColumnDefinition = () => {
  const columnDefs: ColDef[] = [
    {
      headerName: 'Scenario Execution ID',
      field: 'ScenarioExecutionID',
      hide: true,
      cellStyle: { 'text-align': 'center' }
    },
    {
      headerName: 'Suite Execution ID',
      field: 'SuiteExecutionID',
      hide: true,
      cellStyle: { 'text-align': 'center' }
    },
    {
      headerName: 'Scenario ID',
      field: 'ScenarioID',
      hide: true,
      cellStyle: { 'text-align': 'center' }
    },
    {
      headerName: 'Scenario',
      field: 'ScenarioName',
      cellStyle: { 'text-align': 'left' }
    },
    {
      headerName: 'Execution Start Time',
      field: 'ExecutionStartTime',
      // enableRowGroup: true,
      cellRenderer: dateTimeFormatter,
      cellStyle: { 'text-align': 'center' }
    },
    {
      headerName: 'Execution End Time',
      field: 'ExecutionEndTime',
      // enableRowGroup: true,
      cellRenderer: dateTimeFormatter,
      cellStyle: { 'text-align': 'center' }
    },
    {
      headerName: 'Run Time (HH:MM:SS)',
      field: 'ExecutionRunTime',
      // enableRowGroup: true,
      cellStyle: { 'text-align': 'center' }
    },
    {
      headerName: 'Execution Status ID',
      field: 'ExecutionStatusID',
      hide: true,
      cellStyle: { 'text-align': 'center' }
    },
    {
      headerName: 'Execution Status',
      field: 'ExecutionStatusDescription',
      // enableRowGroup: true,
      cellStyle: { 'text-align': 'center' }
    },
    {
      headerName: 'Username',
      field: 'Username',
      // enableRowGroup: true,
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
    // rowGroupPanelShow: 'always',
    groupDefaultExpanded: -1,
    // columnTypes: {
    //   dimension: {
    //     enableRowGroup: true,
    //     enablePivot: true
    //   }
    // },
    // autoGroupColumnDef: {
    //   headerName: ' ',
    //   width: 130,
    //   suppressMenu: true
    // },
    context: {
      isEditor: isEditor
    },
    overlayLoadingTemplate: `<span class="ag-overlay-loading-center">No Data Found.</span>`,
    overlayNoRowsTemplate: `<span class="ag-overlay-loading-center">List is empty.</span>`
  };
};
