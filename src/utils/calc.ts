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

export function formatTimeToMMSS(value: number, format: 'short' | 'long') {
  const totalSeconds = Math.round(value * 60)
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);

  if (format === 'short') {
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  } else {
    return `${minutes} m ${seconds.toString().padStart(2, '0')} s`
  }
}