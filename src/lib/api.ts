const BASEURL = "https://api.openweathermap.org/data/2.5";
const APIKEY = process.env.NEXT_PUBLIC_WEATHER_APIKEY as string;
type searchParamsType = {
  q: string;
  units: string;
};
const getCurrentWeather = async (
  resource: string,
  searchParams: searchParamsType,
) => {
  const url = new URL(`${BASEURL}/${resource}`);
  url.search = new URLSearchParams({
    ...searchParams,
    appid: APIKEY,
  }).toString();
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch weatherData");
  }
  const data = await res.json();
  return data;
};
const getWeatherForecast = async (
  resource: string,
  searchParams: searchParamsType,
) => {
  const url = new URL(`${BASEURL}/${resource}`);
  url.search = new URLSearchParams({
    ...searchParams,
    appid: APIKEY,
  }).toString();
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch forecast data");
  }
  const data = await res.json();
  return data;
};
const getCitySuggestions = async (query: string) => {
  const url = new URL("https://api.openweathermap.org/geo/1.0/direct");
  url.search = new URLSearchParams({
    q: query,
    limit: "10",
    appid: APIKEY,
  }).toString();
  const res = await fetch(url.toString());
  if (!res.ok) {
    throw new Error("Failed to fetch city suggestions");
  }
  const data = await res.json();
  return data.map(
    (city: any) =>
      `${city.name}, ${city.state ? city.state + ", " : ""}${city.country}`,
  );
};
export { getCurrentWeather, getWeatherForecast, getCitySuggestions };
