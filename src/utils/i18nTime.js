let momentZone = require('moment-timezone');
let moment = require('moment');
let timeType = moment.tz.guess(true);
/**
 * 根据utc时间获取本地时间
 * @param {*} utcDate
 */
export const formateUtcToTime = (utcDate, format = 'DD/MM/YYYY HH:mm:ss') => {
  // eslint-disable-next-line no-undefined
  if (utcDate === null || utcDate === '' || utcDate === undefined) {
    return '';
  }
  if (!isNaN(Number(utcDate))) {
    return momentZone.tz(Number(utcDate), timeType).format(format);
  } else {
    // 按空格格式化时间字符串(yyyy-mm-dd HH:mm:ss) 拼接成UTC时间格式(yyyy-mm-ddTHH:mm:ssZ)
    const utcDateList = utcDate.split(' ');
    const time = utcDateList[0] + 'T' + utcDateList[1] + 'Z';
    return momentZone.tz(time, timeType).format(format);
  }
};
/**
 * 根据本地时间 获取UTC时间
 * @param {*} timeDate
 */
export const formateTimeToUtc = (timeDate, format = 'YYYY-MM-DD HH:mm:ss') => {
  if (timeDate === null || timeDate === '') {
    return '';
  }
  let date = moment(timeDate, ['DD/MM/YYYY HH:mm:ss']);
  return momentZone.tz(date, timeType).utc().format(format);
};
/**
 * 根据本地时间 获取UTC时间戳
 * @param {*} timeDate
 */
export const formateTimeToUtcTimestamp = (timeDate) => {
  if (timeDate == null || timeDate === '') {
    return '';
  }
  let date = moment(timeDate, ['DD/MM/YYYY HH:mm:ss']);
  return momentZone.tz(date, timeType).valueOf();
};
/**
 * 格式化时间
 * @param {*} timeDate
 * @param {*} format  格式
 */
export const formatTime = (timeDate, format) => {
  if (!timeDate) return '';
  return moment(timeDate).format(format);
};
/**
 * utc 时间转 时间戳
 * @param {*} timeDate
 */
export const utcToStamp = (timeDate) => {
  if (!timeDate) return '';
  return moment(timeDate).valueOf();
};
