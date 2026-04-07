import { KST_ZONE, MS_PER_DAY } from './constants.js';

export function parseDateOnly(value) {
  const [year, month, day] = value.split('-').map(Number);
  return new Date(year, month - 1, day);
}

export function getKstNow() {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: KST_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });

  const parts = {};

  for (const part of formatter.formatToParts(now)) {
    if (part.type !== 'literal') {
      parts[part.type] = part.value;
    }
  }

  return new Date(
    Number(parts.year),
    Number(parts.month) - 1,
    Number(parts.day),
    Number(parts.hour),
    Number(parts.minute),
    Number(parts.second),
    now.getMilliseconds()
  );
}

export function startOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function startOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function addMonths(date, months) {
  return new Date(date.getFullYear(), date.getMonth() + months, date.getDate());
}

export function monthStartAfter(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 1);
}

export function roundPromotionDate(date) {
  if (date.getDate() === 1) {
    return startOfDay(date);
  }

  return monthStartAfter(date);
}

export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export function wholeDaysBetween(start, end) {
  return Math.round((startOfDay(end) - startOfDay(start)) / MS_PER_DAY);
}

export function monthsBetween(startMonth, endMonth) {
  return (endMonth.getFullYear() - startMonth.getFullYear()) * 12 + (endMonth.getMonth() - startMonth.getMonth());
}

export function getDaysInPreviousMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 0).getDate();
}

export function getCalendarDday(now, target) {
  const today = startOfDay(now);
  const targetDay = startOfDay(target);

  if (today.getTime() === targetDay.getTime()) {
    return 0;
  }

  return Math.max(0, wholeDaysBetween(today, targetDay));
}
