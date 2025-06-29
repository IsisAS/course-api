"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDates = formatDates;
const date_fns_1 = require("date-fns");
const locales = __importStar(require("date-fns/locale"));
/**
 * Formats dates to dd/mm/yyyy hh:mm:ss format
 * considering the timezone of the country defined in COUNTRY_CODE
 * @param data Object or array of objects containing createdAt and/or updatedAt
 * @returns The same object or array with formatted dates
 */
function formatDates(data) {
    const localeKey = process.env.COUNTRY_LOCALES || 'ptBR';
    const locale = locales[localeKey] || locales.ptBR;
    const formatDate = (date) => {
        if (!date)
            return '';
        return (0, date_fns_1.format)(new Date(date), 'dd/MM/yyyy HH:mm:ss', { locale });
    };
    const formatVisitDate = (date) => {
        if (!date)
            return '';
        return (0, date_fns_1.format)(date, 'yyyy-MM-dd', {
            locale: locales[process.env.COUNTRY_LOCALES || 'ptBR'] || locales.ptBR
        });
    };
    const formatDateISO = (date) => {
        if (!date)
            return '';
        const dateObj = date instanceof Date ? date : new Date(date);
        if (isNaN(dateObj.getTime())) {
            return '';
        }
        return dateObj.toISOString().replace(/Z$/, '');
    };
    const processItem = (item) => {
        const result = { ...item };
        if (result.createdAt && result.createdAt instanceof Date) {
            result.createdAt = formatDate(result.createdAt);
        }
        if (result.updatedAt && result.updatedAt instanceof Date) {
            result.updatedAt = formatDate(result.updatedAt);
        }
        if (result.date) {
            result.date = formatDateISO(result.date);
        }
        if (result.visitDate) {
            const visitDate = result.visitDate instanceof Date ? result.visitDate : new Date(result.visitDate);
            result.visitDate = formatVisitDate(visitDate);
        }
        return result;
    };
    if (Array.isArray(data)) {
        return data.map(processItem);
    }
    else {
        return processItem(data);
    }
}
//# sourceMappingURL=format-date.js.map