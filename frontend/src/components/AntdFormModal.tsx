import { Button, Modal, Form, Input, TimePicker } from 'antd';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

interface IProps {
  title: string
  isOpen: boolean
  onClose: Function
  formData?: formData
  id: number
  onSubmit?: Function
}
type formData = {
  id: number
  time: string
  content: string
  cameraAngle: string
  notes: string
  name: string
}


function AntdModal({ title, isOpen, onClose = () => {}, formData, id, onSubmit = () => {} }: IProps) {
    const defaultValues = {
        cameraAngle: formData?.cameraAngle,
        content: formData?.content,
        notes: formData?.notes,
        name: formData?.name,
    }

    const onFinish = (fieldsValue: any) => {
      const data = {
        name: fieldsValue.beatName,
        cameraAngle: fieldsValue.cameraAngle,
        content: fieldsValue.content,
        notes: fieldsValue.notes,
        time: fieldsValue.time && `${fieldsValue.time[0].$H}:${fieldsValue.time[0].$m < 10 ? "0": ""}${fieldsValue.time[1].$m}-${fieldsValue.time[1].$H}:${fieldsValue.time[1].$m < 10 ? "0": ""}${fieldsValue.time[1].$m}`,
      }
      onSubmit({actId: id ,beatId: formData?.id, formData: data})
    }



  return (
    <Modal
        title={title}
        centered
        open={isOpen}
        onCancel={() => { onClose() }}
        footer={[
        <Button
            form="myForm"
            key="submit"
            htmlType="submit"
            type="primary"
            onClick={(e) => { 
              onClose() 
            }}
        >
            Submit
        </Button>,
        <Button key="cancelButton" onClick={() => { onClose() }}>Cancel</Button>
        ]}
    >
        <Form
            key={142}
            {...layout}
            id="myForm"
            name="nest-messages"
            onFinish={onFinish}
            style={{ maxWidth: 600 }}
            validateMessages={validateMessages}
            initialValues={defaultValues}
        >
            <Form.Item name="cameraAngle" label="Camera Angle" rules={[{ required: true }]}>
                <Input/>
            </Form.Item>
            <Form.Item name="content" label="content">
                <Input.TextArea />
            </Form.Item>
            <Form.Item name="notes" label="notes">
                <Input.TextArea />
            </Form.Item>
            <Form.Item name="beatName" label="beatName">
                <Input />
            </Form.Item>
            <Form.Item name="time" label="time">
                <TimePicker.RangePicker format="HH:mm" />
            </Form.Item>
        </Form>
    </Modal>
  )
}

export default AntdModal
