import { useState, useEffect } from "react"
import { Plus } from "react-feather"
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

import Board from "./components/Board"
import Button2 from "./components/Button"
import Header from "./components/Header"
import Task from "./components/Task"
import TaskList from "./components/TaskList"
import { TrelloListForm } from "./components/TrelloForm"
import clsx from "clsx"
import { AnimatePresence } from "framer-motion"
import { useDispatch } from 'react-redux';
import { useAppSelector } from "./store/hooks";
import { fetchColumns } from "./store/slice/acts";
import { fetchCards, shiftCards } from "./store/slice/beats";

function App() {
  const [showAddListForm, setShowAddListForm] = useState(false)
  const darkMode = useAppSelector((state) => state.acts.darkMode)
  const { columns } = useAppSelector((state) => state.acts)
  const { cards } = useAppSelector((state) => state.beats)

  const dispatch = useDispatch()

  const fetchBoards = async () => {
    await dispatch(fetchColumns())
    await dispatch(fetchCards())
  }
  useEffect(() => {
    fetchBoards()
  }, [])

  const handleTaskDrag = async ({ destination, source }: DropResult): void => {
    if (!destination) return
    if (
      destination.index === source.index &&
      destination.droppableId === source.droppableId
    )
      return

    const shiftData = {
      fromListId: source.droppableId,
      toListId: destination.droppableId,
      fromTaskIdx: source.index,
      toTaskIdx: destination.index
      }
    dispatch(shiftCards(shiftData))
  }
  return (
    <div
      className={clsx(
        "App flex flex-col min-h-screen bg-cover bg-center",
        darkMode && "dark"
      )}
    >
      <Header title="Beat Sheet" />
      <DragDropContext onDragEnd={handleTaskDrag}>
        <Board>
          <AnimatePresence exitBeforeEnter>
            {columns.map((list, index) => (
              <TaskList
                key={list.id}
                list={list}
                index={index}
                numTasks={cards[list.id]?.length}
              >
                {cards[list.id]?.map((task, idx) => (
                  <Task
                    key={task.id}
                    task={task}
                    listId={list.id}
                    idx={idx}
                    className="mb-1.5"
                  />
                ))}
              </TaskList>
            ))}
          </AnimatePresence>
          {showAddListForm ? (
            <TrelloListForm
              onSubmit={() => setShowAddListForm(false)}
              onCancel={() => setShowAddListForm(false)}
              inputValue=""
            />
          ) : (
            <Button2 onClick={() => setShowAddListForm(true)}>
              <Plus className="mr-1" />
              <span>Add a list</span>
            </Button2>
          )}
        </Board>
      </DragDropContext>
    </div>
  )
}

export default App
