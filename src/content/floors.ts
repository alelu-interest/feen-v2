/**
 * The twelve floors of the building, bottom to top (CLAUDE.md §9 octies, list closed
 * on 24/10/2026). One floor = one topic = one department of the media company.
 * Texts are Italian because they are shown in the app.
 */

export type Floor = {
  /** 1 is the ground floor, 12 the last one under the roof. */
  number: number;
  department: string;
  topic: string;
};

export const FLOORS: readonly Floor[] = [
  { number: 1, department: 'Direzione', topic: 'Denaro e decisioni' },
  { number: 2, department: 'Tesoreria', topic: 'Banche, conti e pagamenti' },
  { number: 3, department: 'Gaming', topic: 'Azzardo e probabilità' },
  { number: 4, department: 'Marketing', topic: 'Chi ti spinge a spendere' },
  { number: 5, department: 'Pianificazione', topic: 'Risparmio e imprevisti' },
  { number: 6, department: 'Personale e Amministrazione', topic: 'Lavoro, busta paga e tasse' },
  { number: 7, department: 'Formazione', topic: 'Studiare costa ed è un investimento' },
  { number: 8, department: 'Finanza', topic: 'Inflazione, debiti e casa' },
  { number: 9, department: 'Credito', topic: 'Obbligazioni' },
  { number: 10, department: 'Soci', topic: 'Azioni' },
  { number: 11, department: 'Palinsesto', topic: 'Fondi, ETF e diversificazione' },
  { number: 12, department: 'Esteri', topic: 'Materie prime, valute e derivati' },
];

/** The fixed scheme of every floor (§9 octies): 6 lessons, the Case halfway, the Field test last. */
export type StageKind = 'lesson' | 'case' | 'field';

export type Stage = {
  kind: StageKind;
  /** For lessons, 1–6; for the Case and the Field test, null. */
  lessonNumber: number | null;
};

export const STAGES: readonly Stage[] = [
  { kind: 'lesson', lessonNumber: 1 },
  { kind: 'lesson', lessonNumber: 2 },
  { kind: 'lesson', lessonNumber: 3 },
  { kind: 'case', lessonNumber: null },
  { kind: 'lesson', lessonNumber: 4 },
  { kind: 'lesson', lessonNumber: 5 },
  { kind: 'lesson', lessonNumber: 6 },
  { kind: 'field', lessonNumber: null },
];

export const STAGES_PER_FLOOR = STAGES.length;
export const TOTAL_STAGES = FLOORS.length * STAGES_PER_FLOOR;

/** What an empty object slot says when touched (§9 ter punto 10). */
export function stageLabel(stage: Stage): string {
  if (stage.kind === 'case') return 'il Caso';
  if (stage.kind === 'field') return 'la Prova sul campo';
  return `la lezione ${stage.lessonNumber}`;
}
