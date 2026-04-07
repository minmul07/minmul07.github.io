import { getDaysInPreviousMonth } from './date-utils.js';

export function formatDotDate(date) {
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getDate()).padStart(2, '0')
  ].join('.');
}

export function formatDotDateTime(date) {
  return `${formatDotDate(date)} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
}

export function formatKoreanDate(date) {
  return `${date.getFullYear()}년 ${String(date.getMonth() + 1).padStart(2, '0')}월 ${String(date.getDate()).padStart(2, '0')}일`;
}

export function formatKoreanDateTime(date) {
  const hour = date.getHours();
  const period = hour < 12 ? '오전' : '오후';
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${formatKoreanDate(date)} ${period} ${String(displayHour).padStart(2, '0')}시`;
}

export function formatPercent(value) {
  return `${(value * 100).toFixed(8)}%`;
}

export function buildPreciseRemainText(now, target) {
  if (now >= target) {
    return '전역 완료';
  }

  let years = target.getFullYear() - now.getFullYear();
  let months = target.getMonth() - now.getMonth();
  let days = target.getDate() - now.getDate();
  let hours = target.getHours() - now.getHours();
  let minutes = target.getMinutes() - now.getMinutes();
  let seconds = target.getSeconds() - now.getSeconds();

  if (seconds < 0) {
    seconds += 60;
    minutes -= 1;
  }

  if (minutes < 0) {
    minutes += 60;
    hours -= 1;
  }

  if (hours < 0) {
    hours += 24;
    days -= 1;
  }

  if (days < 0) {
    months -= 1;
    days += getDaysInPreviousMonth(target);
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const centiseconds = Math.floor(((target.getMilliseconds() - now.getMilliseconds() + 1000) % 1000) / 10);
  const pieces = [];

  if (years > 0) {
    pieces.push(`${years}년`);
  }

  if (months > 0 || pieces.length > 0) {
    pieces.push(`${months}개월`);
  }

  pieces.push(`${days}일`);
  pieces.push(`${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(centiseconds).padStart(2, '0')}`);
  pieces.push('남았습니다');

  return pieces.join(' ');
}

export function buildRemainingUnits(now, target, minutesPerUnit) {
  if (now >= target) {
    return '0.000000';
  }

  const remainingMs = target.getTime() - now.getTime();
  const millisecondsPerUnit = minutesPerUnit * 60 * 1000;
  return (remainingMs / millisecondsPerUnit).toFixed(6);
}
