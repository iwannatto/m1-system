import { Table, Typography } from 'antd'
import type { TableColumnsType } from 'antd'
import { calcTotal, type ScoresMap } from '../utils/scoring'

const { Title } = Typography

type Props = {
  judges: string[]
  rows: string[]
  scores: ScoresMap
}

type RankingRow = {
  key: number
  rank: number
  name: string
  total: number
}

function Rankings({ judges, rows, scores }: Props) {
  const dataSource: RankingRow[] = rows
    .map((name, index) => ({ key: index, name, total: calcTotal(scores, index) }))
    .sort((a, b) => b.total - a.total)
    .map((row, index) => ({ ...row, rank: index + 1 }))

  const columns: TableColumnsType<RankingRow> = [
    { title: '順位', dataIndex: 'rank', key: 'rank' },
    { title: 'ファイナリスト', dataIndex: 'name', key: 'name' },
    ...judges.map((judge, judgeIndex) => ({
      title: judge,
      key: `judge-${judgeIndex}`,
      render: (_: unknown, record: RankingRow) => scores[record.key]?.[judgeIndex] ?? '-',
    })),
    { title: '合計', dataIndex: 'total', key: 'total' },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Title level={2}>順位</Title>
      <Table<RankingRow>
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        rowKey="key"
      />
    </div>
  )
}

export default Rankings
