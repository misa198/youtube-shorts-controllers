import * as domLoaded from 'dom-loaded';
import SelectorObserver, { observe } from 'selector-observer';
import '../styles/content.scss';
import {
  controllerHtml,
  pauseIconD,
  pauseIconId,
  playIconD,
  playIconId,
} from './constants/controllerHtml';

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
              const _videoElement = videoElement as HTMLVideoElement;
              if (_videoElement.paused) {
                playPauseIcon.setAttribute('d', pauseIconD);
                playPauseIcon.setAttribute('id', pauseIconId);
              } else {
                playPauseIcon.setAttribute('d', playIconD);
                playPauseIcon.setAttribute('id', playIconId);
              }
              playButton.addEventListener('click', () => {
                if (_videoElement.paused) {
                  _videoElement.play();
                } else {
                  _videoElement.pause();
                }
              });
            },
          });
        },
      });
    },
  });
};

start();
