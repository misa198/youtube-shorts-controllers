export const controllerHtml = `
<div id="shorts-controller-overlay">
  <div class="mute-button">
    <svg height="100%" version="1.1" viewBox="0 0 36 36" width="100%">
      <path
        class="ytp-svg-fill ytp-svg-volume-animation-speaker speaker-icon-path"
        clip-path="url(#ytp-svg-volume-animation-mask)"
        d="M8,21 L12,21 L17,26 L17,10 L12,15 L8,15 L8,21 Z M19,14 L19,22 C20.48,21.32 21.5,19.77 21.5,18 C21.5,16.26 20.48,14.74 19,14 ZM19,11.29 C21.89,12.15 24,14.83 24,18 C24,21.17 21.89,23.85 19,24.71 L19,26.77 C23.01,25.86 26,22.28 26,18 C26,13.72 23.01,10.14 19,9.23 L19,11.29 Z"
        fill="#fff"
        id="ytp-id-14"
      ></path>
      <path
    </svg>
  </div>
  <div class="shorts-controller">
    <div class="shorts-controller__buttons">
      <button class="ytp-prev-button ytp-button shorts-controller__button">
        <svg height="100%" version="1.1" viewBox="0 0 36 36" width="100%">
          <path
            class="ytp-svg-fill"
            d="m 12,12 h 2 v 12 h -2 z m 3.5,6 8.5,6 V 12 z"
            id="ytp-id-10"
          ></path>
        </svg>
      </button>
      <button class="ytp-play-button ytp-button shorts-controller__button shorts-controller__button--play">
        <svg height="100%" version="1.1" viewBox="0 0 36 36" width="100%">
          <path
            class="ytp-svg-fill play-pause-icon-path"
            d="M 12,26 18.5,22 18.5,14 12,10 z M 18.5,22 25,18 25,18 18.5,14 z"
            id="ytp-id-47"
          ></path>
        </svg>
      </button>
      <button class="ytp-next-button ytp-button shorts-controller__button">
        <svg height="100%" version="1.1" viewBox="0 0 36 36" width="100%">
          <path
            class="ytp-svg-fill"
            d="M 12,24 20.5,18 12,12 V 24 z M 22,12 v 12 h 2 V 12 h -2 z"
            id="ytp-id-12"
          ></path>
        </svg>
      </button>
    </div>
  </div>
</div>
`;

export const pauseIconD =
  'M 12,26 18.5,22 18.5,14 12,10 z M 18.5,22 25,18 25,18 18.5,14 z';
export const pauseIconId = 'ytp-id-47';

export const playIconD =
  'M 12,26 16,26 16,10 12,10 z M 21,26 25,26 25,10 21,10 z';
export const playIconId = 'ytp-id-883';

export const mutedIconD =
  'm 21.48,17.98 c 0,-1.77 -1.02,-3.29 -2.5,-4.03 v 2.21 l 2.45,2.45 c .03,-0.2 .05,-0.41 .05,-0.63 z m 2.5,0 c 0,.94 -0.2,1.82 -0.54,2.64 l 1.51,1.51 c .66,-1.24 1.03,-2.65 1.03,-4.15 0,-4.28 -2.99,-7.86 -7,-8.76 v 2.05 c 2.89,.86 5,3.54 5,6.71 z M 9.25,8.98 l -1.27,1.26 4.72,4.73 H 7.98 v 6 H 11.98 l 5,5 v -6.73 l 4.25,4.25 c -0.67,.52 -1.42,.93 -2.25,1.18 v 2.06 c 1.38,-0.31 2.63,-0.95 3.69,-1.81 l 2.04,2.05 1.27,-1.27 -9,-9 -7.72,-7.72 z m 7.72,.99 -2.09,2.08 2.09,2.09 V 9.98 z';
export const mutedIconId = 'ytp-id-999';

export const unmuteIconD =
  'M8,21 L12,21 L17,26 L17,10 L12,15 L8,15 L8,21 Z M19,14 L19,22 C20.48,21.32 21.5,19.77 21.5,18 C21.5,16.26 20.48,14.74 19,14 ZM19,11.29 C21.89,12.15 24,14.83 24,18 C24,21.17 21.89,23.85 19,24.71 L19,26.77 C23.01,25.86 26,22.28 26,18 C26,13.72 23.01,10.14 19,9.23 L19,11.29 Z';
export const unmuteIconId = 'ytp-id-14';
