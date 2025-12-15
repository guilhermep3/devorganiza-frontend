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