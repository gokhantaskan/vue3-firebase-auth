import dayjs, { type Dayjs } from "dayjs";

export type $Date = string | number | Date | Dayjs | null | undefined;

export function convertDateToMs(date: $Date): number | null {
  if (!date) {
    return null;
  }

  if (dayjs.isDayjs(date)) {
    return date.isValid() ? date.valueOf() : null;
  }

  const parsedDate = new Date(date);
  return !isNaN(parsedDate.getTime()) ? parsedDate.getTime() : null;
}
