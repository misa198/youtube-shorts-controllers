import * as domLoaded from 'dom-loaded';
import { observe } from 'selector-observer';
import '../styles/content.scss';

const observeStyle = () => {
  const mutationObserver = new MutationObserver((mutations) => {
    console.log(mutations[0]);
  });
};

const start = async () => {
  await domLoaded;

  observe('#player-container', {
    add(playerContainer) {
      const shortsControllerOverlay = document.createElement('div');
      const videoElement = playerContainer.getElementsByClassName(
        'video-stream html5-main-video'
      );

      shortsControllerOverlay.id = 'shorts-controller-overlay';

      playerContainer.appendChild(shortsControllerOverlay);
    },
  });
};

start();
