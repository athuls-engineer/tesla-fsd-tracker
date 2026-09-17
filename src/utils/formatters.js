// Utility functions for formatting numbers, distances, and dates

export const MILES_TO_KM = 1.609344;

/**
 * Format a number with standard comma grouping (e.g. 14,586,254,064)
 */
export function formatNumber(num, decimals = 0) {
  if (num === null || num === undefined || isNaN(num)) return '0';
  const parts = Number(num).toFixed(decimals).split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
}

/**
 * Format distance with unit
 */
export function formatDistance(miles, unit = 'miles', decimals = 0) {
  const value = unit === 'km' ? miles * MILES_TO_KM : miles;
  return formatNumber(value, decimals);
}

/**
 * Format distance compactly (e.g. 14.59B)
 */
export function formatCompact(value) {
  if (value >= 1e9) {
    return (value / 1e9).toFixed(2) + 'B';
  }
  if (value >= 1e6) {
    return (value / 1e6).toFixed(2) + 'M';
  }
  if (value >= 1e3) {
    return (value / 1e3).toFixed(1) + 'K';
  }
  return formatNumber(value, 0);
}

/**
 * Calculate countdown breakdown until target milestone
 */
export function getTimeUntilTarget(remainingDistance, ratePerSecond) {
  if (remainingDistance <= 0 || ratePerSecond <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, totalSeconds: 0 };
  }
  
  const totalSeconds = Math.floor(remainingDistance / ratePerSecond);
  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  
  return { days, hours, minutes, seconds, totalSeconds };
}
