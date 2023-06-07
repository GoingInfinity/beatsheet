import { Menu, Moon, Sun } from "react-feather"
import Button from "./Button"
import Dropdown, { DropdownItem } from "./Dropdown"
import { darkMode } from "../store/slice/acts"
import { useDispatch } from "react-redux"
import { useAppSelector } from '../store/hooks';

interface IProps {
  title: string
}

function Header({ title }: IProps) {
  const darkModeState = useAppSelector((state) => state.acts.darkMode)
  const dispatch = useDispatch();
  return (
    <header className="flex items-center px-4 py-2">
      <h1 className="text-xl text-white font-bold mx-auto drop-shadow-xl">
        {title}
      </h1>
      <Dropdown
        className="right-6 mt-11 ml-auto"
        trigger={(handleClick) => (
          <Button
            className="ml-auto text-gray-800 dark:text-gray-200"
            onClick={handleClick}
          >
            <Menu />
          </Button>
        )}
      >
        <DropdownItem onClick={() => { dispatch(darkMode(!darkModeState))}}>
          {darkModeState ? <Sun size={20} /> : <Moon size={20} />}
          <span className="ml-2">
            Toogle {darkModeState ? "light" : "dark"} mode
          </span>
        </DropdownItem>
      </Dropdown>
    </header>
  )
}

export default Header
