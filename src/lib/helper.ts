import { DateTime } from "luxon";
const formatToLocalTime = (
  secs: number,
  offset: number,
  format = " dd LLL yyyy' | LT: 'hh:mm a ",
) => {
  return DateTime.fromSeconds(secs + offset, { zone: "utc" }).toFormat(format);
};
export { formatToLocalTime };
