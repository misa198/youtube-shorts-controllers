import * as domLoaded from 'dom-loaded';
import SelectorObserver, { observe } from 'selector-observer';
import '../styles/content.scss';
import { TIME_STEP_KEY } from './constants/config';
import {
  controllerHtml,
  pauseIconD,
  pauseIconId,
  playIconD,
  playIconId,
  mutedIconD,
  mutedIconId,
  unmuteIconD,
  unmuteIconId,
} from './constants/controllerHtml';
import { get } from './utils/storage';

const start = async () => {
  await domLoaded;

  observe('#shorts-container', {
    add(shortContainer) {
      const shortContainerObserver = new SelectorObserver(shortContainer);
      shortContainerObserver.observe('#player-container', {
        add(playerContainer) {
          playerContainer.insertAdjacentHTML('beforeend', controllerHtml);
          const playerContainerObserver = new SelectorObserver(playerContainer);
          const playButton = playerContainer.querySelector(
            'button.shorts-controller__button--play'
          ) as HTMLButtonElement;
          const playPauseIcon = playButton.querySelector(
            '.play-pause-icon-path'
          ) as HTMLButtonElement;
          const speakerIconPath = playerContainer.querySelector(
            '.speaker-icon-path'
          ) as HTMLButtonElement;
          const muteButton = playerContainer.querySelector(
            '.mute-button'
          ) as HTMLButtonElement;
          const forwardButton = playerContainer.querySelector(
            '.forward-button'
          ) as HTMLButtonElement;
          const rewindButton = playerContainer.querySelector(
            '.rewind-button'
          ) as HTMLButtonElement;
          const processbarThumb = playerContainer.querySelector(
            '.processbar__thumb'
          ) as HTMLDivElement;

          playerContainerObserver.observe('video', {
            add(videoElement) {
              videoElement.addEventListener('play', () => {
                playPauseIcon.setAttribute('d', playIconD);
                playButton.setAttribute('id', playIconId);
              });
              videoElement.addEventListener('pause', () => {
                playPauseIcon.setAttribute('d', pauseIconD);
                playButton.setAttribute('id', pauseIconId);
              });
              videoElement.addEventListener('volumechange', () => {
                if (_videoElement.muted) {
                  speakerIconPath.setAttribute('d', mutedIconD);
                  speakerIconPath.setAttribute('id', mutedIconId);
                } else {
                  speakerIconPath.setAttribute('d', unmuteIconD);
                  speakerIconPath.setAttribute('id', unmuteIconId);
                }
              });

              const _videoElement = videoElement as HTMLVideoElement;
              videoElement.addEventListener('timeupdate', () => {
                const duration = _videoElement.duration;
                const currentTime = _videoElement.currentTime;
                const processbarWidth = (currentTime / duration) * 100 + '%';
                processbarThumb.style.width = processbarWidth;
              });
              if (_videoElement.paused) {
                playPauseIcon.setAttribute('d', pauseIconD);
                playPauseIcon.setAttribute('id', pauseIconId);
              } else {
                playPauseIcon.setAttribute('d', playIconD);
                playPauseIcon.setAttribute('id', playIconId);
              }
              if (_videoElement.muted) {
                speakerIconPath.setAttribute('d', mutedIconD);
                speakerIconPath.setAttribute('id', pauseIconId);
              } else {
                speakerIconPath.setAttribute('d', unmuteIconD);
                speakerIconPath.setAttribute('id', unmuteIconId);
              }

              playButton.addEventListener('click', () => {
                if (_videoElement.paused) {
                  _videoElement.play();
                } else {
                  _videoElement.pause();
                }
              });

              muteButton.addEventListener('click', () => {
                if (_videoElement.muted) {
                  _videoElement.muted = false;
                } else {
                  _videoElement.muted = true;
                }
              });

              forwardButton.addEventListener('click', () => {
                get([TIME_STEP_KEY], (items) => {
                  _videoElement.currentTime += parseInt(
                    items[TIME_STEP_KEY],
                    10
                  );
                });
              });
              rewindButton.addEventListener('click', () => {
                get([TIME_STEP_KEY], (items) => {
                  _videoElement.currentTime -= parseInt(
                    items[TIME_STEP_KEY],
                    10
                  );
                });
              });
            },
          });
        },
      });
    },
  });
};

start();
