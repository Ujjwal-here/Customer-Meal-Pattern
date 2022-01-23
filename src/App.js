import "./App.css";
import DatePicker from "react-date-picker";
import { useState } from "react";
import pattern from "./pattern";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function App() {
  const [value, newValue] = useState(
    new Date("Sun May 30 2021 00:00:00 GMT+0530 (India Standard Time)")
  );
  const [val, newVal] = useState(0);

  console.log(value);

  //On Change handler for datepicker
  const onChange = (date) => {
    newValue(date);
  };

  //This function converts this date and time(Sat May 01 2021 00:00:00 GMT+0530 (India Standard Time)) into simple date and time
  function convert(str) {
    let date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }

  const filtered = pattern.filter(
    (person) => person.item_date === convert(value)
  );
  console.log(filtered);

  function mapConversion(data) {
    const d = {};
    data.forEach((element) => {
      const dat = element.schedule_time.slice(0, 10);
      if (dat in d) {
        d[dat] += 1;
      } else {
        d[dat] = 1;
      }
    });
    return d;
  }
  const d = mapConversion(filtered);

  //Labels and values for first graph
  const labels = [];
  const vals = [];
  for (let key in d) {
    labels.push(key);
    vals.push(d[key]);
  }

  //data for first graph
  const states = {
    labels: labels,
    datasets: [
      {
        label: "Schedule Count on Particular Date",
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],

        data: vals,
      },
    ],
  };
  const h = {
    "9AM to 12AM": 0,
    "12AM to 3PM": 0,
    "3PM to 6PM": 0,
    "6PM to 9PM": 0,
    "9PM to 12AM": 0,
    "12AM to 3AM": 0,
    "3AM to 6AM": 0,
    "6AM to 9AM": 0,
  };

  //
  const filter = filtered.filter(
    (ele) => ele.schedule_time.slice(0, 10) === Object.keys(d)[val]
  );
  console.log(filter);

  //Filtering data based on click event
  filter.forEach((elem) => {
    const time = parseInt(elem.schedule_time.slice(11, 14));

    const hours = ((time + 11) % 12) + 1;

    const suffix = time >= 12 ? "pm" : "am";
    console.log(hours, suffix);

    if (suffix === "pm" && hours >= 6 && hours < 9) {
      h["6PM to 9PM"] += 1;
    } else if (suffix === "pm" && hours >= 12 && hours < 15) {
      h["12AM to 3PM"] += 1;
    } else if (suffix === "pm" && hours >= 3 && hours < 6) {
      h["3PM to 6PM"] += 1;
    } else if (suffix === "am" && hours >= 1 && hours < 3) {
      h["12AM to 3AM"] += 1;
    } else if (suffix === "am" && hours >= 3 && hours < 6) {
      h["3AM to 6AM"] += 1;
    } else if (suffix === "am" && hours >= 9 && hours < 12) {
      h["9AM to 12AM"] += 1;
    } else if (suffix === "pm" && hours >= 9 && hours < 12) {
      h["9PM to 12AM"] += 1;
    } else if (suffix === "am" && hours >= 6 && hours < 9) {
      h["6AM to 9AM"] += 1;
    }
  });

  console.log(h);

  //Labels and values for second bar
  const lab = [];
  const values = [];
  for (let key in h) {
    lab.push(key);
    values.push(h[key]);
  }

  // Data For Second Bar
  const stat = {
    labels: lab,
    datasets: [
      {
        label: "Schedule Count on Time range",
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],

        data: values,
      },
    ],
  };
  return (
    <div className="App">
      <h1>Customer Scheduling Pattern</h1>
      <div className="date">
        <h3>Select a date:</h3>
        <DatePicker
          className="dates"
          minDate={
            new Date("Tue May 18 2021 00:00:00 GMT+0530 (India Standard Time)")
          }
          maxDate={
            new Date("Sun Jan 16 2022 00:00:00 GMT+0530 (India Standard Time)")
          }
          onChange={onChange}
          value={value}
          format="y-MM-dd"
        />
      </div>
      <div className="bar1">
        <Bar
          className="bar"
          data={states}
          options={{
            onHover: function (e) {
              e.native.target.style.cursor = "pointer";
            },
            onClick: function (c, i) {
              newVal(i[0].index);
            },
            scales: {
              x: { title: { display: true, text: "Scheluding Date" } },
              y: { title: { display: true, text: "Count" } },
            },
            plugins: {
              title: {
                display: true,
                text: "Customer Schedulling Pattern",
              },
              legend: {
                display: true,
                position: "bottom",
              },
            },
          }}
        />
      </div>
      <div className="bar2">
        <h3 className="bar2h">
          Click on bar tile in above graph to see pattern in below graph
        </h3>
        <Bar
          className="bar"
          data={stat}
          options={{
            scales: {
              x: { title: { display: true, text: "Time" } },
              y: { title: { display: true, text: "Count" } },
            },
            plugins: {
              title: {
                display: true,
                text: "Customer Schedulling Pattern",
              },
              legend: {
                display: true,
                position: "bottom",
              },
            },
          }}
        />
      </div>
    </div>
  );
}

export default App;
