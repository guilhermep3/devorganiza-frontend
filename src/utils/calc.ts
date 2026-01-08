export function calculateDifference(today: number, yesterday: number) {
  if (today === 0 && yesterday === 0) return 0
  if (today > 0 && yesterday === 0) return 100

  return ((today - yesterday) / yesterday) * 100
}

export function formatPercentage(value: number) {
  const abs = Math.abs(value)

  return Number.isInteger(abs)
    ? abs.toString()
    : abs.toFixed(2)
}

export function handleTimeFormat(value: number, format: 'short' | 'long') {
  const totalSeconds = Math.floor(value * 60);

  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (format === 'short') {
    return `${days > 0 ? `${days}d ` : ''}${hours > 0 ? `${hours}:` : ''}${minutes.toString()
      .padStart(2, '0')}:${seconds
      .toString().padStart(2, '0')}`;
  } else {
    return `${days > 0 ? `${days}d ` : ''}${hours > 0 ? `${hours}h ` : ''}${minutes}m ${seconds
      .toString().padStart(2, '0')}s`;
  }
}