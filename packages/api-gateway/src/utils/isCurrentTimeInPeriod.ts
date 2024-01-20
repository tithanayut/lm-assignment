import dayjs from "dayjs";

interface TimePeriod {
  begin: string; // "HH:mm"
  end: string; // "HH:mm"
}

export function isCurrentTimeInPeriod(period: TimePeriod) {
  const begin = dayjs(period.begin, "HH:mm");
  const end = dayjs(period.end, "HH:mm");

  const now = dayjs();
  return (now.isAfter(begin) && now.isBefore(end)) || now.isSame(begin) || now.isSame(end);
}
