import React, { ReactNode, useState } from "react"
import { Check, Edit2, MoreHorizontal, Plus, Trash, X } from "react-feather"
import { Droppable } from "react-beautiful-dnd"
import Button2 from "./Button"
import Dropdown, { DropdownItem } from "./Dropdown"
import TrelloForm, { TrelloInput } from "./TrelloForm"
import clsx from "clsx"
import { motion } from "framer-motion"
import { Typography, Tag, Space } from 'antd';
import { deleteColumn } from "../store/slice/acts"
import { addCard } from "../store/slice/beats"
import { useDispatch } from 'react-redux';
import AntdModal from '../components/AntdModal';
import { useAppSelector } from "../store/hooks"

type ListItem = {
  id: string
  name: string
}

interface IProps {
  list: ListItem
  children: ReactNode
  numTasks: number
  index: number
}

function TaskList({ list, children, numTasks, index }: IProps) {
  const [showModal, setShowModal] = useState(false)
  const [edit, setEdit] = useState(false)
  const [editName, setEditName] = useState(list.name)
  const darkMode = useAppSelector((state) => state.acts.darkMode)
  const dispatch = useDispatch();

  // Not in use
  const handleEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setEdit(false)
  }
  const handleDelete = () => {
    if (showModal || numTasks <= 1) dispatch(deleteColumn({ id: list.id}))
    else setShowModal(true)
  }

  const titleClassName = "font-bold text-gray-700 dark:text-gray-400"
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.1 } }}
      className={clsx(
        "flex flex-col",
        "min-w-60",
        "w-full",
        "bg-gray-100/80 rounded",
        "dark:(bg-gray-800/90)",
        darkMode && "dark"
      )}
    >
      <section className="relative flex justify-between px-4 py-2">
        {/* Acts Row title */}
        {edit ? (
          <TrelloForm onSubmit={handleEdit} className="w-full">
            <TrelloInput
              className={titleClassName}
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              autoFocus
            />
            <Button2 type="submit" secondary>
              <Check />
            </Button2>
          </TrelloForm>
        ) : (
          <>
            <Space direction="horizontal" size="small">
              <h3 className={titleClassName}>{list.name}</h3>
              <Tag color="geekblue">Act {index + 1}</Tag>
            </Space>
            <Dropdown
              className="right-0 mx-2 mt-8"
              trigger={(handleClick) => (
                <MoreHorizontal
                  className="text-gray-400 cursor-pointer hover:(text-gray-500 dark:text-gray-300)"
                  onClick={handleClick}
                />
              )}
            >
              <DropdownItem disabled>
                <Edit2 className="w-4 h-4 mr-2" />
                <span>Edit</span>
              </DropdownItem>
              <DropdownItem onClick={handleDelete}>
                <Trash className="w-4 h-4 mr-2" />
                <span>Delete</span>
              </DropdownItem>
            </Dropdown>
          </>
        )}

        {/* Populate Modal when a row has more than 1 beats card */}
        <AntdModal
          title="Are you sure?"
          isOpen={showModal}
          onSubmit={handleDelete}
          onClose={() => {setShowModal(false)}}
        >
          <Typography.Paragraph>
            Delete "{list.name}" with {numTasks} cards?
          </Typography.Paragraph>
        </AntdModal>
      </section>

      {/* Children is passed through this code block */}
      <Droppable droppableId={list.id.toString()} type={list.id.toString()} key={list.id} direction="horizontal">
        {(provided) => (
          <ul
            className={clsx(
              "max-h-[75vh] px-1 pb-1 mx-1",
              "flex flex-row",
              "scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent scrollbar-thumb-rounded-full",
              "dark:(scrollbar-thumb-gray-600)"
            )}
            ref={provided.innerRef}
          >
            {children}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>

      {/* Add another card button */}
      <Button2
        secondary
        className="text-sm mb-1"
        onClick={() => { console.log('here'); dispatch(addCard(list.id)) }}
      >
        <Plus className="mr-1 w-5 h-5" />
        <span>Add {numTasks !== 0 ? "another" : "a"} card</span>
      </Button2>
    </motion.div>
  )
}

export default TaskList
