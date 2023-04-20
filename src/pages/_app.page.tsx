import { QueryClientProvider } from '@tanstack/react-query'
import '../lib/dayjs'

import { globalStyles } from '@/styles/global'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'

import { Roboto } from 'next/font/google'
import { queryClient } from '@/lib/react-query'
import { DefaultSeo } from 'next-seo'

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '500', '700'] })

globalStyles()

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <main className={roboto.className}>
        <SessionProvider session={session}>
          <DefaultSeo
            openGraph={{
              type: 'website',
              locale: 'pt_BR',
              url: 'https://ignite-call.com.br',
              siteName: 'Ignite Call',
            }}
          />
          <Component {...pageProps} />
        </SessionProvider>
      </main>
    </QueryClientProvider>
  )
}
