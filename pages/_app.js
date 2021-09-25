import 'tailwindcss/tailwind.css'
import "@/style/font-icon.css"

import useSWR from 'swr';

import DebuggerLayout from '@/components/Layout';
import NextNprogress from 'nextjs-progressbar';

import { FetchHelloWorld } from '@/api';
import { MIDDLE_ENDPOINT } from '@/api/const';
import { APP_COLOR } from '@/const';
import DebuggerAlert from '@/components/UI/alert';
function MyApp({ Component, pageProps }) {
  const { error } = useSWR(MIDDLE_ENDPOINT.HELLO_WORLD, FetchHelloWorld)

  return (
    <>
      <NextNprogress
        color={APP_COLOR.GREEN_PRIMARY}
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
        showOnShallow={true}
      />
      <DebuggerLayout  >
        {
          error && <DebuggerAlert msg={"server connection error"} />
        }
        <Component {...pageProps} />
      </DebuggerLayout>
    </>
  )
}

export default MyApp
