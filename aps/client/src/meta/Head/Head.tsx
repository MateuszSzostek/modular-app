import { PropsWithChildren } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'

export default function Head({ children }: PropsWithChildren<{}>) {
  return (
    <HelmetProvider>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Modular App</title>
        <link rel="canonical" href="http://todo" />
        <link rel="manifest" href="/manifest.json" />
        {children}
      </Helmet>
    </HelmetProvider>
  )
}
