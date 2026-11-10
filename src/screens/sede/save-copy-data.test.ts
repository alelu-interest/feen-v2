import { copyScript, readCopy } from './save-copy-data';

describe('readCopy', () => {
  it('keeps the two known entries, as text', () => {
    expect(readCopy({ 'feen-progressi': '{"v":1}', 'feen-avvio': '{"step":"fatto"}' })).toEqual({
      'feen-progressi': '{"v":1}',
      'feen-avvio': '{"step":"fatto"}',
    });
  });

  it('drops anything else: other entries, values that are not text', () => {
    expect(readCopy({ 'feen-progressi': '{"v":1}', altro: 'x', 'feen-avvio': 12 })).toEqual({ 'feen-progressi': '{"v":1}' });
  });

  it('is null when nothing is left', () => {
    expect(readCopy(null)).toBeNull();
    expect(readCopy('feen-progressi')).toBeNull();
    expect(readCopy({})).toBeNull();
    expect(readCopy({ 'feen-progressi': null })).toBeNull();
  });
});

describe('copyScript', () => {
  it('hands the copy to the page as it is, quotes and all', () => {
    const copy = { 'feen-avvio': '{"pick":"Warren","note":"l\'azienda \\"mia\\""}' };
    const line = copyScript(copy);
    // run as the web view would run it
    const window: { FEEN_COPIA?: unknown } = {};
    new Function('window', line)(window);
    expect(window.FEEN_COPIA).toEqual(copy);
  });

  it('says null when there is no copy', () => {
    expect(copyScript(null)).toBe('window.FEEN_COPIA = null;');
  });
});
