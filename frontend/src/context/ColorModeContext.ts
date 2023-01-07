import { createContext } from 'react';

type TColorModeContext = {
  toggleColorMode: () => void,
}
const ColorModeContext = createContext({} as TColorModeContext);
export default ColorModeContext;
