import clsx from "clsx"
import { useState } from 'react'
import { Draggable } from "react-beautiful-dnd"
import { X } from "react-feather"
import { ListItem } from "../store"
import Button2 from "./Button"
import { Card, Space, Typography } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { deleteCard, updateCardSequence } from "../store/slice/beats";
import { useDispatch } from "react-redux"
import AntdModal from "./AntdFormModal"
import { useAppSelector } from "../store/hooks"

const { Paragraph } = Typography

type taskItem2 = {
  id: string
  time: string
  content: string
  cameraAngle: string
  notes: string
  name: string
}
export interface ITaskProps {
  task: taskItem2
  listId: ListItem["id"]
  idx: number
  className?: string
}

function Task({ task, listId, idx, className }: ITaskProps) {
  const [modal2Open, setModal2Open] = useState(false);
  const dispatch = useDispatch();
  const darkMode = useAppSelector((state) => state.acts.darkMode)
  return (
    <Draggable key={idx} index={idx} draggableId={task.id.toString()}>
      {(provided) => (
        <div
          className={clsx(
            "flex flex-col"
          )}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Space direction="vertical" size="small">

            <Card
              size="small"
              title={task.cameraAngle}
              actions={[
                // <SettingOutlined key="setting" />,
                <EditOutlined key="edit" onClick={() => { setModal2Open(true) }} />,
                // <EllipsisOutlined key="ellipsis" />,
              ]}
              className={clsx(
                "relative group",
                "flex flex-col",
                "bg-gray-200 text-sm",
                "w-1/6 min-w-40 w-40 sm:w-40px lg:w-250px",
                "h-1/6 min-h-40 h-60 lg:h-200px",
                "shadow rounded list-none",
                "dark:(bg-gray-700)",
                "mx-1",
                darkMode && "dark",
                className
              )}
              bodyStyle={{ flex: "1 1 auto", height: "20%", overflow: "hidden" }}

            >
              {/* <p className="text-gray-800 dark:text-gray-200">{task.content}</p> */}
              <Space direction="vertical" size="small">
                <p className="text-gray-800 dark:text-gray-200">{task.content}</p>
                <p className="text-gray-800 italic dark:text-gray-200">{task.notes}</p>
              </Space>
              <Button2
                onClick={() => dispatch(deleteCard({actId: listId, beatId: task.id}))}
                className="w-6 h-6 absolute top-1 right-1 hidden group-hover:block"
                floating
              >
                <X className="w-5 h-5" />
              </Button2>
              <AntdModal
                title="Edit Card"
                isOpen={modal2Open}
                onClose={() => { setModal2Open(false)}}
                onSubmit={(e) => { dispatch(updateCardSequence(e))}}
                formData={task}
                id={listId}
              />
            </Card>
            <div className={clsx(
              "flex flex-row justify-between",
              "mx-1 px-1",
              darkMode && "dark"
            )}>
              <Paragraph strong>{task.name}</Paragraph>
              <Paragraph><b>Time</b>: {task.time}</Paragraph>
            </div>
          </Space>
        </div>
      )}
    </Draggable>
  )
}

export default Task
