"use client";

import { useEffect, useState } from "react";
import { DateTime } from "luxon";

export default function BlocksPage() {
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const [date, setDate] = useState(DateTime.now().toISODate()!);
  const [blocks, setBlocks] = useState<any[]>([]);

  async function load() {
    const res = await fetch(`/api/blocks?date=${date}&tz=${tz}`);
    const data = await res.json();
    setBlocks(data.blocks);
  }

  useEffect(() => {
    load();
  }, [date]);

  return (
    <main className="space-y-4">
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="bg-neutral-900 p-2"
      />

      {blocks.map((b) => (
        <div key={b.id} className="rounded bg-neutral-900 p-3">
          <div className="font-semibold">{b.title}</div>
          <div className="text-sm text-neutral-400">
            {DateTime.fromISO(b.startAt).toFormat("HH:mm")} –
            {DateTime.fromISO(b.endAt).toFormat("HH:mm")}
          </div>
        </div>
      ))}
    </main>
  );
}
