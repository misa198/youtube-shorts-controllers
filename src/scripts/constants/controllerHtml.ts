export const controllerHtml = `
<div id="shorts-controller-overlay">
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
