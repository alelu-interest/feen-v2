import { asFace, iconAnswer, iconScript, readIcon } from './app-icon-data';

describe('readIcon', () => {
  it('takes a face of the test, or null for the white icon', () => {
    expect(readIcon({ icona: 'Warren' })).toBe('Warren');
    expect(readIcon({ icona: null })).toBeNull();
  });

  it('leaves alone the messages about something else, and the icons the app does not have', () => {
    expect(readIcon({ buzz: 15 })).toBeUndefined();
    expect(readIcon({ icona: 'Donna' })).toBeUndefined();
    expect(readIcon({ icona: 'warren' })).toBeUndefined();
    expect(readIcon({ icona: 3 })).toBeUndefined();
    expect(readIcon(null)).toBeUndefined();
    expect(readIcon('icona')).toBeUndefined();
  });
});

describe('asFace', () => {
  it('turns what the phone says into what the page knows', () => {
    expect(asFace('Jordan')).toBe('Jordan');
    expect(asFace(null)).toBeNull();
    expect(asFace('Default')).toBeNull();
  });
});

describe('the lines for the page', () => {
  it('hands over whether the phone can change the icon and which one it has', () => {
    const window: { FEEN_ICON_OK?: boolean; FEEN_ICON?: unknown } = {};
    new Function('window', iconScript(true, 'Cathie'))(window);
    expect(window).toEqual({ FEEN_ICON_OK: true, FEEN_ICON: 'Cathie' });
    new Function('window', iconScript(false, null))(window);
    expect(window).toEqual({ FEEN_ICON_OK: false, FEEN_ICON: null });
  });

  it('answers the page after a change, and does nothing when the page has no ear for it', () => {
    const heard: unknown[] = [];
    new Function('window', iconAnswer('Bill'))({ feenIcona: (n: unknown) => heard.push(n) });
    new Function('window', iconAnswer(null))({ feenIcona: (n: unknown) => heard.push(n) });
    expect(heard).toEqual(['Bill', null]);
    expect(() => new Function('window', iconAnswer('Bill'))({})).not.toThrow();
  });
});
