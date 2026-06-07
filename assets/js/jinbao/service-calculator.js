import { RANK_RULES } from './constants.js';
import {
  addMonths,
  clamp,
  getCalendarDday,
  getKstNow,
  monthStartAfter,
  monthsBetween,
  parseDateOnly,
  roundPromotionDate,
  startOfDay,
  startOfMonth,
  wholeDaysBetween
} from './date-utils.js';

function readRequiredDatasetValue(dataset, key) {
  const value = dataset[key];

  if (!value) {
    throw new Error(`Missing mission briefing dataset value: ${key}`);
  }

  return value;
}

function buildDischargeDateTime(date) {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    8,
    0,
    0,
    0
  );
}

function getRankMilestones(entryDate) {
  const rawIlbyeong = addMonths(entryDate, RANK_RULES[0].months);
  const rawSangbyeong = addMonths(entryDate, RANK_RULES[0].months + RANK_RULES[1].months);
  const rawByeongjang = addMonths(entryDate, RANK_RULES[0].months + RANK_RULES[1].months + RANK_RULES[2].months);

  return {
    ilbyeong: roundPromotionDate(rawIlbyeong),
    sangbyeong: roundPromotionDate(rawSangbyeong),
    byeongjang: roundPromotionDate(rawByeongjang)
  };
}

function buildRankStages(entryDate, dischargeDateTime, milestones) {
  return [
    { name: '이병', start: entryDate, end: milestones.ilbyeong, nextName: '일병', nextDate: milestones.ilbyeong },
    { name: '일병', start: milestones.ilbyeong, end: milestones.sangbyeong, nextName: '상병', nextDate: milestones.sangbyeong },
    { name: '상병', start: milestones.sangbyeong, end: milestones.byeongjang, nextName: '병장', nextDate: milestones.byeongjang },
    { name: '병장', start: milestones.byeongjang, end: dischargeDateTime, nextName: '전역', nextDate: dischargeDateTime }
  ];
}

export function createMissionBriefingConfig(dataset) {
  const soldierName = readRequiredDatasetValue(dataset, 'soldierName');
  const entryDate = parseDateOnly(readRequiredDatasetValue(dataset, 'entryDate'));
  const transferDate = parseDateOnly(readRequiredDatasetValue(dataset, 'transferDate'));
  const dischargeDate = parseDateOnly(readRequiredDatasetValue(dataset, 'dischargeDate'));
  const dischargeDateTime = buildDischargeDateTime(dischargeDate);
  const milestones = getRankMilestones(entryDate);
  const totalServiceDays = wholeDaysBetween(entryDate, dischargeDate) + 1;
  const enlistMonthStart = startOfMonth(entryDate);
  const dischargeMonthStart = startOfMonth(dischargeDate);
  const finalHobo = monthsBetween(enlistMonthStart, dischargeMonthStart) + 1;

  return {
    soldierName,
    entryDate,
    transferDate,
    dischargeDateTime,
    totalServiceDays,
    enlistMonthStart,
    finalHobo,
    rankStages: buildRankStages(entryDate, dischargeDateTime, milestones)
  };
}

export function calculateMissionSnapshot(config, now = getKstNow()) {
  const today = startOfDay(now);
  const isBeforeEntry = today < config.entryDate;
  const isDischarged = now >= config.dischargeDateTime;
  const serviceElapsedDays = isBeforeEntry
    ? 0
    : isDischarged
      ? config.totalServiceDays
      : wholeDaysBetween(config.entryDate, today) + 1;
  const remainingServiceDays = Math.max(0, config.totalServiceDays - serviceElapsedDays);
  const transferElapsedDays = today < config.transferDate
    ? 0
    : wholeDaysBetween(config.transferDate, today) + 1;
  const dischargeProgress = clamp((now - config.entryDate) / (config.dischargeDateTime - config.entryDate), 0, 1);
  const dischargeRemainingRatio = 1 - dischargeProgress;
  const dDayToDischarge = isBeforeEntry
    ? getCalendarDday(now, config.entryDate)
    : getCalendarDday(now, config.dischargeDateTime);

  let currentRank = '입대 전';
  let currentStage = config.rankStages[0];

  if (isDischarged) {
    currentRank = '민간인';
    currentStage = config.rankStages[config.rankStages.length - 1];
  } else if (!isBeforeEntry) {
    currentStage = config.rankStages.find((stage) => now < stage.end) || config.rankStages[config.rankStages.length - 1];
    currentRank = currentStage.name;
  }

  const currentMonthStart = startOfMonth(today);
  const currentHobo = isBeforeEntry
    ? 0
    : Math.min(config.finalHobo, monthsBetween(config.enlistMonthStart, currentMonthStart) + 1);
  const nextHobo = isBeforeEntry ? 1 : currentHobo + 1;
  const nextHoboDate = isBeforeEntry
    ? config.entryDate
    : currentHobo >= config.finalHobo
      ? null
      : monthStartAfter(currentMonthStart);
  const hoboIntervalStart = isBeforeEntry
    ? config.entryDate
    : currentHobo <= 1
      ? config.entryDate
      : currentMonthStart;
  const hoboIntervalEnd = nextHoboDate || config.dischargeDateTime;
  const hoboProgress = isBeforeEntry
    ? 0
    : clamp((now - hoboIntervalStart) / (hoboIntervalEnd - hoboIntervalStart), 0, 1);
  const hoboRemaining = 1 - hoboProgress;
  const nextHoboDday = nextHoboDate ? getCalendarDday(now, nextHoboDate) : 0;

  const rankProgress = isBeforeEntry
    ? 0
    : clamp((now - currentStage.start) / (currentStage.end - currentStage.start), 0, 1);
  const rankRemaining = 1 - rankProgress;
  const nextRankName = isBeforeEntry ? '이병' : currentStage.nextName;
  const nextRankDate = isBeforeEntry ? config.entryDate : currentStage.nextDate;
  const nextRankDday = isDischarged ? 0 : getCalendarDday(now, nextRankDate);

  return {
    now,
    isBeforeEntry,
    isDischarged,
    currentRank,
    currentStage,
    currentHobo,
    nextHobo,
    nextHoboDate,
    nextHoboDday,
    nextRankName,
    nextRankDate,
    nextRankDday,
    serviceElapsedDays,
    transferElapsedDays,
    remainingServiceDays,
    dischargeProgress,
    dischargeRemainingRatio,
    dDayToDischarge,
    hoboProgress,
    hoboRemaining,
    rankProgress,
    rankRemaining
  };
}
