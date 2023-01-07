import { createContext } from 'react'

type TColorModeContext = {
  toggleColorMode: () => void
  mode: 'light' | 'dark'
}
const ColorModeContext = createContext({} as TColorModeContext)
export default ColorModeContext
