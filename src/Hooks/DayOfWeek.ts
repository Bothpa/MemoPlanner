export const getDayOfWeek = (year:number|null, month:number|null, day:number|null) => {
    if(year != null && month != null && day != null)
      {
        const date = new Date(year, month - 1, day);
        const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
        return dayOfWeek[date.getDay()];
      }else{
        return "error";
      }
  }

// 년 월 일 을 입력받으면 요일을 반환하는 함수