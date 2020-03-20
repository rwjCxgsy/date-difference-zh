# 时间差

返回指定时间到结束时间的差值，默认隐藏 0 的日期，比如 0 年 1 月 1 天，返回 1 月 1 日

## 基本用法

`dateDiff(startDate, [endDate])`
第一个参数必填
第二个参数选填，默认是当前时间

返回一个对象包含 format 方法用于格式化时间

```javascript
import dateDiff from "date-difference-zh";

dateDiff("2001-11-11 12:23:45", "2009-01-12 12:23:44").format();
// 7-2-0 23:59:59

dateDiff("2001-11-11 12:23:45", "2009-01-12 12:23:44").format(
  "YYYY年MM月DD日 hh小时mm分ss小时"
);
// 7年2月0日 23小时59分59秒
```
