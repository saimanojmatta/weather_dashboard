import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import {
  CalendarIcon,
  MapPinIcon,
  SunriseIcon,
  SunsetIcon,
  ThermometerIcon,
} from "lucide-react";

import { formatToLocalTime } from "@/lib/helper";

const Currentweather = ({ weatherData }: any) => {
  return (
    <>
      <Card className="bg-blue-500 text-white">
        <CardHeader className="flex flex-col items-center py-8">
          <Image
            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
            alt=""
            width={100}
            height={100}
          />
          <div className="text-4xl font-bold">
            {weatherData.main.temp.toFixed(0)}℃
          </div>
          <div className="text-lg">{weatherData.weather[0].main}</div>
          <Separator className="my-4" orientation="horizontal" />
          <div className="mt-2 flex items-center gap-2">
            <MapPinIcon className="h-4 w-4" />
            <span>
              {weatherData.name}, {weatherData.sys.country}
            </span>
          </div>
          <div className="mt-1 flex items-center gap-2">
            <CalendarIcon className="h-4 w-4" />
            {/* <span>17 December, 2023 5:01 pm</span> */}
            <span>
              {formatToLocalTime(weatherData.dt, weatherData.timezone)}
            </span>
          </div>
        </CardHeader>
      </Card>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card className="bg-yellow-300">
          <CardHeader>
            <CardTitle>Wind speed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {weatherData.wind.speed.toFixed()}km/h
            </div>
          </CardContent>
        </Card>
        <Card className="bg-blue-300">
          <CardHeader>
            <CardTitle>Humidity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {weatherData.main.humidity} %
            </div>
          </CardContent>
        </Card>
        <Card className="bg-pink-300">
          <CardHeader>
            <CardTitle>Sunrise & Sunset</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between">
              <div>
                <SunriseIcon className="h-6 w-6" />
                <div>
                  {formatToLocalTime(
                    weatherData.sys.sunrise,
                    weatherData.timezone,
                    "hh:mm a",
                  )}
                </div>
              </div>
              <div>
                <SunsetIcon className="h-6 w-6" />
                <div>
                  {formatToLocalTime(
                    weatherData.sys.sunset,
                    weatherData.timezone,
                    "hh:mm a",
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-green-300">
          <CardHeader>
            <CardTitle>High & Low Temperature</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between">
              <div>
                <ThermometerIcon className="h-6 w-6" />
                <div>{weatherData.main.temp_max.toFixed()}°</div>
              </div>
              <div>
                <ThermometerIcon className="h-6 w-6" />
                <div>{weatherData.main.temp_min.toFixed()}°</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};
export default Currentweather;
