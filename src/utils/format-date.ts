import { format } from 'date-fns';
import * as locales from 'date-fns/locale';

/**
 * Formats dates to dd/mm/yyyy hh:mm:ss format
 * considering the timezone of the country defined in COUNTRY_CODE
 * @param data Object or array of objects containing createdAt and/or updatedAt
 * @returns The same object or array with formatted dates
 */
export function formatDates<T extends Record<string, any>>(data: T | T[]): T | T[] {
  const localeKey = process.env.COUNTRY_LOCALES || 'ptBR';
  
  const locale = locales[localeKey as keyof typeof locales] || locales.ptBR;
  
  const formatDate = (date: Date): string => {
    if (!date) return '';
    
    return format(new Date(date), 'dd/MM/yyyy HH:mm:ss', { locale });
  };

  const formatVisitDate = (date: Date): string => {
    if (!date) return '';

    return format(date, 'yyyy-MM-dd', {
      locale: locales[
        (process.env.COUNTRY_LOCALES as keyof typeof locales) || 'ptBR'
      ] || locales.ptBR
    });
  };

  const formatDateISO = (date: Date | string | null | undefined): string => {
    if (!date) return '';
    
    const dateObj = date instanceof Date ? date : new Date(date);
    
    if (isNaN(dateObj.getTime())) {
      return '';
    }
    
    return dateObj.toISOString().replace(/Z$/, '');
  };
  
  const processItem = (item: T): T => {
    const result = { ...item };
    
    if (result.createdAt && result.createdAt instanceof Date) {
      (result as any).createdAt = formatDate(result.createdAt as Date);
    }
    
    if (result.updatedAt && result.updatedAt instanceof Date) {
      (result as any).updatedAt = formatDate(result.updatedAt as Date);
    }

    if (result.date) {
      (result as any).date = formatDateISO(result.date);
    }

    if (result.visitDate) {
      const visitDate = result.visitDate instanceof Date ? result.visitDate : new Date(result.visitDate);
      (result as any).visitDate = formatVisitDate(visitDate);
    }
    
    return result;
  };
  
  if (Array.isArray(data)) {
    return data.map(processItem);
  } else {
    return processItem(data);
  }
}