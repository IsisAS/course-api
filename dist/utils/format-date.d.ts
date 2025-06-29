/**
 * Formats dates to dd/mm/yyyy hh:mm:ss format
 * considering the timezone of the country defined in COUNTRY_CODE
 * @param data Object or array of objects containing createdAt and/or updatedAt
 * @returns The same object or array with formatted dates
 */
export declare function formatDates<T extends Record<string, any>>(data: T | T[]): T | T[];
//# sourceMappingURL=format-date.d.ts.map