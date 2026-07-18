import { useState } from 'react'
import { InputNumber, Table, Typography } from 'antd'
import type { TableColumnsType } from 'antd'

const { Title } = Typography

type Props = {
  judges: string[]
  rows: string[]
}

type ScoringRow = {
  key: number
  name: string
}

function Scoring({ judges, rows }: Props) {
  const [scores, setScores] = useState<Record<number, Record<number, number>>>({})

  const handleScoreChange = (rowIndex: number, judgeIndex: number, value: number | null) => {
    setScores((prev) => ({
      ...prev,
      [rowIndex]: {
        ...prev[rowIndex],
        [judgeIndex]: value ?? 0,
      },
    }))
  }

  const rowTotal = (rowIndex: number) =>
    Object.values(scores[rowIndex] ?? {}).reduce((sum, score) => sum + score, 0)

  const columns: TableColumnsType<ScoringRow> = [
    {
      title: '出順',
      key: 'no',
      render: (_: unknown, record: ScoringRow) => record.key + 1,
    },
    {
      title: 'ファイナリスト',
      dataIndex: 'name',
      key: 'name',
    },
    ...judges.map((judge, judgeIndex) => ({
      title: judge,
      key: `judge-${judgeIndex}`,
      render: (_: unknown, record: ScoringRow) => (
        <InputNumber
          value={scores[record.key]?.[judgeIndex]}
          onChange={(value) => handleScoreChange(record.key, judgeIndex, value)}
        />
      ),
    })),
    {
      title: '合計',
      key: 'total',
      render: (_: unknown, record: ScoringRow) => rowTotal(record.key),
    },
  ]

  const dataSource: ScoringRow[] = rows.map((name, index) => ({ key: index, name }))

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Title level={2}>採点</Title>
      <Table<ScoringRow>
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        rowKey="key"
      />
    </div>
  )
}

export default Scoring
