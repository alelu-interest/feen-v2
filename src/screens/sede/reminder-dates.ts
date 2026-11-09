/**
 * When the reminders come (CLAUDE.md §8; cubotto 9.4, 09/11/2026): one a day at most, at the time chosen, for the
 * next `days` days. Today's is left out when its time has passed or when a stage is already done today.
 * The plan is made again at every opening and after every stage, so a player who keeps playing never runs out of it;
 * one who stops opening FEEN gets no more than `days` of them.
 */
export const REMINDER_DAYS = 14;

export function reminderDates(now: Date, time: string, skipToday: boolean, days = REMINDER_DAYS): Date[] {
  const m = /^(\d{1,2}):(\d{2})$/.exec(time);
  if (!m) return [];
  const [h, min] = [Number(m[1]), Number(m[2])];
  if (h > 23 || min > 59) return [];
  const out: Date[] = [];
  for (let k = 0; k < days; k++) {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() + k, h, min, 0, 0);
    if (k === 0 && (skipToday || d.getTime() <= now.getTime())) continue;
    out.push(d);
  }
  return out;
}
