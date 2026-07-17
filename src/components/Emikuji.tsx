import { useState } from 'react'
import { Button, List, Typography } from 'antd'

const { Title, Text } = Typography

type Props = {
  finalists: string[]
}

function Emikuji({ finalists }: Props) {
  const [prevFinalists, setPrevFinalists] = useState(finalists)
  const [waiting, setWaiting] = useState(finalists)
  const [current, setCurrent] = useState<string | null>(null)

  if (finalists !== prevFinalists) {
    setPrevFinalists(finalists)
    setWaiting(finalists)
    setCurrent(null)
  }

  const handleDraw = () => {
    if (waiting.length === 0) return
    const index = Math.floor(Math.random() * waiting.length)
    const picked = waiting[index]
    setCurrent(picked)
    setWaiting((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Title level={2}>笑神籤</Title>
      <Button type="primary" onClick={handleDraw} disabled={waiting.length === 0}>
        笑神籤を引く！
      </Button>
      {current && (
        <Text style={{ fontSize: 20, margin: '16px 0' }}>次は……{current}</Text>
      )}
      <div>
        <Title level={4}>出番待ち ({waiting.length}人)</Title>
        <List
          dataSource={waiting}
          renderItem={(name) => <List.Item>{name}</List.Item>}
        />
      </div>
    </div>
  )
}

export default Emikuji
