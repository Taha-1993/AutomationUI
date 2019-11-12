export const decimalNumericCellEditor = () => { };

function isCharNumeric(charStr: any) {
  return !!/\d/.test(charStr);
}

function isKeyPressedNumeric(event) {
  const charCode = getCharCodeFromEvent(event);
  const charStr = String.fromCharCode(charCode);
  return isCharNumeric(charStr);
}

// simple function cellRenderer, just returns back the name of the country
function CountryCellRenderer(params) {
  return params.value.name;
}

// function to act as a class
// function NumericCellEditor() {
// }
function getCharCodeFromEvent(event) {
  event = event || window.event;
  return (typeof event.which === 'undefined') ? event.keyCode : event.which;
}
// gets called once before the renderer is used
decimalNumericCellEditor.prototype.init = function (params) {
  // create the cell
  this.currentcolumn = params.column.colId;
  this.focusAfterAttached = params.cellStartedEdit;
  this.eInput = document.createElement('input');
  this.eInput.style.width = '100%';
  this.eInput.style.height = '100%';
  if (params.node.data.ClassName && params.node.data.ClassName === 'Comments') {
    this.eInput = document.createElement('textarea');
    if (params.charPress) {
      params.value += params.charPress;
    }
    if (params.columnApi._columnController.allDisplayedColumns.length) {
      this.eInput.style.width = `${(params.columnApi._columnController.allDisplayedColumns[1].actualWidth * 2) - 8}px`;
      this.eInput.style.height = `170px`;
      this.eInput.style['font-family'] = `'Roboto', 'Noto', sans-serif`;
      this.eInput.style['font-size'] = `14px`;
      this.eInput.maxLength = 300;
    }
    this.eInput.value = params.value;
  } else {
    if (params.value === undefined) {
      params.value = '';
    }
    this.eInput.value = isCharNumeric(params.charPress) || (params.charPress === '.' || params.charPress === '-')
      ? params.charPress : params.value;
    if (isCharNumeric(params.charPress) || (params.charPress === '.' || params.charPress === '-')) {
      this.eInput.value = params.charPress;
    } else {
      if (params.value !== undefined && params.value !== null) {
        this.eInput.value = params.value;
      }
    }
    const that = this;
    this.eInput.addEventListener('keypress', function (event) {
      const columnsList = [
        'SDMonth',
        'SDFactor',
        'ActiveBalanceMultiplier',
        'TreatyNumber',
        'UWYear'
      ];
      if (columnsList.includes(params.column.colId)) {
        if (!isKeyPressedNumeric(event)) {
          that.eInput.focus();
          if (event.preventDefault) {
            event.preventDefault();
          }
        }
      } else {
        if (!isKeyPressedNumeric(event) && event.key !== '.' && (event.key == '-' && !that.currentcolumn.includes('ClaimAdjustment'))) {
          that.eInput.focus();
          if (event.preventDefault) {
            event.preventDefault();
          }
        }
      }
    });
    this.eInput.addEventListener('keyup', (event: any) => {
      let value = event.currentTarget.value;
      if (!isKeyPressedNumeric(event) && event.key !== '.' && (event.key == '-' && !that.currentcolumn.includes('ClaimAdjustment'))) {
        that.eInput.focus();
        if (event.preventDefault) {
          event.preventDefault();
        }
      }
      if (!isNaN(value)) {
        if (this.currentcolumn.includes('Commutation') || this.currentcolumn.includes('AONBrokerFee')) {
          if (value.split('.').length < 3) {
            this.eInput.value = value;
            if (value.split('.').length === 2) {
              if (value.split('.')[1].length > 4) {
                this.eInput.value = value.substring(0, value.length - 1);
              }
            }
          } else {
            this.eInput.value = value.substring(0, value.length - 1);
          }
        } else if (this.currentcolumn === 'expected_loans') {
          if (/^[0-9]{1,8}$/.test(value)) {
            this.eInput.value = Number(value).toString();
          } else {
            value = value.substring(0, value.length - 1);
            this.eInput.value = value.substring(0, 8);
          }
        } else if (this.currentcolumn === 'BudgetedLimit') {
          if (/^[0-9]{1,13}$/.test(value)) {
            this.eInput.value = Number(value).toString();
          } else {
            value = value.substring(0, value.length - 1);
            this.eInput.value = value.substring(0, 13);
          }
        } else if (this.currentcolumn === 'AnnualRatePercentage') {
          let splitValue = value.split('.');
          if (/^\s*100$|^\s*\d{0,2}(\.?|\.\d{1,4}0*)?\s*$/.test(value)) {
            this.eInput.value = value.toString();
          } else if (splitValue.length < 3) {
            this.eInput.value = value;
            if (splitValue.length === 2) {
              if (splitValue[1].length > 4) {
                value = `${splitValue[0]}.${splitValue[1].substring(0, 4)}`;
                this.eInput.value = value;
              }
            }
            splitValue = value.split('.');
            if (splitValue.length === 2) {
              value = `${splitValue[0].substring(0, 2)}.${splitValue[1]}`;
            } else if (splitValue.length === 1) {
              value = splitValue[0].substring(0, 2);
            }
            this.eInput.value = value;
          } else {
            this.eInput.value = value.substring(0, value.length - 1);
          }
          // else {
          //   const splitValue = value.split('.');
          //   if (splitValue[0] > 2) {
          //   }
          //   if (splitValue.length > 1 && splitValue.length[1] > 4) {
          //     value = value.substring(0, 4);
          //   }
          //   this.eInput.value = value;
          // }
        } else if (value.split('.').length < 3) {
          this.eInput.value = value;
          if (value.split('.').length === 2) {
            if (value.split('.')[1].length > 2) {
              this.eInput.value = value.substring(0, value.length - 1);
            }
          }
        } else {
          this.eInput.value = value.substring(0, value.length - 1);
        }
      } else {
        let dotCheck = true;
        if (value === '-' && this.currentcolumn.includes('ClaimAdjustment')) {
          this.eInput.value = value;
          return;
        }
        const charArray = this.eInput.value.split('');
        this.eInput.value = '';
        for (let i = 0; i < charArray.length; i++) {
          if (!isNaN(charArray[i]) || charArray[i] === '.') {
            if (charArray[i] === '.' && dotCheck) {
              dotCheck = false;
              this.eInput.value += charArray[i];
            } else if (!isNaN(charArray[i]) || charArray[i] !== '.') {
              this.eInput.value += charArray[i];
            }
          }
        }
      }
    });
    // only start edit if key pressed is a number, not a letter
    const charPressIsNotANumber = params.charPress && ('.-1234567890'.indexOf(params.charPress) < 0);
    this.cancelBeforeStart = charPressIsNotANumber;
  }
};

decimalNumericCellEditor.prototype.isKeyPressedNavigation = function (event) {
  return event.keyCode === 39
    || event.keyCode === 37;
};


// gets called once when grid ready to insert the element
decimalNumericCellEditor.prototype.getGui = function () {
  return this.eInput;
};

// focus and select can be done after the gui is attached
decimalNumericCellEditor.prototype.afterGuiAttached = function () {
  this.eInput.focus();
};

// returns the new value after editing
decimalNumericCellEditor.prototype.isCancelBeforeStart = function () {
  return this.cancelBeforeStart;
};

// example - will reject the number if it contains the value 007
// - not very practical, but demonstrates the method.
decimalNumericCellEditor.prototype.isCancelAfterEnd = function () {
  const value = Number(this.getValue());
  return value > 99999999999999.99;
  // return value.indexOf('007') >= 0;
};

// returns the new value after editing
decimalNumericCellEditor.prototype.getValue = function () {
  if (this.eInput.value === '.') {
    return '0.';
  }
  return this.eInput.value;
};

// any cleanup we need to be done here
decimalNumericCellEditor.prototype.destroy = function () {
  // but this example is simple, no cleanup, we could  even leave this method out as it's optional
};

// if true, then this editor will appear in a popup
decimalNumericCellEditor.prototype.isPopup = function () {
  // and we could leave this method out also, false is the default
  return false;
};
