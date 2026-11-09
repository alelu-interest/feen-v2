/**
 * The reminders on the phone (cubotto 9.4, 09/11/2026; CLAUDE.md §8). The page decides (prove/sede/js/avvisi.js):
 * on or off, the time, whether a stage is already done today, the text. Here the phone's permission is asked, only
 * when the page says so (after the first lesson, or the switch of the Tu turned on), and the notifications are
 * scheduled again from scratch every time: at every opening, after every stage, when FEEN comes back to the front.
 * Local notifications only: nothing leaves the phone, no server.
 */
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

import { reminderDates } from './reminder-dates';

export type ReminderPlan = {
  on: boolean;
  time: string;
  skipToday: boolean;
  ask: boolean;
  title: string;
  body: string;
};
export type ReminderAnswer = { granted: boolean; canAskAgain: boolean };

const CHANNEL = 'promemoria';

// with FEEN open a reminder has nothing to say: it does not show
Notifications.setNotificationHandler({
  handleNotification: async () => ({ shouldShowBanner: false, shouldShowList: false, shouldPlaySound: false, shouldSetBadge: false }),
});

/** Reads a message of the page; null when it is not a plan. */
export function readPlan(x: unknown): ReminderPlan | null {
  if (!x || typeof x !== 'object') return null;
  const p = x as Record<string, unknown>;
  if (typeof p.on !== 'boolean' || typeof p.time !== 'string') return null;
  return {
    on: p.on,
    time: p.time,
    skipToday: p.skipToday === true,
    ask: p.ask === true,
    title: typeof p.title === 'string' ? p.title : 'FEEN',
    body: typeof p.body === 'string' ? p.body : '',
  };
}

async function apply(plan: ReminderPlan): Promise<ReminderAnswer | null> {
  let perm = await Notifications.getPermissionsAsync();
  if (plan.on && plan.ask && !perm.granted && perm.canAskAgain) {
    perm = await Notifications.requestPermissionsAsync({ ios: { allowAlert: true, allowSound: true, allowBadge: false } });
  }
  const answer = plan.ask ? { granted: perm.granted, canAskAgain: perm.canAskAgain } : null;
  await Notifications.cancelAllScheduledNotificationsAsync();
  if (!plan.on || !perm.granted || !plan.body) return answer;
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync(CHANNEL, { name: 'Promemoria', importance: Notifications.AndroidImportance.DEFAULT });
  }
  for (const date of reminderDates(new Date(), plan.time, plan.skipToday)) {
    await Notifications.scheduleNotificationAsync({
      content: { title: plan.title, body: plan.body },
      trigger: { type: Notifications.SchedulableTriggerInputTypes.DATE, date, channelId: CHANNEL },
    });
  }
  return answer;
}

// one plan at a time: a plan that arrives while another is being scheduled waits for it
let queue: Promise<unknown> = Promise.resolve();
/** Schedules the plan; resolves with the phone's answer when the page asked the permission, null otherwise. */
export function planReminders(plan: ReminderPlan): Promise<ReminderAnswer | null> {
  const run = queue.then(() => apply(plan));
  queue = run.catch(() => null);
  return run.catch(() => (plan.ask ? { granted: false, canAskAgain: true } : null));
}
