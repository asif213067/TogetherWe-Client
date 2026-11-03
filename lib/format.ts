const eventDateFormatter = new Intl.DateTimeFormat("en-GB", {
  weekday: "short",
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "Asia/Dhaka",
});

export function formatEventDate(isoDate: string) {
  return eventDateFormatter.format(new Date(isoDate));
}

export function formatEventTime(value: string) {
  return new Intl.DateTimeFormat("en-GB", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Dhaka",
  }).format(new Date(value));
}