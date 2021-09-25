import 'tailwindcss/tailwind.css'
import useSWR from 'swr';

import DebuggerLayout from '@/components/Layout';
import NextNprogress from 'nextjs-progressbar';

import { FetchHelloWorld } from '@/api';
import { MIDDLE_ENDPOINT } from '@/api/const';
import { APP_COLOR } from '@/const';
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
      <DebuggerLayout>
        {
          error && <div>cannot connenct to server</div>
        }
        <Component {...pageProps} />
      </DebuggerLayout>
    </>
  )
}

export default MyApp
