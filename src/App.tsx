import React, { useEffect } from 'react';
import './App.css';

function App() {
  useEffect(()=>{
      var year = 2024; // 연도
      var month = 3; // 월 

      // 해당 월의 첫째 날 생성
      var firstDayOfMonth = new Date(year, month - 1, 1);

      // 해당 월의 마지막 날 생성
      var lastDayOfMonth = new Date(year, month, 0);

      // 해당 월의 첫째 날부터 마지막 날까지의 날짜 배열 생성
      var datesArray = [];
      for (var i = firstDayOfMonth.getDate(); i <= lastDayOfMonth.getDate(); i++) {
          var currentDate = new Date(year, month - 1, i);
          var dayData = currentDate.toString().substring(8,10)
          var monthData = currentDate.toString().substring(0,4)
          var data = {day:dayData,month:monthData}
          datesArray.push(data);
      }

      // 결과 확인
      console.log(year+"년 "+month+"월")
      console.table(datesArray);

  },[])

  return (
    <div className="App">
      <header className="App-header">
      </header>
      
    </div>
  );
}

export default App;
