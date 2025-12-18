import { DateTime } from "luxon";
import { BlockMode, BlockStatus } from "@prisma/client";

export type CreateBlockInput = {
  title: string;
  notes?: string;
  startAtISO: string;
  endAtISO: string;
  timezone: string;
  mode: BlockMode;
  status?: BlockStatus;
};

export function validateCreateBlock(input: CreateBlockInput): string[] {
  const errors: string[] = [];

  const start = DateTime.fromISO(input.startAtISO, { zone: input.timezone });
  const end = DateTime.fromISO(input.endAtISO, { zone: input.timezone });

  if (!start.isValid) errors.push("Invalid start time.");
  if (!end.isValid) errors.push("Invalid end time.");
  if (end <= start) errors.push("End must be after start.");

  return errors;
}
