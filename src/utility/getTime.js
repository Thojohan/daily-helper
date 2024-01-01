export function getTime(timeISO) {
  const time = new Date(timeISO);
  return `${String(time.getHours()).padStart(2, 0)} : ${String(
    time.getMinutes()
  ).padStart(2, 0)}`;
}
