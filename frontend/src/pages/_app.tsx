import { ApolloProvider } from '@apollo/client'
import { ThemeProvider } from '@mui/material'
import { createTheme } from '@mui/material/styles'
import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import { useState } from 'react'
import { RecoilRoot } from 'recoil'
import { initializeApollo } from '~/libs/apollo/apolloClient'
import ColorModeContext from '~/stores/ColorModeContext'
import '~/styles/globals.css'
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

function MyApp({ Component, pageProps }: AppProps<{ session: Session }>) {
  const client = initializeApollo()
  const [mode, setMode] = useState<'light' | 'dark'>('dark')

  const colorMode = {
    toggleColorMode: () => {
      setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
    },
    mode,
  }

  const theme = createTheme({
    palette: {
      mode,
      primary,
      secondary,
      error,
      warning,
      info,
      success,
      text: {
        ...(mode === 'light'
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
    <RecoilRoot>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <ApolloProvider client={client}>
            <SessionProvider session={pageProps.session}>
              <Component {...pageProps} />
            </SessionProvider>
          </ApolloProvider>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </RecoilRoot>
  )
}

export default MyApp
