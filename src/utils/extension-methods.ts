import * as _ from 'lodash';

declare global {
    interface Number {
        toCSVNumber(): string;
        toPercentage(): string;
        toDisplayFileSize(): string;
        toFileSize(size: string): Number;
    }

    interface String {
        /**
         * Returns a new string in which a specified string is inserted at a specified index position in this instance.
         * @this {string}
         * @param {number} startIndex The zero-based index position of the insertion
         * @param {string} value The string to insert
         * @returns {string} A new string that is equivalent to this instance, but with value inserted at position startIndex
         * @throws {Error} value is null
         * @throws {RangeError} startIndex is either negative or greater than the length of this instance
         */
        insert(startIndex: number, value: string): string;
    }
}

String.prototype.insert = function(startIndex: number, value: string): string {
    if (!this || this === 'null' || this === 'undefined') {
        return null;
    }

    if (!value) {
        throw new Error('value cannot be null');
    }

    if (startIndex < 0 || startIndex > this.length) {
        throw new RangeError('startIndex is either negative or greater than the length of this instance');
    }

    return String(this).slice(0, startIndex) + value + String(this).slice(startIndex);
};

Number.prototype.toCSVNumber = function(): string {
    return Number(this).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

Number.prototype.toPercentage = function(): string {
    try {
        let val = this;
        if (val && !isNaN(val)) {
            val = parseFloat(val) * 100;
            return val.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, '') + '%';
        } else {
            return val !== 0 ? val : '0.0%';
        }
    } catch (e) {
        return '';
    }
};

Number.prototype.toDisplayFileSize = function(): string {
    const bytes = this;
    if (bytes === 0) { return '0 Bytes'; }
    const k = 1024,
        decimalPoint = 2,
        sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
        i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(decimalPoint)) + ' ' + sizes[i];
};

Number.prototype.toFileSize = function(size: any): Number {
    const bytes = this;
    if (bytes === 0) { return bytes; }
    const k = 1024,
        decimalPoint = 2,
        sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
        i = _.indexOf(sizes, size);
    return Number((bytes / Math.pow(k, i)).toFixed(decimalPoint));
};

export { };
