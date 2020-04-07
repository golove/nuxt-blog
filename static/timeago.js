export default (dateTimeStamp) => {
    var minute = 1000 * 60;
    var hour = minute * 60;
    var day = hour * 24;
    // var halfamonth = day * 15;
    var month = day * 30;

    var now = new Date().getTime();
    var diffValue = now - dateTimeStamp;

    var monthC = diffValue / month;
    var weekC = diffValue / (7 * day);
    var dayC = diffValue / day;
    var hourC = diffValue / hour;
    var minC = diffValue / minute;
    let result;
    if (monthC > 12) {

        result = `${monthC % 12}年之前`
    }
    else if (monthC >= 1) {
        result = parseInt(monthC) + "月之前";
    }
    else if (weekC >= 1) {
        result = parseInt(weekC) + "星期之前";
    }
    else if (dayC >= 1) {
        result = parseInt(dayC) + "天之前";
    }
    else if (hourC >= 1) {
        result = parseInt(hourC) + "小时之前";
    }
    else if (minC >= 1) {
        result = parseInt(minC) + "分钟之前";
    } else
        result = "刚刚发表";
    return result;
}