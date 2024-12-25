import dotenv from 'dotenv';
import dayjs, {Dayjs} from 'dayjs';
// import { response } from 'express';
dotenv.config();


// TODO: Define an interface for the Coordinates object
interface Coordinates { 
  name: string;
  lat:  number;
  lon: number;
  country: string;
  state: string;
}
// TODO: Define a class for the Weather object
class Weather {
  city: string;
  date: Dayjs | string;
 tempF: number;
  icon: string;
  iconDescription: string;
  windSpeed: number;
  humidity: number;
  constructor(
    city: string,
    date: Dayjs | string,
    tempF: number,
    windSpeed: number,
    humidity: number,
    icon: string,
    iconDescription: string
  ) {
    this.city = city;
    this.date = date;
    this.tempF = tempF;
    this.windSpeed = windSpeed;
    this.humidity = humidity;
    this.icon = icon;
    this.iconDescription = iconDescription;
  }
}

// TODO: Complete the WeatherService class
class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties
  private baseURL?: string;
  private apiKey?: string;
  private city = "";
  constructor() {
    this.baseURL = process.env.API_BASE_URL || "";
    this.apiKey = process.env.API_KEY || "";
  }
  // TODO: Create fetchLocationData method
  private async fetchLocationData(query: string) {
    try {
      if (!this.baseURL || !this.apiKey) {
        throw new Error("API URL or API Key not found");
      }
      const response: Coordinates[] = await fetch(query).then((res) => res.json());
      return response[0];
    } catch (error) {
      console.log('error')
      console.error(error);
      throw error;
    }
  }
  // TODO: Create destructureLocationData method
  private destructureLocationData(locationData: Coordinates): Coordinates {
    console.log(locationData)
    const { name, lat, lon, country, state } = locationData;
    const coordinates: Coordinates = { name, lat, lon, country, state };
    return coordinates
  }
  // TODO: Create buildGeocodeQuery method
  private buildGeocodeQuery(): string {
    //http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
    const query = `${this.baseURL}/geo/1.0/direct?q=${this.city}&appid=${this.apiKey}`;
    return query;
  }
  // // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    //api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
    const query = `${this.baseURL}/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.apiKey}`;
    return query;
  }
  // TODO: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData() {
    try {
      const query = this.buildGeocodeQuery();
      console.log('query', query)
      const locationData = await this.fetchLocationData(query);
      console.log('locationData', locationData)
      const coordinates = this.destructureLocationData(locationData);
      return coordinates;

     } catch (error) {
      console.log('error')
      console.error(error);
      throw error;
     }
  }
  // TODO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates) {
    try {
      if (!this.baseURL || !this.apiKey) {
        throw new Error("API URL or API Key not found");
      }
      const query = this.buildWeatherQuery(coordinates);
      const response = await fetch(query).then((res) => res.json());
      return response;
      
    } catch (error) {
      console.log('error')     
      console.error(error);
      throw error; 
    }
  }
  // TODO: Build parseCurrentWeather method
  private parseCurrentWeather(response: any) {
    console.log('response', response.list[0].dt)
    const date = dayjs.unix(response.list[0].dt).format('MM/DD/YYYY');
    const weatherObject = response.list[0]

    const currentWeather = new Weather(
        this.city,
        date,
        weatherObject.main.temp,
        weatherObject.wind.speed,
        weatherObject.main.humidity,
        weatherObject.weather[0].icon,
        weatherObject.weather[0].description
    )
    console.log('parseCurrentWeather')
    return currentWeather;
  }
  // TODO: Complete buildForecastArray method
  private buildForecastArray(_currentWeather: Weather, weatherData: any[]): Weather[] {
    console.log('buildForecastArray')
    const forecastArray = weatherData.map((weatherObject: any) => {
      const date = dayjs.unix(weatherObject.dt).format('MM/DD/YYYY'); 
      const forecast = new Weather(
        this.city,
        date,
        weatherObject.main.temp,
        weatherObject.wind.speed,
        weatherObject.main.humidity,
        weatherObject.weather[0].icon,
        weatherObject.weather[0].description
      );
      return forecast;
    });
    return forecastArray;
  }
  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city: string) {
    this.city = city;
    const coordinates = await this.fetchAndDestructureLocationData();
    const weatherData = await this.fetchWeatherData(coordinates);
    const currentWeather = this.parseCurrentWeather(weatherData);
    const forecastArray = this.buildForecastArray(currentWeather, weatherData.list);
    console.log('getWeatherForCity')
      return { currentWeather, forecastArray }; 
    }
  }


export default new WeatherService();
