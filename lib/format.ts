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
