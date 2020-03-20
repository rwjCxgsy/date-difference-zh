'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function getMonthLeftDay(year, month, day) {
  var monthes = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (year % 4 === 0) {
    monthes[1] = 29;
  }

  if (!day) {
    return monthes[month];
  }

  return monthes[month] - day;
}
/**
 *
 *
 * @export
 * @param {*} start // 其实时间
 * @param {*} [end=new Date()] // 结束时间
 */


function getDateDifference(start) {
  var end = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Date();

  if (new Date(start).getTime() > new Date(end).getTime()) {
    [start, end] = [end, start];
  }

  var origin = new Date(start);
  var originYear = origin.getFullYear();
  var originMonth = origin.getMonth();
  var originDay = origin.getDate();
  var originHour = origin.getHours();
  var originMinute = origin.getMinutes();
  var originSecond = origin.getSeconds();
  var today = new Date(end);
  var todayYear = today.getFullYear();
  var todayMonth = today.getMonth();
  var todayDay = today.getDate();
  var todayHour = today.getHours();
  var todayMinute = today.getMinutes();
  var todaySecond = today.getSeconds();
  var secondDifference = 0;
  var minuteDifference = 0;
  var hourDifference = 0;
  var dayDifference = 0;
  var monthDifference = 0;
  var second = todaySecond - originSecond + 60;

  if (second < 60) {
    secondDifference = -1;
  }

  second %= 60;
  second = second < 10 ? "0" + second : second;
  var minute = todayMinute - originMinute + 60 + secondDifference;

  if (minute < 60) {
    minuteDifference = -1;
  }

  minute %= 60;
  minute = minute < 10 ? "0" + minute : minute;
  var hour = todayHour - originHour + 24 + minuteDifference;

  if (hour < 24) {
    hourDifference = -1;
  }

  hour %= 24;
  hour = hour < 10 ? "0" + hour : hour;
  var leftDay = getMonthLeftDay(originYear, originMonth);
  var day = todayDay - originDay + leftDay + hourDifference;

  if (day < leftDay) {
    dayDifference = -1;
  }

  day %= leftDay;
  var month = todayMonth - originMonth + 12 + dayDifference;

  if (month < 12) {
    monthDifference = -1;
  }

  month %= 12;
  var year = todayYear - originYear + monthDifference;
  return new DiffDate({
    year,
    month,
    day,
    hour,
    minute,
    second
  });
}

class DiffDate {
  constructor(date) {
    this.date = date;
  }

  format() {
    var fmt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "YYYY-MM-DD hh:mm:ss";
    var {
      year,
      month,
      day,
      hour,
      minute,
      second
    } = this.date;
    var regs = {
      "(Y+)": year,
      "(M+)": month,
      "(D+)": day,
      "(h+)": hour,
      "(m+)": minute,
      "(s+)": second
    };

    for (var k in regs) {
      var reg = new RegExp(k);

      if (reg.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, regs[k]);
      }
    }

    return fmt;
  }

}

exports.default = getDateDifference;
exports.getMonthLeftDay = getMonthLeftDay;
