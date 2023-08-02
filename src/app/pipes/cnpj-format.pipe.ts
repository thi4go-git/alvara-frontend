import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'cnpjFormat' })
export class CnpjFormatPipe implements PipeTransform {
    transform(cnpj: string): string {
        if (!cnpj || cnpj.length !== 14) {
            return cnpj;
        }

        cnpj = cnpj.substring(0, 2) + '.' +
            cnpj.substring(2, 5) + '.' +
            cnpj.substring(5, 8) + '/' +
            cnpj.substring(8, 12) + '-' +
            cnpj.substring(cnpj.length - 2);
        return cnpj;
    }
}