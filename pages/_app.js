import 'tailwindcss/tailwind.css'
import "@/style/font-icon.css"

import DebuggerLayout from '@/components/Layout';
import NextNprogress from 'nextjs-progressbar';

import { APP_COLOR } from '@/const';

import Head from 'next/head';
// MUI Core
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '@/context/materiaUI/theme';

import "@/style/base.css"

function MyApp({ Component, pageProps }) {
  // const { error } = useSWR(MIDDLE_ENDPOINT.HELLO_WORLD, FetchHelloWorld, { errorRetryCount: 1 })

  return (
    <>
      <Head>
        <title>de Bugger in Taiwan</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <NextNprogress
        color={APP_COLOR.GREEN_PRIMARY}
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
        showOnShallow={true}
      />
      <DebuggerLayout  >
        {/* {
          error && <DebuggerAlert msg={"server connection error"} />
        } */}
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </DebuggerLayout>
    </>
  )
}

export default MyApp
