import { CloudRainIcon, SearchIcon, UserIcon } from "lucide-react";
import { Input } from "./ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

import Image from "next/image";
import { Diplomata } from "next/font/google";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "./ui/chart";

const WeatherForecast = ({ forecast }: any) => {
  if (!forecast.list) {
    return null;
  }
  const days = forecast.list.reduce((acc: any, curr: any) => {
    const date = new Date(curr.dt * 1000).toLocaleDateString("en-US", {
      weekday: "short",
    });
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(curr);
    return acc;
  }, {});

  const dailyForecast = Object.keys(days)
    .slice(0, 5)
    .map((day) => {
      const dayData = days[day];
      const avgTemp =
        dayData.reduce((acc: number, curr: any) => acc + curr.main.temp, 0) /
        dayData.length;
      const avgHumidity =
        dayData.reduce(
          (acc: number, curr: any) => acc + curr.main.humidity,
          0,
        ) / dayData.length;
      const highTemp = Math.max(
        ...dayData.map((data: any) => data.main.temp_max),
      );
      const lowTemp = Math.min(
        ...dayData.map((data: any) => data.main.temp_min),
      );
      const weather = dayData[0].weather[0];

      return {
        day,
        temp: avgTemp.toFixed(1),
        humidity: avgHumidity.toFixed(1),
        highTemp: highTemp.toFixed(1),
        lowTemp: lowTemp.toFixed(1),
        icon: weather.icon,
        description: weather.description,
      };
    });
  // const dates = dailyForecast.map((forecast) => forecast.day);
  // const temps = dailyForecast.map((forecast) => parseFloat(forecast.temp));
  // const humidity = dailyForecast.map((forecast) => forecast.humidity);
  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "hsl(var(--chart-1))",
    },
  };
  return (
    <>
      <div className="grid grid-cols-5 gap-4">
        {dailyForecast.map((forecast, index) => (
          <Card
            key={index}
            className={`text-center ${index === 0 ? "bg-pink-500 text-white" : "bg-slate-400"}`}
          >
            <CardContent>
              <Image
                src={`https://openweathermap.org/img/wn/${forecast.icon}@2x.png`}
                alt={forecast.description}
                width={100}
                height={100}
              />
              <div className="text-lg font-bold">{forecast.day}</div>
              <div>{forecast.temp}°C</div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="">
        <Card className="rounded-2xl border">
          <CardHeader>
            <CardTitle>Temperature Trend</CardTitle>
            <CardDescription>Next 5 Days</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <ChartContainer config={chartConfig}>
                <LineChart
                  accessibilityLayer
                  data={dailyForecast}
                  margin={{
                    left: 12,
                    right: 12,
                  }}
                >
                  <CartesianGrid vertical={false} strokeDasharray="3 3" />
                  <XAxis dataKey="day" tickLine={false} tickMargin={8} />
                  <YAxis tickLine={false} />
                  <ChartTooltip
                    content={<ChartTooltipContent hideLabel />}
                    cursor={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="highTemp"
                    stroke="#E4003A"
                    name="High Temp"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="temp"
                    stroke="#FFB200"
                    name="Avg Temp "
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="lowTemp"
                    stroke="#508D4E"
                    strokeWidth={2}
                    name="Low Temp"
                  />
                </LineChart>
              </ChartContainer>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        {/* <Card>
          <CardHeader>
            <CardTitle>Humidity Trend</CardTitle>
            <CardDescription>Next 5 Days</CardDescription>
          </CardHeader>
          <CardContent>
            <BarChart width={500} height={300} data={dailyForecast}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="humidity" fill="#82ca9d" />
            </BarChart>
          </CardContent>
        </Card> */}
      </div>
    </>
  );
};
export default WeatherForecast;
