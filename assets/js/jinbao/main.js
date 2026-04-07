import { TICK_INTERVAL_MS } from './constants.js';
import { getMissionBriefingElements, renderMissionBriefing } from './dom.js';
import { calculateMissionSnapshot, createMissionBriefingConfig } from './service-calculator.js';

const elements = getMissionBriefingElements(document);

if (elements) {
  const config = createMissionBriefingConfig(elements.app.dataset);

  const render = () => {
    const snapshot = calculateMissionSnapshot(config);
    renderMissionBriefing(elements, config, snapshot);
  };

  render();
  window.setInterval(render, TICK_INTERVAL_MS);
}
