# 时间差
返回指定时间到结束时间的差值，默认隐藏0的日期，比如0年1月1天，返回1月1日


## 基本用法

`dateDiff(startDate, [endDate, option])`
第一个参数必填
第二个参数选填，默认是当前时间
第三个option是其他配置

```javascript
import dateDiff from 'date-difference-zh'

dateDiff('2001-11-11 12:23:45', '2009-01-12 12:23:45')
// 7年2月1日

dateDiff('2001-11-11 12:23:45', '2009-01-12 12:23:44')
// 7年2月23小时59分59秒
```

### option

`isHideZeroDate`: 默认`true` 是否隐藏0的时间
`isShowChineseFormat`: 默认`true` 是否返回中文时间格式