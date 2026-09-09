export function formatTime(durationSeconds: number): string {
  const hours = Math.floor(durationSeconds / 60 / 60);
  const minutes = Math.floor(durationSeconds / 60 - hours * 60);
  const seconds = Math.floor(durationSeconds - hours * 60 * 60 - minutes * 60);

  const formattedTime = `${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(seconds)}`;

  return formattedTime;
}

function formatNumber(number: number): string {
  return number.toString().padStart(2, '0');
}
