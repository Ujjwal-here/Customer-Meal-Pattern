import './App.css';
import DatePicker from 'react-date-picker';
import { useState } from 'react';
import pattern from "./pattern"

function App() {
  const [value,newValue]=useState(new Date())

  const onChange=(date)=>{
     newValue(date)
  }
  function convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }
  console.log(convert(value))
  const filtered=pattern.filter(person=>person.item_date === convert(value))
  console.log(filtered)
  return (
    <div className="App">
      <DatePicker onChange={onChange} value={value} format='y-MM-dd'/>
    </div>
  );
}

export default App;
