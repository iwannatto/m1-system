import { Button, Form, Input, Space, Typography } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'

const { Title } = Typography

type Props = {
  heading: string
  defaultCount: number
  onSave: (names: string[]) => void
}

function NameListForm({ heading, defaultCount, onSave }: Props) {
  const handleFinish = (values: { names: string[] }) => {
    const names = (values.names ?? []).filter((name) => name.trim() !== '')
    onSave(names)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Title level={2}>{heading}</Title>
      <Form
        onFinish={handleFinish}
        initialValues={{ names: Array.from({ length: defaultCount }, () => '') }}
      >
        <Form.List name="names">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field) => (
                <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }}>
                  <Form.Item {...field} noStyle>
                    <Input placeholder="名前を入力" style={{ width: 300 }} />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(field.name)} />
                </Space>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
                  追加
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default NameListForm
