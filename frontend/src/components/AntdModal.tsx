import React from 'react'
import { Modal } from 'antd';

interface IProps {
  title: string
  isOpen: boolean
  onClose: Function
  onSubmit?: Function
  children: any
}


function AntdModal({ title, isOpen, onClose = () => {}, onSubmit = () => {}, children }: IProps) {

  return (
    <Modal
        title={title}
        centered
        open={isOpen}
        onCancel={() => { onClose() }}
        onOk={() => { onSubmit() }}
    >
      {children}
    </Modal>
  )
}

export default AntdModal
