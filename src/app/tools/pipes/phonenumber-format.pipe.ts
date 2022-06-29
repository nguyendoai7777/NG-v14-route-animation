import { Pipe, PipeTransform } from "@angular/core";

const PHONE_NUMBER_REGEX = /^(\d{2})(\d{4})(\d{4})$/;

@Pipe({standalone: true, name: 'phoneNumberFormat'})
export class PhoneNumberFormatPipe implements PipeTransform {
  /*transform(value: string) {
    if(!value) {
      return value;
    }
    const newValue = value.trim();
    const reFormatValue = ('' + newValue).replace(/\D/g, '');
    const match = reFormatValue.match(PHONE_NUMBER_REGEX);
    if(!match) {
      return reFormatValue;
    }
    return match[1] + ' ' + match[2] + ' ' + match[3];
  }*/

  transform(value: string, type: '10' | 'free' = '10'): string {
    if(!value) {
      return value;
    }
    const newValue = value.trim();
    const reFormatValue = ('' + newValue).replace(/\D/g, '');
    if(type === '10') {
      /*const match = reFormatValue.match(PHONE_NUMBER_REGEX);
      if(!match) {
        return reFormatValue;
      }
      return match[1] + ' ' + match[2] + ' ' + match[3];*/
      return reFormatValue.replace(PHONE_NUMBER_REGEX, '$1 $2 $3');
    }
      const phone = reFormatValue.split('');
    let jump = 2;
      for(let i = 0; i < phone.length; i++) {
        if(i === 2 || i === 6 || i === 10 || i === 14) {
          phone[i] = ' ' + phone[i];
        }
      }
    return  phone.join('');
  }
}
