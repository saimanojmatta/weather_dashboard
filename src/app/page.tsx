"use client";
import Currentweather from "@/components/Currentweather";
import Loader from "@/components/Loader";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import WeatherForecast from "@/components/WeatherForecast";
import {
  getCitySuggestions,
  getCurrentWeather,
  getWeatherForecast,
} from "@/lib/api";
import { forecastDataTypes, weatherDataTypes } from "@/lib/Types";
import { SearchIcon, UserIcon } from "lucide-react";
import { useEffect, useState } from "react";

const Home = () => {
  const { toast } = useToast();
  const [searchedQuery, setSearchedQuery] = useState({
    q: "mexico",
    units: "metric",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [weatherData, setWeatherData] = useState<weatherDataTypes | object>({});
  const [forecastData, setForecastData] = useState<forecastDataTypes | object>(
    {},
  );
  const [error, setError] = useState<null | string>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const weatherData = await getCurrentWeather("weather", searchedQuery);
        setWeatherData(weatherData);
        const weatherForecastData = await getWeatherForecast(
          "forecast",
          searchedQuery,
        );
        setForecastData(weatherForecastData);
        // console.log(weatherForecastData);
      } catch (err) {
        toast({
          title: "😥OOps! No city Found",
          description:
            "The city you are Looking couldn't be found. Please check spell .",
          variant: "destructive",
          action: <ToastAction altText="Try again"> Try again </ToastAction>,
        });
        fetchDefaultData();
      } finally {
        setIsLoading(false);
      }
    };
    if (searchedQuery.q) {
      getData();
    }
  }, [searchedQuery]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchInput.trim() === "") {
        setSuggestions([]);
        return;
      }

      try {
        const citySuggestions = await getCitySuggestions(searchInput);
        setSuggestions(citySuggestions);
      } catch (err) {
        console.error("Unable to fetch city suggestions", err);
      }
    };
    fetchSuggestions();
  }, [searchInput]);

  const handleSearch = (city: string) => {
    setSearchedQuery({ q: city, units: "metric" });
    setSearchInput("");
    setSuggestions([]);
  };
  const handleKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (searchInput.trim() !== "" && e.key === "Enter")
      handleSearch(searchInput);
  };
  const fetchDefaultData = async () => {
    setIsLoading(true);
    try {
      const weatherData = await getCurrentWeather("weather", searchedQuery);
      setWeatherData(weatherData);
      const forecastData = await getWeatherForecast("forecast", searchedQuery);
      setForecastData(forecastData);
    } catch (err) {
      console.error("Unable to fetch default weather data", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (error) {
      fetchDefaultData();
    }
  }, [error]);
  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <div className="min-h-screen bg-gradient-to-r from-purple-300 to-blue-200 p-4">
        <div className="flex flex-col gap-4 md:flex-row">
          {!error && Object.keys(weatherData).length !== 0 && (
            <>
              <div className="flex w-full flex-col gap-4 md:w-1/3 lg:w-2/4">
                <Currentweather weatherData={weatherData} />
              </div>
            </>
          )}
          <div className="flex w-full flex-col gap-4 md:w-2/3 lg:w-2/4">
            {!error && Object.keys(forecastData).length !== 0 && (
              <>
                <div className="flex items-center gap-4">
                  <div className="relative w-full">
                    <Input
                      className="w-80 rounded-2xl border p-4 pl-12"
                      type="text"
                      placeholder="Enter city name or code "
                      value={searchInput}
                      onKeyDown={handleKeydown}
                      onChange={(e) => setSearchInput(e.target.value)}
                    />
                    <SearchIcon className="absolute left-2 right-40 top-2 text-muted-foreground" />
                    {suggestions.length > 0 && (
                      <ScrollArea className="absolute mt-2 max-h-60 w-80 overflow-y-auto rounded-2xl border border-gray-300 bg-white shadow-md">
                        {suggestions.map((city, index) => (
                          <div
                            key={index}
                            className="cursor-pointer p-2 hover:bg-gray-200"
                            onClick={() => handleSearch(city)}
                          >
                            {city}
                          </div>
                        ))}
                      </ScrollArea>
                    )}
                  </div>
                  {/* <UserIcon className="absolute h-6 w-6" /> */}
                </div>
                <WeatherForecast forecast={forecastData} />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
