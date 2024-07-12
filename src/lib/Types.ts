export type weatherDataTypes = {
  weather: {
    main: string;
    description: string;
    icon: string;
  }[];
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  dt: number;
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  name: string;
};
export type forecastDataTypes = {
  list: {
    dt: number;
    main: {
      temp: number;
    };
    weather: {
      main: string;
      description: string;
      icon: string;
    }[];
    dt_txt: string;
  }[];
};
