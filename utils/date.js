export function formatDate(timestamp, formats) {
  // formats格式包括
  // 1. Y-m-d
  // 2. Y-m-d H:i:s
  // 3. Y年m月d日
  // 4. Y年m月d日 H时i分
  formats = formats || 'Y-m-d';

  var zero = function (value) {
      if (value < 10) {
          return '0' + value;
      }
      return value;
  };

  var myDate = timestamp? new Date(timestamp): new Date();

  var year = myDate.getFullYear();
  var month = zero(myDate.getMonth() + 1);
  var day = zero(myDate.getDate());

  var hour = zero(myDate.getHours());
  var minite = zero(myDate.getMinutes());
  var second = zero(myDate.getSeconds());

  return formats.replace(/Y|m|d|H|i|s/ig, function (matches) {
      return ({
          Y: year,
          m: month,
          d: day,
          H: hour,
          i: minite,
          s: second
      })[matches];
  });
};

/**
 * 将时间戳转换为指定格式输出
 * @example 'yyyy-MM-dd HH:mm:ss zzzz' => '2017-06-21 16:40:20 0389'
 * @return String
 */
// export function formatDate(timeStamp, format, ifPad = true) {
//   let date = new Date(timeStamp)

//   return format.replace(/y+|M+|d+|H+|m+|s+|z+/g, function(str) {
//     return getTime(str)
//   })

//   // 字符串开头补适当位数的padStr：如 padStart('9', 3, '0') => '009'
//   function padStart(str, len, padStr) {
//     return ifPad ? str.padStart(len, padStr) : str
//   }

//   // 以特定格式转换时间字符串，如：'yyyy' -> '2017'
//   function getTime(formatStr) {
//     let len = formatStr.length
//     let time
//     switch (formatStr[0]) {
//       case 'y':
//         time = padStart(date.getFullYear() + '', len, '0')
//         break
//       case 'M':
//         time = padStart(date.getMonth() + 1 + '', len, '0')
//         break
//       case 'd':
//         time = padStart(date.getDate() + '', len, '0')
//         break
//       case 'H':
//         time = padStart(date.getHours() + '', len, '0')
//         break
//       case 'm':
//         time = padStart(date.getMinutes() + '', len, '0')
//         break
//       case 's':
//         time = padStart(date.getSeconds() + '', len, '0')
//         break
//       case 'z':
//         time = padStart(date.getMilliseconds() + '', len, '0')
//         break
//     }
//     return time
//   }
// }

/**
 * 校验本地时间是否准确，如果和服务器时间相差5s以内，已客户端时间为准
 *
 * @return 校验后的时间戳
 */
export function validTime(timeStamp) {
  let nowTime = Date.now()
  let distanceTime = nowTime - timeStamp
  if (Math.abs(distanceTime) < 5000) {
    return nowTime
  } else {
    return timeStamp
  }
}

/**
 * params:
 * start 起点时间戳
 * end   终止时间戳
 * @return
 */
export function distanceDate(start, end) {
  let distanceTime = start - end
  let distanceTimeAbsStr = Math.abs(distanceTime).toString()
  let date = new Date(Math.abs(distanceTime))
  let result = {
    flag: distanceTime > 0,
    start: start,
    year: date.getFullYear() - 1970,
    month: date.getMonth() - 1,
    day: date.getDate() - 1,
    hour: date.getHours() - 8,
    min: date.getMinutes(),
    second: date.getSeconds(),
    ms: parseInt(distanceTimeAbsStr.slice(distanceTimeAbsStr.length - 3)),
    totalDay: parseInt(Math.abs(distanceTime) / 86400000)
  }
  if (result.hour < 0) {
    result.hour = result.hour + 24
    result.day = result.day - 1
  }

  return result
}