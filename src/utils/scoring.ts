export type ScoresMap = Record<number, Record<number, number>>

export function calcTotal(scores: ScoresMap, rowIndex: number): number {
  return Object.values(scores[rowIndex] ?? {}).reduce((sum, score) => sum + score, 0)
}
