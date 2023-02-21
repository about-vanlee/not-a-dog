const writeNameAndPayTime = '2024-05-01'
const obtainACertificateTime = '2025-02-14'
const bAlreadyPaid30 = 30 // 单位 w
const everyMonth = 0.3 // 单位 w
const risingMonth = 10
const bAlreadyPaid70 = 40
function dayCha(time, twoTime) {
  time = time.replace(new RegExp('-', 'gm'), '/')
  if (twoTime) {
    twoTime = twoTime.replace(new RegExp('-', 'gm'), '/')
  } else {
    twoTime = new Date()
  }
  // 计算比较日期
  const getMaxMinDate = (time, twoTime, type) => {
    let minTime =
      new Date(time).getTime() - new Date(twoTime).getTime() > 0
        ? twoTime
        : time
    let maxTime =
      new Date(time).getTime() - new Date(twoTime).getTime() > 0
        ? time
        : twoTime
    let maxDateDay = new Date(
      new Date(maxTime).getFullYear(),
      new Date(maxTime).getMonth() + 1,
      0
    ).getDate()
    let maxMinDate =
      new Date(minTime).getDate() > maxDateDay
        ? maxDateDay
        : new Date(minTime).getDate()
    let maxMinTong = null
    if (type == 'month') {
      maxMinTong =
        new Date(maxTime).getFullYear() +
        '/' +
        (new Date(minTime).getMonth() + 1) +
        '/' +
        maxMinDate +
        ' ' +
        new Date(minTime).toLocaleTimeString('chinese', { hour12: false })
    } else {
      maxMinTong =
        new Date(maxTime).getFullYear() +
        '/' +
        (new Date(maxTime).getMonth() + 1) +
        '/' +
        maxMinDate +
        ' ' +
        new Date(minTime).toLocaleTimeString('chinese', { hour12: false })
    }
    return {
      minTime,
      maxTime,
      maxMinTong
    }
  }

  // 相差年份
  const getYear = (time, twoTime) => {}

  // 相差月份
  const getMonth = (time, twoTime, value) => {
    let oneMonth =
      new Date(time).getFullYear() * 12 + (new Date(time).getMonth() + 1)
    let twoMonth =
      new Date(twoTime).getFullYear() * 12 + (new Date(twoTime).getMonth() + 1)

    const { minTime, maxTime, maxMinTong } = getMaxMinDate(time, twoTime, 'day')
    let chaMonth = Math.abs(oneMonth - twoMonth)
    if (new Date(maxMinTong).getTime() > new Date(maxTime).getTime()) {
      chaMonth--
    }
    if (value) {
      return chaMonth - value
    } else {
      return chaMonth
    }
  }

  // 相差天数
  const getDay = (time, twoTime, value) => {}

  // 相差小时
  const getHour = (time, twoTime, value) => {}

  // 相差分钟
  const getMinute = (time, twoTime, value) => {}

  // 相差秒
  const getSecond = (time, twoTime, value) => {}

  // 相差年月日时分秒
  const getDffeYMDHMS = (time, twoTime) => {}

  // 获取对应值并返回
  let chaYear = getYear(time, twoTime)
  let chaMonth = getMonth(time, twoTime)
  let chaDay = getDay(time, twoTime)
  let chaHour = getHour(time, twoTime)
  let chaMinute = getMinute(time, twoTime)
  let chaSecond = getSecond(time, twoTime)
  let chaDffeYMDHMS = getDffeYMDHMS(time, twoTime)
  return {
    chaYear,
    chaMonth,
    chaDay,
    chaHour,
    chaMinute,
    chaSecond,
    chaDffeYMDHMS
  }
}

/**
 * @description get age
 */
function getAge(birthdayStr) {
  const birthDayTime = new Date(birthdayStr).getTime()
  const nowTime = new Date().getTime()
  return Math.ceil((nowTime - birthDayTime) / 31536000000)
}

/**
 * @description 计算两个字符串的时间差值
 */
function diffDay(lastDate, earlyDate) {
  return (Date.parse(lastDate) - Date.parse(earlyDate)) / 1000 / 60 / 60 / 24
}

/**
 * @description 署名的费用 计算方式：差值的天数 乘以 200 元
 */
function writingNameMoney(diffVal) {
  const val = diffVal * 0.02
  return val
}

/**
 * @description 计算每月累计值
 */

function otherMoney() {
  const diffObj = dayCha(writeNameAndPayTime, obtainACertificateTime)
  const { chaMonth } = diffObj
  const val = everyMonth * chaMonth

  return val
}

const nowStr = dayjs().format('YYYY-MM-DD')
const myAge = getAge('1995-09-24')

/**
 * a 和 b 分别所得
 * @param {boolean} isPart 是否拆开的状态 默认不是  false
 * @param {boolean} isDivorce 是否彻底拆开 默认不是 false
 * @param {boolean} aGotHouse 默认是的
 */
function abGot(paramsOpts) {
  const { isPart, isDivorce, aGotHouse } = paramsOpts
  const diffVal = diffDay(obtainACertificateTime, writeNameAndPayTime)
  const bShouldPayABecauseName = writingNameMoney(diffVal)
  if (isPart) {
    const bAlreadyPaidOther = otherMoney()
    const aFinGot = -bAlreadyPaidOther - bAlreadyPaid30
    const bFinGot = -bShouldPayABecauseName
    // 如果拆开直接终止程序执行
    if (aGotHouse) {
      return {
        aMoney: aFinGot,
        aHavehouse: true,
        aHaveName: false,
        bMoney: bFinGot,
        bHaveName: true,
        bHavehouse: !aGotHouse,
        status: `Bought a house but didn't get the certificate`
      }
    } else {
      return {
        aMoney: bShouldPayABecauseName,
        aHavehouse: false,
        aHaveName: false,
        bMoney: -bAlreadyPaidOther - bAlreadyPaid30 - bShouldPayABecauseName,
        bHaveName: true,
        bHavehouse: true,
        status: `Bought a house but didn't get the certificate`
      }
    }
  } else {
    const total = bAlreadyPaid30 + risingMonth + bAlreadyPaid70
    const partTotal = total / 2
    if (isDivorce) {
      return {
        aMoney: partTotal + bShouldPayABecauseName,
        aHavehouse: false,
        aHaveName: false,
        bMoney: partTotal,
        bHaveName: false,
        bHavehouse: false,
        status: `Bought a house but divorce`
      }
    } else {
      return {
        aMoney: partTotal,
        aHavehouse: true,
        aHaveName: false,
        bMoney: partTotal,
        bHaveName: false,
        bHavehouse: true,
        status: `Bought a house and lifetime`
      }
    }
  }
}

/**
 * Bought a house but didn't get the certificate
 * a got house
 */
const params1 = {
  isPart: true,
  isDivorce: true,
  aGotHouse: true
}
const retObj1 = abGot(params1)
console.log(`didn't get the certificate / a got house`, retObj1)

/**
 * Bought a house but divorce
 */
const params2 = {
  isPart: false,
  isDivorce: true
  // aGotHouse: true
}
const retObj2 = abGot(params2)
console.log(`Bought a house but divorce`, retObj2)
