import { useState } from 'react'
import NameListForm from './components/NameListForm'
import Emikuji from './components/Emikuji'

function App() {
  const [finalists, setFinalists] = useState<string[]>([])
  const [, setJudges] = useState<string[]>([])

  return (
    <>
      <section id="finalists">
        <NameListForm heading="ファイナリスト" defaultCount={10} onSave={setFinalists} />
      </section>
      <section id="judges">
        <NameListForm heading="審査員" defaultCount={3} onSave={setJudges} />
      </section>
      <section id="emikuji">
        <Emikuji finalists={finalists} />
      </section>
    </>
  )
}

export default App
