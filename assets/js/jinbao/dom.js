import {
  buildPreciseRemainText,
  buildRemainingUnits,
  formatDotDate,
  formatDotDateTime,
  formatKoreanDate,
  formatKoreanDateTime,
  formatPercent
} from './formatters.js';

const ELEMENT_IDS = {
  profileRank: 'profile-rank',
  profileName: 'profile-name',
  entryDateText: 'entry-date-text',
  dischargeDateText: 'discharge-date-text',
  remainText: 'remain-text',
  statusDday: 'status-dday',
  statusRankStep: 'status-rank-step',
  statusNextStep: 'status-next-step',
  panelDischargeDate: 'panel-discharge-date',
  barDischarge: 'bar-discharge',
  progressDischarge: 'progress-discharge',
  progressDischargeRemaining: 'progress-discharge-remaining',
  progressDischargeDday: 'progress-discharge-dday',
  nextHoboTarget: 'next-hobo-target',
  nextHoboDate: 'next-hobo-date',
  barHobo: 'bar-hobo',
  progressHobo: 'progress-hobo',
  progressHoboRemaining: 'progress-hobo-remaining',
  progressHoboDday: 'progress-hobo-dday',
  nextRankTarget: 'next-rank-target',
  nextRankDate: 'next-rank-date',
  barRank: 'bar-rank',
  progressRank: 'progress-rank',
  progressRankRemaining: 'progress-rank-remaining',
  progressRankDday: 'progress-rank-dday',
  statTotalDays: 'stat-total-days',
  statCurrentDays: 'stat-current-days',
  statNextRankHotAndCook: 'stat-next-rank-hot-and-cook',
  statNextRankRationIII: 'stat-next-rank-ration-iii',
  statEscapeFromTarkovTime: 'stat-escape-from-tarkov-time',
  statEscapeFromTarkovTimeUntilDischarge: 'stat-escape-from-tarkov-time-until-discharge'
};
const TARKOV_TIME_MULTIPLIER = 7;

function formatTarkovTimeFromDurationMs(durationMs) {
  if (durationMs <= 0) {
    return '0일 00:00:00';
  }

  const scaledSeconds = Math.floor((durationMs * TARKOV_TIME_MULTIPLIER) / 1000);
  const days = Math.floor(scaledSeconds / 86400);
  const hours = Math.floor((scaledSeconds % 86400) / 3600);
  const minutes = Math.floor((scaledSeconds % 3600) / 60);
  const seconds = scaledSeconds % 60;

  return `${days}일 ${String(hours).padStart(2, '0')}시간 ${String(minutes).padStart(2, '0')}분 ${String(seconds).padStart(2, '0')}초`;
}

function formatTarkovTimeFromEnlistment(now, entryDate) {
  return formatTarkovTimeFromDurationMs(now.getTime() - entryDate.getTime());
}

function formatTarkovTimeUntilDischarge(now, dischargeDateTime) {
  return formatTarkovTimeFromDurationMs(dischargeDateTime.getTime() - now.getTime());
}

function getRequiredElement(root, id) {
  const element = root.getElementById(id);

  if (!element) {
    throw new Error(`Missing mission briefing element: #${id}`);
  }

  return element;
}

function formatDdayLabel(days) {
  return days === 0 ? 'D-Day' : `D-${days}`;
}

function setProgressBar(element, value) {
  element.style.width = `${(value * 100).toFixed(8)}%`;
}

export function getMissionBriefingElements(root = document) {
  const app = root.querySelector('.mission-app');

  if (!app) {
    return null;
  }

  const elements = { app };

  for (const [key, id] of Object.entries(ELEMENT_IDS)) {
    elements[key] = getRequiredElement(root, id);
  }

  return elements;
}

export function renderMissionBriefing(elements, config, snapshot) {
  elements.profileRank.textContent = snapshot.isDischarged ? '전역 완료' : snapshot.currentRank;
  elements.profileName.textContent = config.soldierName;
  elements.entryDateText.textContent = formatDotDate(config.entryDate);
  elements.dischargeDateText.textContent = formatDotDateTime(config.dischargeDateTime);
  elements.remainText.textContent = buildPreciseRemainText(snapshot.now, config.dischargeDateTime);

  elements.statusDday.textContent = snapshot.isBeforeEntry
    ? `입대까지 ${formatDdayLabel(snapshot.dDayToDischarge)}`
    : snapshot.isDischarged
      ? '전역 완료'
      : formatDdayLabel(snapshot.dDayToDischarge);

  elements.statusRankStep.textContent = snapshot.isBeforeEntry
    ? '입대 전'
    : snapshot.isDischarged
      ? '예비역 전환'
      : `${snapshot.currentRank} ${snapshot.currentHobo}호봉`;

  elements.statusNextStep.textContent = snapshot.isBeforeEntry
    ? `입대 예정 ${formatDdayLabel(snapshot.dDayToDischarge)}`
    : snapshot.nextHoboDate
      ? `다음 호봉까지 ${formatDdayLabel(snapshot.nextHoboDday)}`
      : '마지막 호봉 구간';

  elements.panelDischargeDate.textContent = formatKoreanDateTime(config.dischargeDateTime);
  elements.progressDischarge.textContent = formatPercent(snapshot.dischargeProgress);
  elements.progressDischargeRemaining.textContent = `남은 비율 ${formatPercent(snapshot.dischargeRemainingRatio)}`;
  elements.progressDischargeDday.textContent = snapshot.isDischarged
    ? '복무 종료'
    : formatDdayLabel(snapshot.dDayToDischarge);
  setProgressBar(elements.barDischarge, snapshot.dischargeProgress);

  elements.nextHoboTarget.textContent = snapshot.isBeforeEntry
    ? '이병 1호봉'
    : snapshot.nextHoboDate
      ? `${snapshot.currentRank} ${snapshot.nextHobo}호봉`
      : '마지막 호봉';
  elements.nextHoboDate.textContent = snapshot.nextHoboDate
    ? formatKoreanDate(snapshot.nextHoboDate)
    : '전역 전 마지막 구간';
  elements.progressHobo.textContent = formatPercent(snapshot.hoboProgress);
  elements.progressHoboRemaining.textContent = `남은 비율 ${formatPercent(snapshot.hoboRemaining)}`;
  elements.progressHoboDday.textContent = snapshot.nextHoboDate
    ? formatDdayLabel(snapshot.nextHoboDday)
    : '추가 호봉 없음';
  setProgressBar(elements.barHobo, snapshot.hoboProgress);

  elements.nextRankTarget.textContent = snapshot.isDischarged ? '전역' : snapshot.nextRankName;
  elements.nextRankDate.textContent = formatKoreanDate(snapshot.nextRankDate);
  elements.progressRank.textContent = formatPercent(snapshot.rankProgress);
  elements.progressRankRemaining.textContent = `남은 비율 ${formatPercent(snapshot.rankRemaining)}`;
  elements.progressRankDday.textContent = snapshot.isDischarged
    ? '진급 종료'
    : formatDdayLabel(snapshot.nextRankDday);
  setProgressBar(elements.barRank, snapshot.rankProgress);

  elements.statTotalDays.textContent = `${config.totalServiceDays.toLocaleString('ko-KR')}일`;
  elements.statCurrentDays.textContent = `${snapshot.serviceElapsedDays.toLocaleString('ko-KR')}일`;

  const hotAndCookRemaining = snapshot.isDischarged
    ? '0.000000개'
    : `${buildRemainingUnits(snapshot.now, config.dischargeDateTime, 10)}개`;

  const rationIIIRemaining = snapshot.isDischarged
    ? '0.000000개'
    : `${buildRemainingUnits(snapshot.now, config.dischargeDateTime, 15)}개`;

  elements.statNextRankHotAndCook.textContent = hotAndCookRemaining;
  elements.statNextRankRationIII.textContent = rationIIIRemaining;
  elements.statEscapeFromTarkovTime.textContent = snapshot.isBeforeEntry
    ? '0일 00:00:00'
    : formatTarkovTimeFromEnlistment(snapshot.now, config.entryDate);
  elements.statEscapeFromTarkovTimeUntilDischarge.textContent = snapshot.isBeforeEntry || snapshot.isDischarged
    ? '0일 00:00:00'
    : formatTarkovTimeUntilDischarge(snapshot.now, config.dischargeDateTime);
}
