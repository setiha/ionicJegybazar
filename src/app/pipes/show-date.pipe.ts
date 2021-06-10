import {NgModule, Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';
import {TicketPage} from "../ticket/ticket.page";

@Pipe({
  name: 'showDate'
})
export class ShowDatePipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    let date = moment.unix(value);
    return date.format('YYYY.MM.DD');
  }

}
