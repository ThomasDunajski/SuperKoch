import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'TextFilterPipe',
    pure: false
})
export class TextFilterPipe implements PipeTransform {
    transform(items: any[], filter: Object): any {
        if (!items || !filter) {
            return items;
        }
        console.log(filter);
        return items.filter(item => item.name.indexOf(filter) !== -1);
    }
}