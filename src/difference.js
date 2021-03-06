export function getMonthLeftDay(year, month, day) {
  const monthes = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (year % 4 === 0) {
    monthes[1] = 29;
  }
  if (!day) {
    return monthes[month];
  }
  return monthes[month] - day;
}

function isObject(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1) === "Object";
}

/**
 *
 *
 * @export
 * @param {*} start // 其实时间
 * @param {*} [end=new Date()] // 结束时间
 */
export function getDateDifference(start, end = new Date()) {
  if (new Date(start).getTime() > new Date(end).getTime()) {
    [start, end] = [end, start];
  }

  const origin = new Date(start);
  const originYear = origin.getFullYear();
  const originMonth = origin.getMonth();
  const originDay = origin.getDate();
  const originHour = origin.getHours();
  const originMinute = origin.getMinutes();
  const originSecond = origin.getSeconds();

  const today = new Date(end);
  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth();
  const todayDay = today.getDate();
  const todayHour = today.getHours();
  const todayMinute = today.getMinutes();
  const todaySecond = today.getSeconds();

  let secondDifference = 0;
  let minuteDifference = 0;
  let hourDifference = 0;
  let dayDifference = 0;
  let monthDifference = 0;
  let yearDifference = 0;

  let second = todaySecond - originSecond + 60;
  if (second < 60) {
    secondDifference = -1;
  }
  second %= 60;
  second = second < 10 ? "0" + second : second;

  let minute = todayMinute - originMinute + 60 + secondDifference;
  if (minute < 60) {
    minuteDifference = -1;
  }
  minute %= 60;
  minute = minute < 10 ? "0" + minute : minute;

  let hour = todayHour - originHour + 24 + minuteDifference;
  if (hour < 24) {
    hourDifference = -1;
  }
  hour %= 24;
  hour = hour < 10 ? "0" + hour : hour;

  let leftDay = getMonthLeftDay(originYear, originMonth);
  let day = todayDay - originDay + leftDay + hourDifference;
  if (day < leftDay) {
    dayDifference = -1;
  }
  day %= leftDay;

  let month = todayMonth - originMonth + 12 + dayDifference;
  if (month < 12) {
    monthDifference = -1;
  }
  month %= 12;

  let year = todayYear - originYear + monthDifference;
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

  format(fmt = "YYYY-MM-DD hh:mm:ss") {
    const { year, month, day, hour, minute, second } = this.date;
    const regs = {
      "(Y+)": year,
      "(M+)": month,
      "(D+)": day,
      "(h+)": hour,
      "(m+)": minute,
      "(s+)": second
    };

    for (let k in regs) {
      const reg = new RegExp(k);
      if (reg.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, regs[k]);
      }
    }
    return fmt;
  }
}
