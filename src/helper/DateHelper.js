export function formatDate(dateInput, format) {
  const date = new Date(dateInput);
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };

  const formattedDate = new Intl.DateTimeFormat("en-GB", options).format(date);

  const [day, month, year, hour, minute, second] = formattedDate.match(/\d+/g);

  return format
    .replace("YYYY", year)
    .replace("MM", month)
    .replace("DD", day)
    .replace("HH", hour)
    .replace("mm", minute)
    .replace("ss", second);
}
