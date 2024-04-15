const DateCalculation = async(year, month) => {
// function DateCalculation(year,month){
    var datesArray = [];
    var year = year; // 연도
    var month = month; // 월 

    // 해당 월의 첫째 날 생성
    var firstDayOfMonth = new Date(year, month - 1, 1);

    // 달력 앞에 비어있는 배열칸 생성
    const fdm= firstDayOfMonth.toString().substring(0,3)
    var fdmc;
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
    var lastDayOfMonth = new Date(year, month, 0);

    // 해당 월의 첫째 날부터 마지막 날까지의 데이터 배열에 넣기
    for (let i = firstDayOfMonth.getDate(); i <= lastDayOfMonth.getDate(); i++) {
        var currentDate = new Date(year, month - 1, i);
        // var dayData = currentDate.toString().substring(8,10)
        var dayData = i
        var weekDay = currentDate.toString().substring(0,3)
        var data = {year:year,day:dayData,month:month,weekDay:weekDay}
        datesArray.push(data);
    }

    // 달력 뒤어 비어있는 배열칸 생성
    while (datesArray.length < 42) {
        datesArray.push({day:null,month:null,year:null,weekDay:null});
    }

    // 결과 확인
    // console.log(year+"년 "+month+"월")
    // console.table(datesArray);

    return datesArray;
}

module.exports = DateCalculation;