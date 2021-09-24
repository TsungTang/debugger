import 'tailwindcss/tailwind.css'
import useSWR from 'swr';

import { FetchHelloWorld } from '@/api';
import { API_ENDPOINT } from '@/api/const';
function MyApp({ Component, pageProps }) {
  const { error } = useSWR(API_ENDPOINT.HELLO_WORLD, FetchHelloWorld)

  return (
    <>
      {
        error && <div>cannot connenct to server</div>
      }
      <Component {...pageProps} />

    </>
  )
}

export default MyApp
