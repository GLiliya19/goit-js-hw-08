import Player from '@vimeo/player';

import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const currentTime = 'videoplayer-current-time';
const localStorageSet = function (event) {
  const startVideo = Number(event.seconds);
  localStorage.setItem(currentTime, startVideo);
};

const onPlayer = player.on('timeupdate', throttle(localStorageSet, 1000));

player
  .setCurrentTime(localStorage.getItem(currentTime))
  .then(function (seconds) {
    // seconds = the actual time that the player seeked to
  })
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        // the time was less than 0 or greater than the video’s duration
        break;

      default:
        // some other error occurred
        break;
    }
  });
