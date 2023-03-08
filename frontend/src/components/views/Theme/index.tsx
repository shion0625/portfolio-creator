import { createTheme, CssBaseline, PaletteMode, ThemeProvider } from '@mui/material'
import { ReactNode } from 'react'
import { usePaletteMode } from '~/stores/PaletteMode'
import { primary, secondary, error, warning, info, success } from '~/styles/theme'

declare module '@mui/material/styles' {
  interface Theme {
    palette: {
      primary: string
      secondary: string
      error: string
      warning: string
      info: string
      success: string
      text: {
        primary: string
        main: string
        secondary: string
        error: string
        warning: string
        info: string
        success: string
        reverse: string
      }
    }
  }
}

const Theme = ({ children }: { children: ReactNode }) => {
  const [paletteMode] = usePaletteMode()

  const theme = createTheme({
    palette: {
      mode: paletteMode,
      primary,
      secondary,
      error,
      warning,
      info,
      success,
      text: {
        ...(paletteMode === 'light'
          ? {
              primary: '#1A2027',
              main: '#42a5f5',
              secondary: '#ba68c8',
              error: '#ef5350',
              warning: '#ff9800',
              info: '#03a9f4',
              success: '#4caf50',
              reverse: '#fff',
            }
          : {
              primary: '#fff',
              main: '#1565c0',
              secondary: '#7b1fa2',
              error: '#c62828',
              warning: '#e65100',
              info: '#01579b',
              success: '#1b5e20',
              reverse: '#1A2027',
            }),
      },
    },
  })
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}

export default Theme
