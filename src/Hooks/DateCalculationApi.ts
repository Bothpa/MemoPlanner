const DateCalculation = async (year:number, month:number) => {
    let datesArray = [];

    // 해당 월의 첫째 날 생성
    let firstDayOfMonth = new Date(year, month - 1, 1);

    // 달력 앞에 비어있는 배열칸 생성
    const fdm= firstDayOfMonth.toString().substring(0,3)
    let fdmc;
    if(fdm === 'Sun'){fdmc = 0;}
    else if(fdm === 'Mon'){fdmc = 1;}
    else if(fdm === 'Tue'){fdmc = 2;}
    else if(fdm === 'Wed'){fdmc = 3;}
    else if(fdm === 'Thu'){fdmc = 4;}
    else if(fdm === 'Fri'){fdmc = 5;}
    else if(fdm === 'Sat'){fdmc = 6;}
    else{fdmc = 0;}
    for (let i = 0; i < fdmc; i++) {
        datesArray.push({day:null,month:null,year:null,weekDay:null});
    }
    
    // 해당 월의 마지막 날 생성
    let lastDayOfMonth = new Date(year, month, 0);

    // 해당 월의 첫째 날부터 마지막 날까지의 데이터 배열에 넣기
    for (let i = firstDayOfMonth.getDate(); i <= lastDayOfMonth.getDate(); i++) {
        let currentDate = new Date(year, month - 1, i);
        let dayData = i
        let weekDay = currentDate.toString().substring(0,3)

        let data ={year:year,day:dayData,month:month,weekDay:weekDay}

        datesArray.push(data);
    }

    // 달력 뒤어 비어있는 배열칸 생성
    const getday = firstDayOfMonth.getDay();
    if(getday >= 5){
        while (datesArray.length < 42) {
            datesArray.push({month:null,day:null,year:null,weekDay:null});
        }
    }else{
        while (datesArray.length < 35) {
            datesArray.push({month:null,day:null,year:null,weekDay:null});
        }
    }
    
    
    // 결과 확인
    // console.log(year+"년 "+month+"월")
    // console.table(datesArray);

    return datesArray;
}

export default DateCalculation;