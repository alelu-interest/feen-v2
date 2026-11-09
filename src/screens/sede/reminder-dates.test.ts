import { REMINDER_DAYS, reminderDates } from './reminder-dates';

const at = (d: Date) => [d.getFullYear(), d.getMonth() + 1, d.getDate(), d.getHours(), d.getMinutes()];

describe('reminderDates', () => {
  it('starts today when the time has not come yet, one a day at the time chosen', () => {
    const list = reminderDates(new Date(2026, 10, 9, 10, 0), '18:00', false);
    expect(list).toHaveLength(REMINDER_DAYS);
    expect(at(list[0])).toEqual([2026, 11, 9, 18, 0]);
    expect(at(list[1])).toEqual([2026, 11, 10, 18, 0]);
  });

  it('skips today when a stage is already done today', () => {
    const list = reminderDates(new Date(2026, 10, 9, 10, 0), '18:00', true);
    expect(list).toHaveLength(REMINDER_DAYS - 1);
    expect(at(list[0])).toEqual([2026, 11, 10, 18, 0]);
  });

  it('skips today when its time has passed', () => {
    const list = reminderDates(new Date(2026, 10, 9, 18, 0), '18:00', false);
    expect(at(list[0])).toEqual([2026, 11, 10, 18, 0]);
  });

  it('goes across the end of a month, and never twice a day', () => {
    const list = reminderDates(new Date(2026, 10, 25, 20, 0), '07:30', false);
    // 07:30 has passed on the 25th: the first is the 26th
    expect(at(list[0])).toEqual([2026, 11, 26, 7, 30]);
    expect(at(list[4])).toEqual([2026, 11, 30, 7, 30]);
    expect(at(list[5])).toEqual([2026, 12, 1, 7, 30]);
    const days = list.map((d) => d.toDateString());
    expect(new Set(days).size).toBe(days.length);
  });

  it('plans nothing for a time it cannot read', () => {
    expect(reminderDates(new Date(2026, 10, 9), 'sera', false)).toEqual([]);
    expect(reminderDates(new Date(2026, 10, 9), '25:00', false)).toEqual([]);
  });
});
