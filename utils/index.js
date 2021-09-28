export function _uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) { var r = Math.random() * 16 | 0, v = c == 'x' ? r : r & 0x3 | 0x8; return v.toString(16); });
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * 
 * @param {string} dateStr 
 * @returns string
 */
export function getYearSeason(dateStr) {
  const date = new Date(dateStr)
  const month = date.getMonth() + 1
  const year = date.getUTCFullYear()
  if (1 <= month && month <= 3) {
    return year + '-Q1';
  }

  if (4 <= month && month <= 6) {
    return year + '-Q2';
  }

  if (7 <= month && month <= 9) {
    return year + '-Q3';
  }

  return year + '-Q4';
}
