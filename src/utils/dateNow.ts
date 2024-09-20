import {toDate, toZonedTime } from 'date-fns-tz';
import { format } from 'date-fns';
export function dateNow (setDate: Date){
    const now = setDate;
    const timeZone = 'America/Sao_Paulo';
    const zonedDate = toZonedTime(now, timeZone);
    const createAt = format(zonedDate,'yyyy-MM-dd HH:mm');
    return toDate(createAt) 
}