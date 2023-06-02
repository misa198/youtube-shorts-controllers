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
import { convertSecondsToTime } from './utils/time';

const start = async () => {
  await domLoaded;

  observe('#shorts-container', {
    add(shortContainer) {
      const shortContainerObserver = new SelectorObserver(shortContainer);
      shortContainerObserver.observe(
        '.reel-video-in-sequence.style-scope.ytd-shorts #overlay',
        {
          add(overlayController) {
            const player =
              overlayController?.parentElement?.parentElement?.parentElement?.querySelector(
                '#player-container'
              ) as HTMLDivElement;
            overlayController.insertAdjacentHTML('beforeend', controllerHtml);
            const additionalController = overlayController.querySelector(
              '#shorts-controller-overlay'
            ) as HTMLDivElement;
            const playerContainerObserver = new SelectorObserver(player);
            const playButton = overlayController.querySelector(
              'button.shorts-controller__button--play'
            ) as HTMLButtonElement;
            const playPauseIcon = playButton.querySelector(
              '.play-pause-icon-path'
            ) as HTMLButtonElement;
            const speakerIconPath = overlayController.querySelector(
              '.speaker-icon-path'
            ) as HTMLButtonElement;
            const muteButton = overlayController.querySelector(
              '.mute-button'
            ) as HTMLButtonElement;
            const forwardButton = overlayController.querySelector(
              '.forward-button'
            ) as HTMLButtonElement;
            const rewindButton = overlayController.querySelector(
              '.rewind-button'
            ) as HTMLButtonElement;
            const processbarThumb = overlayController.querySelector(
              '.processbar__thumb'
            ) as HTMLDivElement;
            const processBar = overlayController.querySelector(
              '.processbar'
            ) as HTMLDivElement;
            const timeDisplay = overlayController.querySelector(
              '.buttons-session__process'
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

                player.parentElement?.addEventListener('mouseover', () => {
                  if (
                    !additionalController.classList.contains(
                      'shorts-controller-overlay--active'
                    )
                  ) {
                    additionalController.classList.add(
                      'shorts-controller-overlay--active'
                    );
                  }
                });
                player.parentElement?.addEventListener('mouseout', () => {
                  if (
                    additionalController.classList.contains(
                      'shorts-controller-overlay--active'
                    )
                  ) {
                    additionalController.classList.remove(
                      'shorts-controller-overlay--active'
                    );
                  }
                });

                const _videoElement = videoElement as HTMLVideoElement;
                const isPlaying = () =>
                  _videoElement.currentTime > 0 &&
                  !_videoElement.paused &&
                  !_videoElement.ended &&
                  _videoElement.readyState > _videoElement.HAVE_CURRENT_DATA;

                videoElement.addEventListener('timeupdate', () => {
                  const duration = _videoElement.duration;
                  const currentTime = _videoElement.currentTime;
                  const processbarWidth = (currentTime / duration) * 100 + '%';
                  processbarThumb.style.width = processbarWidth;
                  timeDisplay.innerHTML = `${convertSecondsToTime(
                    currentTime
                  )}/${convertSecondsToTime(duration)}`;
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

                playButton.addEventListener('mouseup', () => {
                  if (!isPlaying()) {
                    _videoElement.play();
                  } else {
                    _videoElement.pause();
                  }
                });

                muteButton.addEventListener('click', () => {
                  _videoElement.muted = !_videoElement.muted;
                });

                forwardButton.addEventListener('click', () => {
                  get([TIME_STEP_KEY], (items) => {
                    _videoElement.currentTime +=
                      parseInt(items[TIME_STEP_KEY], 10) || 5;
                  });
                });
                rewindButton.addEventListener('click', () => {
                  get([TIME_STEP_KEY], (items) => {
                    _videoElement.currentTime -=
                      parseInt(items[TIME_STEP_KEY], 10) || 5;
                  });
                });

                overlayController.parentElement?.parentElement?.parentElement?.addEventListener(
                  'keydown',
                  (e) => {
                    switch ((e as KeyboardEvent).key) {
                      case 'ArrowLeft':
                        rewindButton.click();
                        break;
                      case 'ArrowRight':
                        forwardButton.click();
                        break;
                    }
                  }
                );

                if (processBar) {
                  const move = (e: MouseEvent) => {
                    const _e = e as MouseEvent;

                    const thumbOffsetLeft =
                      processbarThumb.getBoundingClientRect().left;
                    const processbarWidth = processBar.clientWidth;
                    if (
                      _e.clientX >= thumbOffsetLeft &&
                      _e.clientX <= processbarWidth + thumbOffsetLeft
                    ) {
                      const currentPos = _e.clientX - thumbOffsetLeft;
                      const movePercent = (currentPos / processbarWidth) * 100;
                      if (movePercent > 100) {
                        processbarThumb.style.width = '100%';
                      } else if (movePercent < 0) {
                        processbarThumb.style.width = '0%';
                      } else {
                        processbarThumb.style.width = movePercent + '%';
                      }
                    }
                  };

                  const continueVideo = () => {
                    const movePercent =
                      parseFloat(processbarThumb.style.width) / 100;
                    const currentTime = _videoElement.duration * movePercent;
                    if (currentTime) {
                      _videoElement.currentTime = currentTime;

                      if (!isPlaying()) {
                        _videoElement.play();
                      }
                    }
                  };

                  processBar.addEventListener('click', (e) => {
                    if (isPlaying()) {
                      _videoElement.pause();
                    }
                    move(e);
                    continueVideo();
                  });

                  processBar.addEventListener('mousedown', (e) => {
                    if (isPlaying()) {
                      _videoElement.pause();
                    }
                    document.addEventListener('mousemove', move);
                  });

                  document.addEventListener('mouseup', () => {
                    document.removeEventListener('mousemove', move);
                    continueVideo();
                  });
                }
              },
            });
          },
        }
      );
    },
  });
};

start();
