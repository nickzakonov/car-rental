export function estimate(duration: number, rate: number) {
  let cost;

  if (duration > 17) {
    cost = rate * (4 + 5 * 0.95 + 8 * 0.9 + (duration - 17) * 0.85);
  } else if (duration > 9) {
    cost = rate * (4 + 5 * 0.95 + (duration - 9) * 0.9);
  } else if (duration > 4) {
    cost = rate * (4 + (duration - 4) * 0.95);
  } else {
    cost = rate * duration;
  }

  return cost;
}

export function calculateDuration(startDate: string, endDate: string) {
  return Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 3600 * 24));
}
