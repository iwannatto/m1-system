import { useState } from 'react'
import Finalists from './components/Finalists'
import Emikuji from './components/Emikuji'

function App() {
  const [finalists, setFinalists] = useState<string[]>([])

  return (
    <>
      <section id="finalists">
        <Finalists onSave={setFinalists} />
      </section>
      <section id="emikuji">
        <Emikuji finalists={finalists} />
      </section>
    </>
  )
}

export default App
