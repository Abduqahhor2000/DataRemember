export function farmatDate(date) {
      const date1 = new Date(date)
      const date2 = date1.getDate()
      const date3 = date1.getFullYear()
      const date4 = date1.getHours()
      const date5 = date1.getMinutes()
      const date6 = date1.getMonth()
      return <>{date4}:{date5} {date2}-{
          date6 === 0 ? "Yanvar"
        : date6 === 1 ? "Febral"
        : date6 === 2 ? "Mart"
        : date6 === 3 ? "Aprel"
        : date6 === 4 ? "May"
        : date6 === 5 ? "Iyun"
        : date6 === 6 ? "Iyul"
        : date6 === 7 ? "Avgust"
        : date6 === 8 ? "Sentabr"
        : date6 === 9 ? "Oktiyabr"
        : date6 === 10 ? "Noyabr"
        : date6 === 11 ? "Dekabr" : null
      } {date3} </>
}

export function farmatNumberStr(number) {
    if(number < 0){
        return 0;
    }
    const arr = number.toString().split("").reverse()
    if(arr.length > 3){
        let num = 3
        let replay = (arr.length - (arr.length % 3 === 0 ? -3 : arr.length % 3)) / 3
        for (let i = 0; i < replay; i++){
            arr.splice(num + i, 0, " ")
            num += 3
        }
        return arr.reverse().join("")
    }
    return number;
}