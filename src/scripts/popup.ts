import { timeSteps } from './constants/config';
import { get, set } from './utils/storage';
import { TIME_STEP_KEY } from './constants/config';
import '../styles/popup.scss';

const timeSelector = document.querySelector('.select') as HTMLSelectElement;
timeSteps.forEach((time) => {
  const option = document.createElement('option') as HTMLOptionElement;
  option.value = time.toString();
  option.innerText = `${time}s`;
  timeSelector.appendChild(option);
});

let timeStep: number = 5;

get([TIME_STEP_KEY], (items) => {
  if (
    !items[TIME_STEP_KEY] ||
    !timeSteps.includes(parseInt(items[TIME_STEP_KEY], 10))
  ) {
    timeStep = timeSteps[1];
    set({ [TIME_STEP_KEY]: timeStep });
  } else {
    timeStep = parseInt(items[TIME_STEP_KEY], 10);
  }
  timeSelector.value = timeStep.toString();
});

timeSelector.addEventListener('change', (e) => {
  timeStep = parseInt((e.target as HTMLSelectElement).value, 10);
  if (timeSteps.includes(timeStep)) {
    set({ [TIME_STEP_KEY]: timeStep });
  }
});
