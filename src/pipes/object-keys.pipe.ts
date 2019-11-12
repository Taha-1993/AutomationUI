import { PipeTransform, Pipe } from '@angular/core';

@Pipe({ name: 'keyvalue' })
export class KeyValuePipe implements PipeTransform {
    transform(value, args: string[]): any {
        const keys = [];
        for (let key in value) {
            keys.push({key: key, value: value[key]});
        }
        return keys;
    }
}
