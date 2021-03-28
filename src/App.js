import React from "react";

import Info from "./components/info";
import Form from "./components/form";
import Weather from "./components/weather";

const API_KEY = "70abe736a075c03cd859ff40f11f1b7d";

class App extends React.Component {
  state = {
    temp: undefined,
    city: undefined,
    country: undefined,
    pressure: undefined,
    sunset: undefined,
    error: undefined
  };

  gettingWeather = async event => {
    event.preventDefault();
    var city = event.target.elements.city.value;

    if (city) {
      const api_url = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await api_url.json();

      var sunset = data.sys.sunset;
      // var date = new Date();
      // date.setTime(sunset);
      // console.log(sunset);
      // var sunset_date =
      //   date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
      var date = timeConverter(sunset);
      this.setState({
        temp: data.main.temp,
        city: data.name,
        country: data.sys.country,
        pressure: data.main.pressure,
        sunset: date,
        error: ""
      });
    }
  };

  render() {
    return (
      <div>
        <Info />
        <Form weatherMethod={this.gettingWeather} />
        <Weather
          temp={this.state.temp}
          city={this.state.city}
          country={this.state.country}
          pressure={this.state.pressure}
          sunset={this.state.sunset}
          error={this.state.error}
        />
      </div>
    );
  }
}

function timeConverter(UNIX_timestamp) {
  var a = new Date(UNIX_timestamp * 1000);
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time =
    date + " " + month + " " + year + " " + hour + ":" + min + ":" + sec;
  return time;
}

export default App;
