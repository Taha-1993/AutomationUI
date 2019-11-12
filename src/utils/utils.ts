import * as moment from 'moment';
import { numericCellEditor } from '.';
import * as _ from 'lodash';
import { ValidatorFn, AbstractControl } from '@angular/forms';

export function isIE() {
  // const match = navigator.userAgent.search(/(?:Edge|MSIE|Trident\/.*; rv:)/);
  const match = navigator.userAgent.search(/(?:MSIE|Trident\/.*; rv:)/);
  let isIEFlag = false;
  if (match !== -1) {
    isIEFlag = true;
  }
  return isIEFlag;
  // return false;
}

export function noWhiteSpaceValidator(control: AbstractControl): { [key: string]: any } {
  let isInvalid: boolean = false;
  if (control.value && typeof control.value === 'string') {
    isInvalid = control.value.trim().length === 0;
  }
  return isInvalid ? { 'whitespace': true } : null ;
}

export const formatPeriod = (period: any): string => {
  if (!period || period === 'null' || period === 'undefined') {
    return '';
  }

  try {
    const stringPeriod: string = String(period);
    if (stringPeriod.includes('/')) {
      return stringPeriod;
    }

    return stringPeriod.insert(stringPeriod.length - 2, '/');
  } catch (ex) {
    return '';
  }
};

export const orientationFileNumberFormatter = (params: any) => {
  let val = params.value;
  if (val && !isNaN(val)) {
    val = parseFloat(val);
    const tmp = params.colDef.field === 'Loans' && params.rowIndex !== 3 ?
      val.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',') : val.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return (params.rowIndex === 3 ? tmp + '%' : tmp);
  } else {
    if (val === 0) {
      return (params.rowIndex === 3 ? 0.00 + '%' : 0.00);
    }
    return '';

  }
};

export const orientationFilePercentageFormatter = (params: any) => {
  let val = params.value;
  if (val && !isNaN(val)) {
    val = parseFloat(val);
    return val.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '%';
  } else {
    return 0.00 + '%';
  }
};
export const camelCaseCellRenderer = (values: any) => {
  const data = (values.data) ? values.data : values.node.aggData;
  if (data.Provider) {
    return _.startCase(_.camelCase(data.Provider));
  }
};
export const numberFormatter = (params: any) => {
  let val = params.value;
  if (val && !isNaN(val)) {
    val = parseFloat(val);
    return val.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  } else {
    return val;
  }
};

export const decimalFormatter = (params: any) => {
  let val = params.value;
  if (val && !isNaN(val)) {
    val = parseFloat(val);
    return val.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  } else {
    return val !== 0 ? val : '';
  }
};

// export const brokerInvoiceCellEditor = (params: any) => {
//   if (params.data.ClassName === 'Comments') {
//     return params.value;
//   } else {
//     return numericCellEditor;
//   }
// }
export const zeroValueDecimalFormatter = (params: any) => {
  let val = params.value;
  if (val && !isNaN(val)) {
    val = parseFloat(val);
    return val.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  } else {
    return val === 0 ? 0.00 : '';
  }
};

export const fourDecimalFormatter = (params: any) => {
  let val = params.value;
  if (val && !isNaN(val)) {
    val = parseFloat(val);
    return val.toFixed(4);
  } else {
    return val !== 0 ? val : '';
  }
};

export const fourDecimalPercentFormatter = (params: any) => {
  let val = params.value;
  if (val && !isNaN(val)) {
    val = parseFloat(val);
    return val.toFixed(4) + '%';
  } else {
    return val !== 0 ? val : '0.0000%';
  }
};

export const decimalFormatterBrokerInvoive = (params: any) => {
  let value = params.value;

  if (value && !isNaN(value)) {
    value = parseFloat(value);
    if (value >= 0) {
      value = value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    } else {
      value = `(${(-1 * value).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')})`;
    }
  } else {
    if (params.colDef.headerName === 'Premium' && params.data.ClassName === 'MGU fee') {
      value = '';
    } else {
      value = 0.0;
    }

  }
  const columnName: string = params.colDef.field.toString();
  const entityName = columnName.substring(0, columnName.lastIndexOf('Premium'));
  if (params.data.Status === 2) {
    const cellValue = `<label title="Data Mismatch - See Broker Invoice Details" style="color:red">${value}</label>`;
    if (params.colDef.field === columnName && params.data[`${entityName}DealId`] && params.data[`${entityName}MismatchStatus`] === '2') {
      return cellValue;
    } else {
      return `<label>${value}</label>`;
    }
  }
  return `<label>${value}</label>`;
};

export const numberPercentageFormatter = (params: any) => {
  let val = params.value;
  if (val && !isNaN(val)) {
    val = parseFloat(val) * 100;
    return val.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, '') + '%';
  } else {
    return val !== 0 ? val : '0.0%';
  }
};

export const tailRunOffFormatter = (params: any) => {
  let val = params.value;
  const field = params.data.Field;
  if (val && !isNaN(val)) {
    if (field.indexOf('Ratio') >= 0 || field.indexOf('ROL') >= 0) {
      val = parseFloat(val) * 100;
      return val.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, '') + '%';
    } else {
      return val.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
  } else {
    if (val === 0) {
      if (field.indexOf('Ratio') >= 0 || field.indexOf('ROL') >= 0) {
        return '0.0%';
      } else {
        return '0';
      }
    } else {
      return val;
    }
  }
};

export function calenderTailRunOffFormatter(params: any) {
  let val = params.value;
  const field = params.context.measure;
  if (val && !isNaN(val)) {
    if (field.indexOf('Ratio') >= 0 || field.indexOf('ROL') >= 0) {
      val = parseFloat(val) * 100;
      return val.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, '') + '%';
    } else {
      return val.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
  } else {
    if (val === 0) {
      if (field.indexOf('Ratio') >= 0 || field.indexOf('ROL') >= 0) {
        return '0.0%';
      } else {
        return '0';
      }
    } else {
      return val;
    }
  }
}

export const dateFormatter = (params: any) => {
  if (params.value) {
    let date = params.value;
    if (date !== '01/01/0001') {
      date = moment(params.value).format('MM/DD/YYYY');
      return date;
    }
  }
  return '';
};

export const dateTimeFormatter = (params: any) => {
  if (params.value) {
    let date = params.value;
    if (date !== '01/01/0001' && date !== '0001-01-01T00:00:00') {
      date = moment(params.value).format('MM/DD/YYYY hh:mm A');
      return date;
    }
  }
  return '';
};

export const checkAndNumberFormatter = (params: any) => {
  if (params.value && params.value !== '0' && params.value !== 0) {
    let val = params.value;
    if (val && !isNaN(val)) {
      val = parseFloat(val);
      return val.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    } else {
      return val;
    }
  } else {
    return '';
  }
};

export const zeroNumberFormatter = (params: any) => {
  const warning = (params.data.isvalidTreaty || params.data.isvalidTreaty === undefined) ?
    '' : `<img src='./assets/images/Error.png' class='warning-cell'
        title='No data exists for this combination of Treaty number and Underwriter year'/>`;
  return params.value && params.value !== '0' && params.value !== 0 ?
    `${warning}${params.value}` : '';
};

export const DecimalInputFormatter = (value: any) => {
  const parts = value.split('.');
  parts[0] = parts[0].replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  if (parts[0].length > 17) {
    parts[0] = parts[0].substring(0, 17);
  }
  if (parts.length > 1) {
    if (parts[1].length > 2) {
      parts[1] = parts[1].substring(0, 2);
    }
  }
  return parts.join('.');
};

export const StatusCellRender = (values: any) => {
  const data = (values.data) ? values.data : values.node.aggData;
  if (values.node && values.node.group) {
    return values.value;
  }

  let imagePath = './assets/images/New_icon.png';
  let imageTitle = 'In Progress';
  if (data) {
    if (data.Status >= -1 && data.Status <= 5) {
      imagePath = `./assets/images/file-status/${data.FileStatusDisplayDescription}.png`;
      imageTitle = data.FileStatusDisplayDescription;
    } else {
      imagePath = './assets/images/Error16-16.png';
      imageTitle = `N/A`;
    }

    return `<img title='${imageTitle}' class='FileStatusIcon' src='${imagePath}' />`;

  }
  return '';
};

export const hovermenu = (menuName: string, values: any) => {
  const data = values.data || values.node.aggData;

  if (!values.context || !values.context.isEditor) {
    return '';
  }

  if (data.postedCollateralId) {
    return `<div class="grid-actions-budgeted-limit" #dvPostedCollateral id="${menuName}${data.postedCollateralId}">
    <i class="material-icons cursor-pointer edit-icon" title="Edit" data-action-type="edit"></i>
    <i class="material-icons cursor-pointer delete-icon" title="Delete" data-action-type="delete"></i>
    </div>`;
  } else if (data.UWYear) {
    return `<div class="grid-actions-budgeted-limit" #budgetedLimit id="${menuName}${data.UWYear}">
    <i class="material-icons cursor-pointer edit-icon" title="Edit" data-action-type="edit"></i>
    <i class="material-icons cursor-pointer delete-icon" title="Delete" data-action-type="delete"></i>
    </div>`;
  } else {
    return '';
  }
};

export const periodCellRenderer = (values: any) => {
  if (values.node && values.node.group) {
    return formatPeriod(values.value);
  }
  const data = values.data || values.node.aggData;
  if (data) {
    return formatPeriod(data.FilePeriod || data.Period);
  }
};

export const menuRenderer = (values: any) => {
  if (values.data || values.node.aggData) {
    return `${hovermenu('grid_actions_', values)} `;
  }
};

export const fileTypeCellRender = (values: any) => {

  const data = (values.data) ? values.data : values.node.aggData;
  if (!values.data && values.node && values.node.group) {
    return values.value;
  }

  let imagePath = './assets/images/New_icon.png';
  let imageTitle = 'New';
  const fileStatustype = '';
  if (data) {

    if (data.DataType === 'Servicing') {
      imagePath = './assets/images/servicing-active.png';
      imageTitle = 'Servicing';
    }
    if (data.DataType === 'Trustee') {
      imagePath = './assets/images/trustee-active.png';
      imageTitle = 'Trustee';
    }
    if (data.DataType === 'PostedCollateral') {
      imagePath = './assets/images/posted-collateral-active.png';
      imageTitle = 'Posted Collateral';
    }
    if (data.DataType === 'Pricing') {
      imagePath = './assets/images/pricing-active.png';
      imageTitle = 'Pricing';
    }
    if (data.DataType === 'Origination') {
      imagePath = './assets/images/origination-active.png';
      imageTitle = 'Origination';
    }
    if (data.DataType === 'Submission') {
      imagePath = './assets/images/bs_active.png';
      imageTitle = 'Broker Submission';
    }

    return `<img title='${imageTitle}' class='FileStatusIcon' src='${imagePath}' />`;
  }
  return '';
};

export const RefPoolRenderer = (values: any) => {
  const data = (values.data) ? values.data : values.node.aggData;
  if (values.node.group) { return values.value; }
  if (data) {
    if ((data.DataType === 'Servicing' || data.DataType === 'Trustee') && parseFloat(data.NoOfPools) > 1) {
      return data.NoOfPools;
    }
    return data.ReferencePool;
  }
};
export const FileSizeRenderer = (values: any) => {
  let fileSize = '';
  if (values.node && values.node.field === 'FileSize' && values.node.group) {
    const gdata = values.node.allLeafChildren[0].data;
    if (gdata && (gdata.FileSize === 0 || gdata.FileSize)) {
      if (gdata.DataType === 'Trustee') {
        fileSize = gdata.FileName === 'UserEntry' ? '' : `${gdata.FileSize} KB`;
      } else {
        fileSize = gdata.FileSize + ' MB';
      }
      return fileSize;
    }
  }
  const data = (values.data) ? values.data : values.node.aggData;
  if (data && (data.FileSize === 0 || data.FileSize)) {
    if (data.DataType === 'Trustee') {
      fileSize = data.FileName === 'UserEntry' ? '' : `${data.FileSize} KB`;
    } else {
      fileSize = data.FileSize + ' MB';
    }
    // tslint:disable-next-line:no-use-before-declare
    return `${fileSize}${hovermenu('grid_actions_o_', values)}`;
  }
};
export const StarCellRender = (values: any) => {
  if (values.node && values.node.group) {
    return values.value;
  }
  const data = (values.data) ? values.data : values.node.aggData;
  const field = values.colDef.field;

  if (data) {
    if (data.DataType !== 'Servicing' || field === 'FileSize') {
      let displayData = '';
      switch (field) {
        case 'Broker': { displayData = data.Broker; break; }
        case 'TrusteeName': { displayData = data.TrusteeName; break; }
        case 'TrusteeDealName': { displayData = data.TrusteeDealName; break; }
        case 'FileSize': { displayData = `${(data.FileSize) ? data.FileSize + ' Mb' : ''}`; break; }
      }
      return displayData;
    }
    if (parseFloat(data.NoOfPools) <= 1) {
      return data[`${field}`];
    }
    const imagePath = './assets/images/star_icon.png';
    const imageTitle = 'Multiple values';
    return `<img title='${imageTitle}' src='${imagePath}' />`;
  }
  return '';
};

export const MenuCellRenderer = (values: any) => {
  const data = (values.data) ? values.data : values.node.aggData;
  values.context.isEditor = true;
  let value = 0;
  if (data && data.DataType === 'Servicing') {
    if (values.data.NoOfPools > 1) {
      value = values.data.NoOfPools;
    } else if (values.data.NoOfPools === 1) {
      value = values.data.ReferencePool;
    }
  } else {
    value = values.value;
  }
  if (data) {
    if (values.context.isEditor && (data.Status !== 0 && data.Status !== 1)) {
      return `<div>${value}</div> ${data.DataType === 'Servicing' || data.DataType === 'Trustee' ?
        hovermenu('grid_actions_o_', data) : ''} `;
    }
    return `<div>${value}</div>`;
  }
};


