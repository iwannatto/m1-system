import { useState } from 'react'
import NameListForm from './components/NameListForm'
import Emikuji from './components/Emikuji'
import Scoring from './components/Scoring'
import Rankings from './components/Rankings'
import type { ScoresMap } from './utils/scoring'

function App() {
  const [finalists, setFinalists] = useState<string[]>([])
  const [judges, setJudges] = useState<string[]>([])
  const [scoringRows, setScoringRows] = useState<string[]>([])
  const [scores, setScores] = useState<ScoresMap>({})

  const handleDraw = (name: string) => {
    setScoringRows((prev) => [...prev, name])
  }

  return (
    <>
      <section id="finalists">
        <NameListForm heading="ファイナリスト" defaultCount={10} onSave={setFinalists} />
      </section>
      <section id="judges">
        <NameListForm heading="審査員" defaultCount={3} onSave={setJudges} />
      </section>
      <section id="emikuji">
        <Emikuji finalists={finalists} onDraw={handleDraw} />
      </section>
      <section id="scoring">
        <Scoring judges={judges} rows={scoringRows} scores={scores} onScoresChange={setScores} />
      </section>
      <section id="rankings">
        <Rankings judges={judges} rows={scoringRows} scores={scores} />
      </section>
    </>
  )
}

export default App
