<template>
  <div
    id="app"
    :class="
      typeof weather.main != 'undefined' && weather.main.temp > 16
        ? 'warm'
        : typeof weather.main != 'undefined' && weather.main.temp < 16
        ? 'cold'
        : weather.message === 'city not found'
        ? 'four_zero_four'
        : ''
    "
  >
    <main>
      <div class="search-box">
        <input
          type="text"
          name=""
          id=""
          placeholder="Search City..."
          class="search-bar"
          v-model="query"
          @keypress="fetchWeather"
        />
        <!-- 
          v-model - is same as props in react
          @keypress -- is same as KeyPress in js
         -->
      </div>
      <!--v-if == used for conditional rendering  -->
      <div class="weather-wrap" v-if="typeof weather.main != 'undefined'">
        <div class="location-box">
          <div class="location">
            {{ weather.name }}, {{ weather.sys.country }} {{ weather.message }}
          </div>
          <div class="date">{{ dateBuilder() }}</div>
        </div>
        <div class="weather-box">
          <div class="temp">{{ Math.round(weather.main.temp) }}°c</div>
          <div class="weather">{{ weather.weather[0].main }}</div>
        </div>
      </div>
    </main>
    <div :class="weather.message === 'city not found' ? 'error' : 'hidden'">
      <div class="error-inside">Opps it seem your city is not found</div>
    </div>
    <div id="load" class="hidden">
      <loader
        object="#FE9898"
        color1="#D79771"
        color2="#FDF6F0"
        size="5"
        speed="2"
        bg="#343a40"
        objectbg="#999793"
        opacity="80"
        disableScrolling="false"
        name="circular"
      ></loader>
    </div>
  </div>
</template>

<script>
export default {
  name: "Weather",
  data() {
    return {
      api_key: "7b97d0d47553127f3fb20759981443ad",
      url_base: "https://api.openweathermap.org/data/2.5/",
      query: "",
      weather: {},
    };
  },
  methods: {
    fetchWeather(e) {
      if (e.key == "Enter") {
        fetch(
          `${this.url_base}weather?q=${this.query}&units=metric&APPID=${this.api_key}`
        )
          .then((res) => {
            return res.json();
          })
          .then(this.setResults);
          document.querySelector("#load").classList.remove("hidden");
        setTimeout(function () {
          document.querySelector("#load").classList.add("hidden");
        }, 3000);
      }
    },

    setResults(results) {
      this.weather = results;
      //console.log(results.message);
    },
    dateBuilder() {
      let d = new Date();
      //console.log(d.getFullYear())
      let months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];

      let day = days[d.getDay()];
      let date = d.getDate();
      let month = months[d.getMonth()];
      let year = d.getFullYear();

      return `${day} ${date} ${month} ${year}`;
    },
  },
};
</script>

