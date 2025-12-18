import { DateTime } from "luxon";

export function getLocalZone(): string {
  return Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
}

export function startOfLocalDayISO(dateISO: string, zone: string) {
  const d = DateTime.fromISO(dateISO, { zone });
  return {
    start: d.startOf("day").toJSDate(),
    end: d.endOf("day").toJSDate()
  };
}
