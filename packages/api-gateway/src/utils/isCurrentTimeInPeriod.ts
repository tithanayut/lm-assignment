import dayjs from "dayjs";

interface TimePeriod {
  begin: string; // "HH:mm"
  end: string; // "HH:mm"
}

export function isCurrentTimeInPeriod(period: TimePeriod) {
  const now = dayjs();
  let begin = dayjs()
    .hour(Number(period.begin.split(":")[0]))
    .minute(Number(period.begin.split(":")[1]));
  let end = dayjs()
    .hour(Number(period.end.split(":")[0]))
    .minute(Number(period.end.split(":")[1]));

  if (end.isBefore(begin)) {
    if (now.isBefore(end)) {
      begin = begin.subtract(1, "day");
    } else {
      end = end.add(1, "day");
    }
  }

  return (now.isAfter(begin) && now.isBefore(end)) || now.isSame(begin) || now.isSame(end);
}
