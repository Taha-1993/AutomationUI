import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'showOverlay'})
export class LoadingOverlayPipe implements PipeTransform {
    transform(value: number) {
        return value ? 'block' : 'none';
    }
}
