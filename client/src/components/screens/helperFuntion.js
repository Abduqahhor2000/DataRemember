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

export function farmatNumberAndString(number, val){
    if(number < 1000){
        if(number <= 0){
            return 0;
        }
        return number;
    }
    if(number < 1000000){
        let vale = val === 0 ? 1000 : val === 1 ? 100 : val === 2 ? 10 : val === 3 ? 1 : 1;
        return `${Math.floor(number / vale) * vale / 1000} ming`
    }else if( number < 1000000000){
        let vale = val === 0 ? 1000000 : val === 1 ? 100000 : val === 2 ? 10000 : val === 3 ? 1000 : 1000;
        return `${Math.floor(number / vale) * vale / 1000000} mln`
    }else if(number < 1000000000000){
        let vale = val === 0 ? 1000000000 : val === 1 ? 100000000 : val === 2 ? 10000000 : val === 3 ? 1000000 : 1000000;
        return `${Math.floor(number / vale) * vale / 1000000000} mlrd`
    }else if(number < 1000000000000000){
        let vale = val === 0 ? 1000000000000 : val === 1 ? 100000000000 : val === 2 ? 10000000000 : val === 3 ? 1000000000 : 1000000000;
        return `${Math.floor(number / vale) * vale / 1000000000000} trln`
    }else{
        let vale = val === 0 ? 1000000000000 : val === 1 ? 100000000000 : val === 2 ? 10000000000 : val === 3 ? 1000000000 : 1000000000;
        return `${Math.floor(number / vale) * vale / 1000000000000} trln`
    }

}