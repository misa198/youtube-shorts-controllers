export const convertSecondsToTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds - hours * 3600) / 60);
  const secondsLeft = Math.floor(seconds - hours * 3600 - minutes * 60);
  if (hours === 0) {
    return `${minutes}:${secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft}`;
  }
  return `${hours}:${minutes < 10 ? `0${minutes}` : minutes}:${
    secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft
  }`;
};
