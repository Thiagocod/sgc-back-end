import { toZonedTime } from 'date-fns-tz';
import { format } from 'date-fns';

export function dateNowPrice(setDate: Date) {
    const now = setDate;
    const timeZone = 'America/Sao_Paulo';
    const zonedDate = toZonedTime(now, timeZone);
    const formattedData = format(zonedDate, 'yyyy-MM-dd');
    return formattedData; // Retorna a string formatada
}