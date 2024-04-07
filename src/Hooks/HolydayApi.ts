import axios from 'axios';

interface apiData {
    dateKind:string;
    dateName:string;
    isHoliday:string;
    locdate:number;
    seq:number;
}

interface customData {
    year : number;
    month : number;
    day : number;
    text : string;
}

export const HolidayApi = async(year:number, month:number) => {
    const key = process.env.REACT_APP_HOLIDAYAPIKEY;
    try {
        const apiYear = year.toString();
        const apiMonth = month < 10 ? "0"+(month.toString()) : month.toString();
        const response = await axios.get(`http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo?solYear=${apiYear}&solMonth=${apiMonth}&ServiceKey=${key}`);
        
        let data: apiData[] = response.data.response.body.items.item;
        if(data == null)
        {
            return[];
        }

        if (!Array.isArray(data)) {
            data = [data];
        }

        let dataArray: customData[] = [];
        for(let i = 0; i < data.length; i++) {
            const year = Number(data[i].locdate.toString().substring(0, 4));
            const month = Number(data[i].locdate.toString().substring(4, 6));
            const day = Number(data[i].locdate.toString().substring(6));
            const text = data[i].dateName;
            const jsondata: customData = {year: year, month: month, day: day, text: text};
            dataArray.push(jsondata);
        }
        
        // console.log(dataArray);
        
        return dataArray;
    } catch (err) {
        console.log(err);
        return [];
    }
}
