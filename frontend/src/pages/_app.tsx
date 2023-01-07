import { ApolloProvider } from '@apollo/client'
import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import { initializeApollo } from '~/libs/apollo/apolloClient'
import '~/styles/globals.css'
import { primary, secondary, error, warning, info, success } from '~/styles/theme';
import { ThemeProvider } from '@mui/material';
import ColorModeContext from '~/context/ColorModeContext'
import { useState } from 'react';
import { createTheme } from '@mui/material/styles';

function MyApp({ Component, pageProps }: AppProps<{ session: Session }>) {
  const client = initializeApollo()
  const [mode, setMode] = useState<'light' | 'dark'>('dark');

  const colorMode = {
    toggleColorMode: () => {
      setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    },
  }

  const theme = createTheme({
    palette: {
      mode: mode,
      primary,
      secondary,
      error,
      warning,
      info,
      success,
    },
  });

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <ApolloProvider client={client}>
          <SessionProvider session={pageProps.session}>
            <Component {...pageProps} />
          </SessionProvider>
        </ApolloProvider>
      </ThemeProvider >
    </ColorModeContext.Provider>


  )
}

export default MyApp
