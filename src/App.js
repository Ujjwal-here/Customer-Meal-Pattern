import './App.css';
import DatePicker from 'react-date-picker';
import { useState } from 'react';
import pattern from "./pattern"

function App() {
  const [value,newValue]=useState(new Date("Sat May 01 2021 00:00:00 GMT+0530 (India Standard Time)"))

  const onChange=(date)=>{
     newValue(date)
  }
  function convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }
  const filtered=pattern.filter(person=>person.item_date === convert(value))
  console.log(filtered)

  function mapConversion(data){
    const d={}
    data.forEach(element => {
      const dat=element.schedule_time.slice(0,10)
      if (dat in d){
          d[dat]+=1
      }
      else{
          d[dat]=1
      }

    });
    return d
  }
  console.log(mapConversion(filtered))
  
  return (
    <div className="App">
      <DatePicker onChange={onChange} value={value} format='y-MM-dd'/>
    </div>
  );
}

export default App;
